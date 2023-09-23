import axios, { cancelTokenSource, isCancel } from "@/axios";
import React, { useEffect, useRef, useState } from "react";
import { decode } from "jsonwebtoken";
import { BsStarFill } from "react-icons/bs";
import { useRouter } from "next/router";
import {
  Button,
  Checkbox,
  Flex,
  Group,
  Modal,
  Rating,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaSadTear } from "react-icons/fa";
import ReportQuestionSet from "./ReportQuestionSet";

const Result = ({ chosenAnswers, questions, difficulty }: any) => {
  const [correctAnswers, setCorrectAnswers] = useState<any>([]);
  const [answers, setAnswers] = useState<any>([]);
  const [hasRated, SetHasRated] = useState(false);
  const [hasLeveledUp, setHasLeveledUp] = useState();
  const [wrongQuestionsCount, setWrongQuestionsCount] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const [reported, setReported] = useState(false);

  const [rating, setRating] = useState(0);

  const router = useRouter();

  const str = router.asPath;
  const lastIndex = str.lastIndexOf("/");
  const result = str.substring(0, lastIndex);

  useEffect(() => {
    const cancelTokenSource2 = cancelTokenSource.source();

    const fetchData = async () => {
      try {
        const response = await axios({
          method: "post",
          url: `questions/rightAnswers`,
          data: {
            chosenAnswers,
            //@ts-ignore
            userId: Number(decode(localStorage?.getItem("user")).sub),
          },
          cancelToken: cancelTokenSource2.token,
        });

        const resp = response.data.result.map((item: any) => item.id);
        const ans = chosenAnswers.map((item: any) => item.answerId);

        setHasLeveledUp(response.data);

        setAnswers(ans);

        setCorrectAnswers(resp);

        const wrongCount = chosenAnswers.reduce(
          (count: number, answer: any) =>
            !resp.includes(answer.answerId) ? count + 1 : count,
          0
        );

        if (difficulty === "very_hard") {
          const response2 = await axios({
            method: "post",
            url: `auth/losestatus`,
            data: {
              quantityWrongAnswers: wrongCount,
              //@ts-ignore
              userId: Number(decode(localStorage?.getItem("user")).sub),
            },
            // cancelToken: cancelTokenSource.token,
          });
          setWrongQuestionsCount(response2.data);
        }

        // Process the response
      } catch (error) {
        if (isCancel(error)) {
        } else {
          // Handle other errors
        }
      }
    };

    fetchData();

    return () => {
      // Cancel the request when the component unmounts
      cancelTokenSource2.cancel("Request canceled due to component unmount.");
    };
  }, []);

  function displayAnswers(
    answerID: number,
    index: number,
    is_correct: boolean
  ) {
    return (
      <div
        key={answerID}
        className={`rounded border border-4 bg-white p-4 ${
          is_correct ? "border-green-600" : "border-red-600"
        } `}
      >
        <p className="mb-4 font-bold">{questions[index].body.toUpperCase()}</p>
        <ul className="child:mb-2">
          {questions[index].answers.map((answer: any) => {
            return (
              <li key={answer.id}>
                <input
                  className="mr-2"
                  type="radio"
                  id="answer1"
                  checked={answerID === answer.id}
                />
                <label htmlFor="answer1">{answer.body}</label>
              </li>
            );
          })}
        </ul>
        {!is_correct && <p>{questions[index].description_right_answer}</p>}
      </div>
    );
  }

  async function handleSaveRating() {
    try {
      const response = await axios.patch(
        `questions/rating/${questions[0].question_set_id}/rating`,
        { rating }
      );
      SetHasRated(true);
      return response.data;
    } catch (error) {
      console.error("Error updating rating:", error);
      throw error;
    }
  }

  return (
    <div className="mx-auto mt-16 w-96 text-center">
      <h3 className="mb-4 font-bold text-white">RESPOSTAS SELECIONADAS</h3>
      <p className="mb-4 font-bold text-white">
        VOCÊ ACERTOU:{" "}
        {correctAnswers.length === 1
          ? `${correctAnswers.length} RESPOSTA`
          : `${correctAnswers.length} RESPOSTAS`}
      </p>
      {difficulty === "very_hard" && (
        <p className="mb-4 font-bold text-red-600">
          VOCÊ PERDEU {wrongQuestionsCount} PONTOS DE STATUS.
        </p>
      )}
      <div className="mb-4">
        <div>
          {hasRated ? (
            <div>
              <button
                className="btn-primary"
                onClick={() => router.push(result)}
              >
                Voltar
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Rating value={rating} onChange={setRating} />
              <div>
                <button
                  className={`ml-8 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${
                    rating === 0 ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={rating === 0}
                  onClick={handleSaveRating}
                >
                  AVALIAR
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mb-2">
        {!reported && (
          <>
            <Modal opened={opened} onClose={close} title="REPORTAR">
              <ReportQuestionSet
                closeModal={close}
                setReported={setReported}
                question_set_id={questions[0].question_set_id}
              />
            </Modal>

            <Group position="center">
              <Button
                color="red"
                variant="filled"
                className="bg-red-600"
                uppercase
                // className="btn-primary"
                rightIcon={<FaSadTear size="1.6rem" />}
                onClick={open}
              >
                Reportar
              </Button>
            </Group>
          </>
        )}
      </div>
      <div className="flex h-[600px] flex-col gap-2 overflow-y-auto pr-2">
        {answers.map((answerID: number, index: number) => {
          if (correctAnswers.includes(answerID)) {
            return displayAnswers(answerID, index, true);
          } else {
            return displayAnswers(answerID, index, false);
          }
        })}
      </div>
    </div>
  );
};

export default Result;

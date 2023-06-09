import axios from "axios";
import React, { useEffect, useState } from "react";
import { decode } from "jsonwebtoken";
import { BsStarFill } from "react-icons/bs";
import { useRouter } from "next/router";

const Result = ({ chosenAnswers, questions, difficulty }: any) => {
  const [correctAnswers, setCorrectAnswers] = useState<any>([]);
  const [answers, setAnswers] = useState<any>([]);
  const [rating, setRating] = useState(-1);
  const [hoveredRating, setHoveredRating] = useState(-1);
  const [hasRated, SetHasRated] = useState(false);
  const [hasLeveledUp, setHasLeveledUp] = useState();
  const [wrongQuestionsCount, setWrongQuestionsCount] = useState(0);
  //   const [showResult, setShowResult] = useState(false);

  const router = useRouter();

  const str = router.asPath;
  const lastIndex = str.lastIndexOf("/");
  const result = str.substring(0, lastIndex);

  console.log("questions");
  // console.log(router.asPath);

  console.log("questions");

  // console.log("correctAnswers");
  // console.log(correctAnswers);
  // console.log("correctAnswers");

  // console.log("chosenAnswers");
  // console.log(chosenAnswers);
  // console.log("chosenAnswers");

  console.log("answers");
  //@ts-ignore
  console.log(Number(decode(localStorage?.getItem("user")).sub));
  console.log("answers");

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios({
          method: "post",
          url: `https://question-and-answer-game-production.up.railway.app/questions/rightAnswers`,
          data: {
            chosenAnswers,
            //@ts-ignore
            userId: Number(decode(localStorage?.getItem("user")).sub),
          },
          cancelToken: cancelTokenSource.token,
        });

        // const response = await axios.post(
        //   "https://question-and-answer-game-production.up.railway.app/questions/rightAnswers",
        //   {
        //     chosenAnswers,
        //     //@ts-ignore
        //     userId: Number(decode(localStorage?.getItem("user")).sub),
        //     cancelToken: cancelTokenSource.token,
        //   }
        // );

        // console.log("response");
        // console.log(response.data);
        // console.log("response");

        // setShowResult(true);

        const resp = response.data.result.map((item: any) => item.id);
        const ans = chosenAnswers.map((item: any) => item.answerId);

        console.log("resp.data");
        console.log(response.data);
        setHasLeveledUp(response.data);

        setAnswers(ans);

        setCorrectAnswers(resp);

        const wrongCount = chosenAnswers.reduce(
          (count: number, answer: any) =>
            !resp.includes(answer.answerId) ? count + 1 : count,
          0
        );

        const response2 = await axios({
          method: "post",
          url: `https://question-and-answer-game-production.up.railway.app/auth/losestatus`,
          data: {
            quantityWrongAnswers: wrongCount,
            //@ts-ignore
            userId: Number(decode(localStorage?.getItem("user")).sub),
          },
          // cancelToken: cancelTokenSource.token,
        });
        setWrongQuestionsCount(response2.data);

        // Process the response
      } catch (error) {
        if (axios.isCancel(error)) {
          //   console.log("Request canceled:", error.message);
        } else {
          // Handle other errors
        }
      }
    };

    fetchData();

    return () => {
      // Cancel the request when the component unmounts
      cancelTokenSource.cancel("Request canceled due to component unmount.");
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
    console.log("questions");
    console.log(questions);

    try {
      const response = await axios.patch(
        `https://question-and-answer-game-production.up.railway.app/questions/rating/${questions[0].question_set_id}/rating`,
        { rating }
      );
      SetHasRated(true);
      // console.log("Rating updated successfully:", response.data);
      return response.data;
    } catch (error) {
      // console.error("Error updating rating:", error);
      throw error;
    }
  }

  const handleStarHover = (index: number) => {
    if (rating === -1) {
      setHoveredRating(index);
    }
  };

  const handleStarLeave = () => {
    if (rating === -1) {
      setHoveredRating(-1);
    }
  };

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  //@ts-ignore
  console.log(wrongQuestionsCount);

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
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((index) => (
                  <BsStarFill
                    key={index}
                    className={`star text-gray-400 transition-colors ${
                      (hoveredRating >= index || rating >= index) &&
                      "text-yellow-500"
                    }`}
                    onMouseEnter={() => handleStarHover(index)}
                    onMouseLeave={handleStarLeave}
                    onClick={() => handleStarClick(index)}
                  />
                ))}
              </div>
              <div>
                <button
                  className={`ml-8 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${
                    rating === -1 ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={rating === -1}
                  onClick={handleSaveRating}
                >
                  AVALIAR
                </button>
              </div>
            </div>
          )}
        </div>
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

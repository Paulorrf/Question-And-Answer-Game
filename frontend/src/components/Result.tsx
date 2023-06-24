import axios from "axios";
import React, { useEffect, useState } from "react";

const Result = ({ chosenAnswers, questions }: any) => {
  const [correctAnswers, setCorrectAnswers] = useState<any>([]);
  const [answers, setAnswers] = useState<any>([]);
  //   const [showResult, setShowResult] = useState(false);
  // console.log("questions");
  // console.log(questions);
  // console.log("questions");

  // console.log("correctAnswers");
  // console.log(correctAnswers);
  // console.log("correctAnswers");

  // console.log("chosenAnswers");
  // console.log(chosenAnswers);
  // console.log("chosenAnswers");

  console.log("answers");
  console.log(answers);
  console.log("answers");

  useEffect(() => {
    // const cancelTokenSource = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios({
          method: "post",
          url: `http://localhost:5000/questions/rightAnswers`,
          data: chosenAnswers,
          //   cancelToken: cancelTokenSource.token,
        });

        // console.log("response");
        // console.log(response.data);
        // console.log("response");

        // setShowResult(true);

        const resp = response.data.map((item: any) => item.id);
        const ans = chosenAnswers.map((item: any) => item.answerId);

        setAnswers(ans);

        setCorrectAnswers(resp);

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

    // return () => {
    //   // Cancel the request when the component unmounts
    //   cancelTokenSource.cancel("Request canceled due to component unmount.");
    // };
  }, []);

  function displayAnswers(
    answerID: number,
    index: number,
    is_correct: boolean
  ) {
    return (
      <div
        key={answerID}
        className={`mb-4 rounded border border-4 bg-white p-4 ${
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

  return (
    <div className="mx-auto mt-16 w-96 text-center">
      <h3 className="mb-4 font-bold text-white">RESPOSTAS SELECIONADAS</h3>
      <p className="mb-4 font-bold text-white">
        VOCÊ ACERTOU:{" "}
        {correctAnswers.length === 1
          ? `${correctAnswers.length} RESPOSTA`
          : `${correctAnswers.length} RESPOSTAS`}
      </p>
      {answers.map((answerID: number, index: number) => {
        if (correctAnswers.includes(answerID)) {
          return displayAnswers(answerID, index, true);
        } else {
          return displayAnswers(answerID, index, false);
        }
      })}
    </div>
  );
};

export default Result;

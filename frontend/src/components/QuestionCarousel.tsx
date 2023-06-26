import React, { useState } from "react";
import Result from "./Result";

// type Answer = {
//   body: string;
//   id: number;
// };

// type Question = {
//   id: number;
//   body: string;
//   answers: Answer[];
// };

// type CarouselProps = {
//   questions: Question[];
// };

// type ChosenAnswer = {
//   questionId: number;
//   answerId: number;
// };

type Answer = {
  body: string;
  id: number;
};

type Question = {
  id: number;
  question: string;
  answers: Answer[];
};

type ChosenAnswer = {
  questionId: number;
  answerId: number;
};

type CarouselProps = {
  questions: any[];
};

const Carousel: React.FC<CarouselProps> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState<ChosenAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);

  console.log("question");
  console.log("question");
  console.log(questions);
  console.log("question");

  const handleAnswerClick = (questionId: number, answerId: number) => {
    setChosenAnswers((prevAnswers) => {
      // Remove any previously chosen answer for the same question
      const filteredAnswers = prevAnswers.filter(
        (answer) => answer.questionId !== questionId
      );

      // Add the new chosen answer
      return [...filteredAnswers, { questionId, answerId }];
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const handleSend = () => {
    // Use chosenAnswers array to send data to server or perform any desired action
    // console.log("Chosen answers:", chosenAnswers);
    setShowResults(true);
  };

  const renderQuestion = (question: Question) => {
    const { id, question: questionText, answers } = question;

    const isSelected = (questionId: number, answerId: number) =>
      chosenAnswers.some(
        (chosenAnswer) =>
          chosenAnswer.questionId === questionId &&
          chosenAnswer.answerId === answerId
      );

    return (
      <div key={id} className="flex flex-col items-center">
        <h2 className="mb-4 text-xl font-bold">{questionText}</h2>
        {answers.map((answer) => (
          <div
            key={answer.id}
            className={`mb-4 flex items-center p-4 ${
              isSelected(id, answer.id)
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleAnswerClick(id, answer.id)}
          >
            {answer.body}
          </div>
        ))}
      </div>
    );
  };

  const renderNavigationButtons = () => {
    const isFirstQuestion = currentQuestion === 0;
    const isLastQuestion = currentQuestion === questions.length - 1;

    return (
      <div className="mt-4 flex justify-center">
        {!isFirstQuestion && (
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white"
            onClick={handlePreviousQuestion}
          >
            Previous
          </button>
        )}
        {isLastQuestion ? (
          <button
            className="ml-4 rounded bg-green-500 px-4 py-2 text-white"
            onClick={handleSend}
          >
            Send
          </button>
        ) : (
          <button
            className="ml-4 rounded bg-blue-500 px-4 py-2 text-white"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        )}
      </div>
    );
  };

  //   console.log(chosenAnswers);

  return (
    <div className="container mx-auto mt-12">
      {!showResults ? (
        <>
          {renderQuestion(questions[currentQuestion])}
          {renderNavigationButtons()}
        </>
      ) : (
        <Result chosenAnswers={chosenAnswers} questions={questions} />
      )}
    </div>
  );
};

export default Carousel;

// const Carousel: React.FC<CarouselProps> = ({ questions }) => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [chosenAnswers, setChosenAnswers] = useState<Record<number, number>>(
//     {}
//   );
//   const [trueChosenAnswers, setTrueChosenAnswers] = useState<ChosenAnswer[]>(
//     []
//   );
//   //   const [chosenAnswers, setChosenAnswers] = useState<Record<number, number>>(
//   //     {}
//   //   );
//   const [showResults, setShowResults] = useState(false);

//   const handleAnswerClick = (
//     questionId: number,
//     answerIndex: number,
//     answerId: number
//   ) => {
//     setChosenAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionId]: answerIndex,
//     }));

//     setTrueChosenAnswers((prev: any) => [...prev, { questionId, answerId }]);
//   };

//   const handleNextQuestion = () => {
//     setCurrentQuestion((prevQuestion) => prevQuestion + 1);
//   };

//   const handlePreviousQuestion = () => {
//     setCurrentQuestion((prevQuestion) => prevQuestion - 1);
//   };

//   const handleSend = () => {
//     // Use chosenAnswers object to send data to server or perform any desired action
//     console.log("Chosen answers:", chosenAnswers);
//     setShowResults(true);
//   };

//   console.log(trueChosenAnswers);

//   const renderQuestion = (question: Question) => {
//     const { id, body: questionText, answers } = question;
//     const isSelected = (questionId: number, answerIndex: number) =>
//       chosenAnswers[questionId] === answerIndex;

//     return (
//       <div key={id} className="flex flex-col items-center justify-center">
//         <h2 className="mb-4 text-xl font-bold">{questionText}</h2>
//         {answers.map((answer, answerIndex) => (
//           <div
//             key={answerIndex}
//             className={`mb-4 flex w-[300px] cursor-pointer items-center p-4 ${
//               isSelected(id, answerIndex)
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200"
//             }`}
//             onClick={() => handleAnswerClick(id, answerIndex, answer.id)}
//           >
//             <p className="mx-auto">{answer.body}</p>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderNavigationButtons = () => {
//     const isFirstQuestion = currentQuestion === 0;
//     const isLastQuestion = currentQuestion === questions.length - 1;

//     return (
//       <div className="mt-4 flex justify-center">
//         {!isFirstQuestion && (
//           <button
//             className="rounded bg-blue-500 px-4 py-2 text-white"
//             onClick={handlePreviousQuestion}
//           >
//             Previous
//           </button>
//         )}
//         {isLastQuestion ? (
//           <button
//             className="ml-4 rounded bg-green-500 px-4 py-2 text-white"
//             onClick={handleSend}
//           >
//             Send
//           </button>
//         ) : (
//           <button
//             className="ml-4 rounded bg-blue-500 px-4 py-2 text-white"
//             onClick={handleNextQuestion}
//           >
//             Next
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto mt-36">
//       {!showResults ? (
//         <>
//           {renderQuestion(questions[currentQuestion])}
//           {renderNavigationButtons()}
//         </>
//       ) : (
//         <Result chosenAnswers={trueChosenAnswers} />
//       )}
//     </div>
//   );
// };

// export default Carousel;

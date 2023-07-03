import React, { useState } from "react";
import Result from "./Result";
import DeathModal from "./DeathModal";

type Answer = {
  body: string;
  id: number;
};

type Question = {
  id: number;
  question: string;
  body: string;
  question_set: {
    difficulty: string;
  };
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
  const [difficulty, setDifficulty] = useState(
    questions[0].question_set.difficulty
  );
  const [isModalOpen, setIsModalOpen] = useState(
    questions[0].question_set.difficulty === "very_hard"
  );
  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log("question");
  console.log("question");
  console.log(difficulty);
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
    const { id, question: body, answers } = question;
    console.log(body);

    const isSelected = (questionId: number, answerId: number) =>
      chosenAnswers.some(
        (chosenAnswer) =>
          chosenAnswer.questionId === questionId &&
          chosenAnswer.answerId === answerId
      );

    return (
      <div key={id} className="flex flex-col items-center">
        <h2 className="mb-8 border border-black bg-black bg-opacity-75 p-4 text-xl font-bold text-white">
          {question.body}
        </h2>

        {answers.map((answer) => (
          <div
            key={answer.id}
            className={`mb-4 flex w-96 items-center p-4 ${
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
    const currentQuestionId = questions[currentQuestion].id;
    const isNextDisabled = chosenAnswers.every(
      (chosenAnswer) => chosenAnswer.questionId !== currentQuestionId
    );

    return (
      <div className="mt-4 flex justify-center">
        {!isFirstQuestion && (
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white"
            onClick={handlePreviousQuestion}
          >
            Anterior
          </button>
        )}
        {isLastQuestion ? (
          <button
            className="ml-4 rounded bg-green-500 px-4 py-2 text-white"
            onClick={handleSend}
          >
            Enviar
          </button>
        ) : (
          <button
            className="ml-4 rounded bg-blue-500 px-4 py-2 text-white"
            onClick={handleNextQuestion}
            disabled={isNextDisabled}
          >
            Próximo
          </button>
        )}
      </div>
    );
  };

  //   console.log(chosenAnswers);

  return (
    <div className="container mx-auto mt-24">
      {!showResults ? (
        <>
          {isModalOpen && <DeathModal onClose={closeModal} />}

          {renderQuestion(questions[currentQuestion])}
          {renderNavigationButtons()}
        </>
      ) : (
        <Result
          chosenAnswers={chosenAnswers}
          questions={questions}
          difficulty={difficulty}
        />
      )}
    </div>
  );
};

export default Carousel;

import React from "react";

function Question({ correctAnswer, right, wrongAnswer }: any) {
  return (
    <div>
      <div
        className={`border-4 w-[600px] p-4 ${
          right ? "border-green-600" : "border-red-600"
        }`}
      >
        <h2 className="text-center">Aqui ficará a pergunta </h2>
        <ul className="child:mt-4 bg-red flex flex-col text-center">
          <li>
            <input
              className="mr-2"
              type="radio"
              id="answer1"
              checked={correctAnswer === 1}
            />
            <label htmlFor="answer1">Resposta 1</label>
          </li>
          <li>
            <input
              className="mr-2"
              type="radio"
              id="answer2"
              checked={correctAnswer === 2}
            />
            <label htmlFor="answer2">Resposta 2</label>
          </li>
          <li>
            <input
              className="mr-2"
              type="radio"
              id="answer3"
              checked={correctAnswer === 3}
            />
            <label htmlFor="answer3">Resposta 3</label>
          </li>

          <li>
            <input
              className="mr-2"
              type="radio"
              id="answer4"
              checked={correctAnswer === 4}
            />
            <label htmlFor="answer4">Resposta 4</label>
          </li>
        </ul>
        {!right && (
          <h2 className="mt-2 font-bold">
            A resposta correta era a {wrongAnswer} pois, descrição do porque
            seria a resposta correta
          </h2>
        )}
      </div>
    </div>
  );
}

const correctAnswer = () => {
  return (
    <div>
      <div className="left-40 top-24 absolute">
        <div className="flex border border-black p-2 rounded">
          <div className="border border-black rounded w-[100px] mr-1">
            <div className="w-[40px] h-full bg-green-400">
              <p className="absolute left-1/4 -translate-x-1/4">400/1000</p>
            </div>
          </div>
          <p className="border border-black rounded w-10 text-center">2</p>
        </div>
      </div>
      <div className="child:mb-2 left-2/4 top-1/4 -translate-x-2/4 -translate-y-1/4 absolute mt-8">
        <Question correctAnswer={1} right={true} />
        <Question correctAnswer={3} right={false} wrongAnswer={2} />
      </div>
    </div>
  );
};

export default correctAnswer;

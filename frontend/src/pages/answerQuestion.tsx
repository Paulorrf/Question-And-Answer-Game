import React from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const AnswerQuestion = () => {
  return (
    <div>
      <div className="absolute flex items-center left-2/4 top-1/4 -translate-x-2/4 -translate-y-1/4  ">
        {/* <div className="grid grid-cols-1 grid-rows-1 justify-center"> */}
        <p className="absolute -bottom-[30px] left-[45%] -translate-x-[45%]">
          Questão 1 de 10
        </p>
        <div className=" border w-[600px] border-black  p-8">
          <h2 className="text-center">Aqui ficará a pergunta </h2>
          <ul className="child:mt-4 bg-red flex flex-col text-center">
            <li>
              <input
                className="mr-2"
                type="radio"
                id="answer1"
                name="answers"
                value="resposta1"
              />
              <label htmlFor="answer1">Resposta 1</label>
            </li>
            <li>
              <input
                className="mr-2"
                type="radio"
                id="answer2"
                name="answers"
                value="resposta2"
              />
              <label htmlFor="answer2">Resposta 2</label>
            </li>
            <li>
              <input
                className="mr-2"
                type="radio"
                id="answer3"
                name="answers"
                value="resposta3"
              />
              <label htmlFor="answer3">Resposta 3</label>
            </li>

            <li>
              <input
                className="mr-2"
                type="radio"
                id="answer4"
                name="answers"
                value="resposta4"
              />
              <label htmlFor="answer4">Resposta 4</label>
            </li>
          </ul>
        </div>
        <div className="ml-2">
          <BsFillArrowRightCircleFill size={40} />
        </div>
      </div>
    </div>
  );
};

export default AnswerQuestion;

import React from "react";

import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const questions = () => {
  return (
    <div>
      <div className="w-3/4 mx-auto mt-16 child:mb-2">
        <div className="mt-2 leading-6">
          <div className="flex justify-between">
            <div>
              <h2>Questão 1</h2>
            </div>
            <div>
              <h2 className="text-green-600">Fácil</h2>
            </div>
          </div>
          <p>descrição geral sobre as perguntas</p>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold">Quantidade de perguntas: 10</h2>
            </div>
            <div className="flex items-center">
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <p className="ml-2">5.0</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-2 leading-6">
          <div className="flex justify-between">
            <div>
              <h2>Questão 2</h2>
            </div>
            <div>
              <h2 className="text-cyan-500">Normal</h2>
            </div>
          </div>
          <p>descrição geral sobre as perguntas</p>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold">Quantidade de perguntas: 12</h2>
            </div>
            <div className="flex items-center">
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStar />
              <p className="ml-2">4.0</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-2 leading-6">
          <div className="flex justify-between">
            <div>
              <h2>Questão 3</h2>
            </div>
            <div>
              <h2 className="text-amber-500">Díficil</h2>
            </div>
          </div>
          <p>descrição geral sobre as perguntas</p>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold">Quantidade de perguntas: 16</h2>
            </div>
            <div className="flex items-center">
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarHalf />
              <BsStar />
              <p className="ml-2">3.5</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-2 leading-6">
          <div className="flex justify-between">
            <div>
              <h2>Questão 4</h2>
            </div>
            <div>
              <h2 className="text-red-700">Muito Díficil</h2>
            </div>
          </div>
          <p>descrição geral sobre as perguntas</p>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold">Quantidade de perguntas: 20</h2>
            </div>
            <div className="flex items-center">
              <BsStarFill />
              <BsStarFill />
              <BsStar />
              <BsStar />
              <BsStar />
              <p className="ml-2">2.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default questions;

import React from "react";

function Question({ correctAnswer, right, wrongAnswer, data }: any) {
  return (
    <div>
      <div
        className={`w-[600px] rounded border-4 bg-white p-4 ${
          right ? "border-green-600" : "border-red-600"
        }`}
      >
        <h2 className="text-center">{data.question} </h2>
        <ul className="bg-red flex flex-col text-center child:mt-4">
          <li>
            <input
              className="mr-2"
              type="radio"
              id="answer1"
              checked={correctAnswer === 1}
            />
            <label htmlFor="answer1">{data.op1}</label>
          </li>
          <li>
            <input
              className="mr-2"
              type="radio"
              id="answer2"
              checked={correctAnswer === 2}
            />
            <label htmlFor="answer2">{data.op2}</label>
          </li>
          <li>
            <input
              className="mr-2"
              type="radio"
              id="answer3"
              checked={correctAnswer === 3}
            />
            <label htmlFor="answer3">{data.op3}</label>
          </li>

          <li>
            <input
              className="mr-2"
              type="radio"
              id="answer4"
              checked={correctAnswer === 4}
            />
            <label htmlFor="answer4">{data.op4}</label>
          </li>
        </ul>
        {!right && (
          <h2 className="mt-2 font-bold">
            A resposta correta seria a Clorofila, pois, a clorofila é o pigmento
            responsável pela cor verde nas plantas. Ela desempenha um papel
            crucial na fotossíntese, capturando a energia da luz solar e
            convertendo-a em energia química, que é utilizada para produzir
            açúcares e outros compostos orgânicos. A clorofila absorve
            principalmente a luz nas regiões azul e vermelha do espectro e
            reflete a luz verde, dando às plantas sua cor característica.
          </h2>
        )}
      </div>
    </div>
  );
}

const correctAnswer = () => {
  const data1 = {
    question:
      "Qual das seguintes estruturas é responsável pela absorção de água e nutrientes nas plantas?",
    op1: "Caule",
    op2: "Raiz",
    op3: "Folha",
    op4: "Flor",
  };
  const data2 = {
    question: "Qual é o pigmento responsável pela cor verde das plantas?",
    op1: "Clorofila",
    op2: "Antocianina",
    op3: "Carotenoide",
    op4: "Melanina",
  };
  return (
    <div className="mt-20">
      <div className="absolute left-40 top-24">
        <div className="flex rounded border border-black bg-white p-2">
          <div className="mr-1 w-[100px] rounded border border-black">
            <div className="h-full w-[40px] bg-green-400">
              <p className="absolute left-1/4 -translate-x-1/4">400/1000</p>
            </div>
          </div>
          <p className="w-10 rounded border border-black text-center">2</p>
        </div>
      </div>
      <div className="absolute left-2/4 top-1/4 mt-8 -translate-x-2/4 -translate-y-1/4 child:mb-2">
        <Question data={data1} correctAnswer={2} right={true} />
        <Question
          data={data2}
          correctAnswer={3}
          right={false}
          wrongAnswer={1}
        />
      </div>
    </div>
  );
};

export default correctAnswer;

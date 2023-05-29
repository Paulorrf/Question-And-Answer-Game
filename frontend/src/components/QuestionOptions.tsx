import React, { useState } from "react";
import useStore from "../store/store";

interface DifficultyProp {
  name: string;
  brName: string;
}

interface QuestionProps {
  difficulty: string;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
}

interface DifficultyProp {
  name: string;
  brName: string;
}

export function DifficultyOption(
  name: string,
  brName: string,
  changeDifficulty: any,
  difficulty: string
) {
  // className={`${
  //   questionNr === qntQuestoes ? "bg-white text-black" : ""
  // } cursor-pointer rounded border border-white px-4 py-2 font-bold`}
  return (
    <li
      key={name}
      className={`${
        difficulty === name ? "bg-white text-black" : ""
      } cursor-pointer rounded border border-white px-4 py-2 font-bold child:cursor-pointer child:p-2`}
      onClick={() => changeDifficulty(name)}
    >
      {brName}
      {/* <label
        htmlFor={name}
        className={difficulty === name ? " rounded border border-white" : ""}
      >
        {brName}
      </label>
      <input
        className="hidden"
        type="checkbox"
        id={name}
        name={name}
        onClick={() => setDifficulty(name)}
      /> */}
    </li>
  );
}

//@ts-ignore
const QuestionOptions = () => {
  const [qntQuestoes, setQntQuestoes] = useState(10);
  //@ts-ignore
  const difficulty = useStore((state: string) => state.difficulty);

  //@ts-ignore
  const changeDifficulty = useStore((state) => state.changeDifficulty);

  console.log("dificuldade");
  console.log(difficulty);
  console.log("dificuldade");

  const difficulties = [
    { name: "easy", brName: "Fácil" },
    { name: "normal", brName: "Normal" },
    { name: "hard", brName: "Díficil" },
    { name: "very_hard", brName: "Muito Díficil" },
    // { name: "expert", brName: "Expert" },
  ];

  return (
    <div>
      <div className="mb-16">
        <h3 className="mb-4 font-bold">
          {"Escolha a quantidade de questões".toUpperCase()}
        </h3>
        <ul className="flex justify-between">
          {[10, 15, 20].map((questionNr: number) => {
            return (
              <li
                key={questionNr}
                className={`${
                  questionNr === qntQuestoes ? "bg-white text-black" : ""
                } cursor-pointer rounded border border-white px-4 py-2 font-bold`}
                onClick={() => setQntQuestoes(questionNr)}
              >
                {questionNr}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3 className="mb-4 text-center font-bold">
          {"Selecione uma das dificuldades".toUpperCase()}
        </h3>
        <div>
          <ul className="mb-4 flex justify-center text-white child:mr-4">
            {difficulties.map((difficultyItem: DifficultyProp) => {
              return (
                <>
                  {DifficultyOption(
                    difficultyItem.name,
                    difficultyItem.brName,
                    changeDifficulty,
                    difficulty
                  )}
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuestionOptions;

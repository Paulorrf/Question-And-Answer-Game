import React, { useState, useRef } from "react";
import useStore from "../store/store";
import axios from "axios";

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

function difficultyOption(
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
  const [genericTags, setGenericTags] = useState<Array<string>>([]);
  const [recommendations, setRecommendations] = useState([]);

  const inputRef = useRef<HTMLInputElement>(null);

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

  async function handleGenericChange(event: React.FormEvent<HTMLInputElement>) {
    // console.log(event.currentTarget.value);
    if (event.currentTarget.value !== "") {
      const returnedValues = await axios.get(
        `http://localhost:5000/portal/gletter/${event.currentTarget.value}`
      );
      console.log(returnedValues.data);
      // axios.get(`http://localhost:5000/portal/sletter/${event.currentTarget.value}`)
      setRecommendations(returnedValues.data);
    } else {
      setRecommendations([]);
    }
  }

  function addGenericTag(name: string) {
    setRecommendations([]);
    setGenericTags((prev) => [...prev, name]);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

  console.log(genericTags);

  // const handleButtonClick = () => {
  //   if (inputRef.current) {
  //     inputRef.current.value = '';
  //     inputRef.current.focus();
  //   }
  // };

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
                <div key={difficultyItem.brName}>
                  {difficultyOption(
                    difficultyItem.name,
                    difficultyItem.brName,
                    changeDifficulty,
                    difficulty
                  )}
                </div>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <h3 className="mb-4 text-center font-bold">
          {"Selecione uma das tags".toUpperCase()}
        </h3>
        <div>
          <div>
            <p>Generico</p>
            <input
              type="text"
              className="w-48 text-black focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              ref={inputRef}
              onChange={handleGenericChange}
              placeholder="ex: biologia"
            />
          </div>
          <div className="w-48 bg-white text-center text-black ring-2 ring-zinc-600 ">
            {recommendations.length > 0 && (
              <ul className="flex justify-around p-2 child:mr-2">
                {recommendations.map(
                  (recommendation: { id: number; name: string }) => {
                    return (
                      <li
                        key={recommendation.id}
                        className="cursor-pointer underline underline-offset-1 hover:font-bold"
                        onClick={() => addGenericTag(recommendation.name)}
                      >
                        {recommendation.name}
                      </li>
                    );
                  }
                )}
              </ul>
            )}
          </div>
          <div>
            <p>Especifico</p>
            <input type="text" placeholder="ex: zoologia" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionOptions;

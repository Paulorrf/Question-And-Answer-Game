import React, { useState, useRef, useEffect } from "react";
import useStore from "../store/store";
import axios from "axios";
import { BsArrowRightSquareFill } from "react-icons/bs";
import questionQuantityStore from "@/store/questionsQuantityStore";
import tagsStore from "@/store/tagsStore";
import nextBtnStore from "@/store/nextBtnStore";
import setQuestionStore from "@/store/setQuestionStore";

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
  return (
    <li
      key={name}
      className={`${
        difficulty === name ? "bg-white text-black" : ""
      } cursor-pointer rounded border border-white px-4 py-2 font-bold child:cursor-pointer child:p-2`}
      onClick={() => changeDifficulty(name)}
    >
      {brName}
    </li>
  );
}

//@ts-ignore
const QuestionOptions = () => {
  const [qntQuestoes, setQntQuestoes] = useState(10);
  const [genericTags, setGenericTags] = useState<Array<string>>([]);
  const [specificTags, setSpecificTags] = useState<Array<string>>([]);
  const [recommendations, setRecommendations] = useState([]);
  const [recSpec, setRecSpec] = useState([]);
  const [idxGen, setIdxGen] = useState<number>(0);
  const [idxSpec, setIdxSpec] = useState<number>(0);

  const quantityOptions = [1, 3, 10, 15, 20];

  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRefDesc = useRef<HTMLInputElement>(null);
  const inputRefTitle = useRef<HTMLInputElement>(null);

  //zustand values
  const difficulty = useStore((state) => state.difficulty);
  const quantity = questionQuantityStore((state) => state.quantity);
  const tagsGeneric = tagsStore((state) => state.genericTags);
  const tagsSpec = tagsStore((state) => state.specificTags);

  //zustand functions
  const changeDifficulty = useStore((state) => state.changeDifficulty);
  const changeQuantity = questionQuantityStore((state) => state.changeQuantity);
  const changeTagsGeneric = tagsStore((state) => state.changeGeneric);
  const changeTagsSpec = tagsStore((state) => state.changeSpecific);
  const changeQuestionSet = setQuestionStore(
    (state) => state.changeQuestionSet
  );

  const isActionEnabled = nextBtnStore((state) => state.isActionEnabled);
  const performAction = nextBtnStore((state) => state.performAction);

  console.log("dificuldade");
  console.log(tagsGeneric);
  console.log("dificuldade");

  const difficulties = [
    { name: "easy", brName: "Fácil" },
    { name: "normal", brName: "Normal" },
    { name: "hard", brName: "Díficil" },
    { name: "very_hard", brName: "Muito Díficil" },
    // { name: "expert", brName: "Expert" },
  ];

  useEffect(() => {
    if (genericTags.length === 0) {
      setSpecificTags([]);
    }
  }, [genericTags]);

  useEffect(() => {
    if (isActionEnabled) {
      performAction(genericTags, specificTags);
    }
    // eslint-disable-next-line
  }, [isActionEnabled, performAction]);

  async function handleGenericChange(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget.value !== "") {
      const returnedValues = await axios.get(
        `http://localhost:5000/portal/gletter/${event.currentTarget.value}`
      );
      console.log(returnedValues.data);
      setRecommendations(returnedValues.data);
    } else {
      setRecommendations([]);
    }
  }

  const handleTitleInput = () => {
    if (inputRefTitle.current?.value !== null) {
      changeQuestionSet({
        title: inputRefTitle.current?.value!,
        description: inputRefDesc.current?.value ?? "",
      });
      // setInputValue(inputRef.current.value);
    }
  };

  const handleDescInput = () => {
    if (inputRefDesc.current?.value !== null) {
      changeQuestionSet({
        title: inputRefTitle.current?.value! ?? "",
        description: inputRefDesc.current?.value!,
      });
      // setInputValue(inputRef.current.value);
    }
  };

  async function handleSpecificChange(
    event: React.FormEvent<HTMLInputElement>
  ) {
    if (event.currentTarget.value !== "" && genericTags.length > 0) {
      const words = genericTags.join();
      console.log(words);

      const returnedValues = await axios.get(
        `http://localhost:5000/portal/sletter/${event.currentTarget.value}/${words}`
      );
      console.log(returnedValues.data);
      setRecSpec(returnedValues.data);
    } else {
      setRecSpec([]);
    }
  }

  function addGenericTag(name: string, index: number) {
    setRecommendations([]);
    //@ts-ignore
    setIdxGen((prev) => {
      let val = (prev ??= 0);
      return val + 1;
    });
    changeTagsGeneric(name);
    setGenericTags((prev) => [...prev, name]);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

  function addSpecificTag(name: string) {
    setRecSpec([]);
    changeTagsSpec(name);
    setSpecificTags((prev) => [...prev, name]);
    if (inputRef2.current) {
      inputRef2.current.value = "";
      inputRef2.current.focus();
    }
  }

  function handleGenericDelete() {
    const genUpdated = [...genericTags];
    if (idxGen) {
      genUpdated.splice(idxGen - 1, 1);
      setIdxGen((prev) => {
        let val = (prev ??= 0);
        return prev <= 0 ? 0 : val - 1;
      });
      setGenericTags(genUpdated);
    }
  }
  function handleSpecificDelete() {
    const specUpdated = [...specificTags];
    if (idxGen) {
      specUpdated.splice(idxGen - 1, 1);
      setIdxSpec((prev) => {
        let val = (prev ??= 0);
        return prev <= 0 ? 0 : val - 1;
      });
      setSpecificTags(specUpdated);
    }
  }

  // function handleSpecificDelete(index: number) {
  //   const specUpdated = [...specificTags];
  //   specUpdated.splice(index, 1);
  //   setSpecificTags(specUpdated);
  // }

  function handleAddGeneric(event: React.SyntheticEvent) {
    event.preventDefault();

    if (inputRef.current !== null && inputRef.current.value !== null) {
      let value = inputRef.current.value;
      changeTagsGeneric(value);
      setGenericTags((prev) => [...prev, value]);
      inputRef.current.value = "";
    }
  }

  function handleAddSpecific(event: React.SyntheticEvent) {
    event.preventDefault();

    if (inputRef2.current !== null && inputRef2.current.value !== null) {
      let value = inputRef2.current.value;
      changeTagsSpec(value);
      setSpecificTags((prev) => [...prev, value]);
      inputRef2.current.value = "";
    }
  }

  // console.log(specificTags);
  // console.log(idxGen);

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
          {quantityOptions.map((questionNr: number) => {
            return (
              <li
                key={questionNr}
                className={`${
                  questionNr === quantity ? "bg-white text-black" : ""
                } cursor-pointer rounded border border-white px-4 py-2 font-bold`}
                // onClick={() => setQntQuestoes(questionNr)}
                onClick={() => changeQuantity(questionNr)}
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
      <div>
        <h3 className="mb-4 text-center font-bold">
          {"Adicione um titulo".toUpperCase()}
        </h3>
        <div>
          <input
            type="text"
            className="h-8 w-48 text-black focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            ref={inputRefTitle}
            onChange={handleTitleInput}
            placeholder="Título"
          />
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-center font-bold">
          {"Adicione uma descrição".toUpperCase()}
        </h3>
        <div>
          <input
            type="text"
            className="h-8 w-48 text-black focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            ref={inputRefDesc}
            onChange={handleDescInput}
            placeholder="Descrição"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <h3 className="mb-4 text-center font-bold">
          {"Selecione uma das tags".toUpperCase()}
        </h3>
        <div>
          <div>
            <p>Generico</p>
            <div className="flex">
              <input
                type="text"
                className="h-8 w-48 text-black focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                ref={inputRef}
                onChange={handleGenericChange}
                placeholder="ex: biologia"
              />
              <div className="-ml-1" onClick={handleAddGeneric}>
                <BsArrowRightSquareFill size={32} />
              </div>
              <div>
                {genericTags.length > 0 && (
                  <ul className="flex">
                    {genericTags.map((tag) => {
                      return (
                        <li key={tag}>
                          {tag}{" "}
                          <button onClick={() => handleGenericDelete()}>
                            Delete
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="w-48 bg-white text-center text-black ring-2 ring-zinc-600">
            {recommendations.length > 0 && (
              <ul className="flex justify-around p-2 child:mr-2">
                {recommendations.map(
                  (
                    recommendation: { id: number; name: string },
                    index: number
                  ) => {
                    return (
                      <li
                        key={recommendation.id}
                        className="cursor-pointer underline underline-offset-1 hover:font-bold"
                        onClick={() =>
                          addGenericTag(recommendation.name, index)
                        }
                      >
                        {recommendation.name}
                      </li>
                    );
                  }
                )}
              </ul>
            )}
          </div>
          {genericTags.length > 0 && (
            <div>
              <div>
                <p>Especifico</p>
                <div className="flex">
                  <input
                    type="text"
                    className="h-8 w-48 text-black focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    ref={inputRef2}
                    onChange={handleSpecificChange}
                    placeholder="ex: zoologia"
                  />
                  <div className="-ml-1" onClick={handleAddSpecific}>
                    <BsArrowRightSquareFill size={32} />
                  </div>
                </div>
                <div className="flex">
                  {specificTags.length > 0 && (
                    <ul className="flex">
                      {specificTags.map((tag) => {
                        return (
                          <li key={tag}>
                            {tag}{" "}
                            <button onClick={() => handleSpecificDelete()}>
                              Delete
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>

              {recSpec.length > 0 && (
                <div className="w-48 bg-white text-center text-black ring-2 ring-zinc-600">
                  <ul className="grid grid-flow-col grid-rows-4 gap-4 p-2 child:mr-2">
                    {recSpec.map((recSpec: { id: number; name: string }) => {
                      return (
                        <li
                          key={recSpec.id}
                          className="cursor-pointer underline underline-offset-1 hover:font-bold"
                          onClick={() => addSpecificTag(recSpec.name)}
                        >
                          {recSpec.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionOptions;

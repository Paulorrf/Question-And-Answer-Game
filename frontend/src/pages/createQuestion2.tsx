import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import QuestionOptions from "../components/QuestionOptions";

import CreateQuestionForm from "@/components/CreateQuestionForm";
import questionStore from "@/store/questionsStore";
import nextBtnStore from "@/store/nextBtnStore";
import tagsStore from "@/store/tagsStore";

function CreateQuestion2() {
  const [proximo, setProximo] = useState(0);

  const initializeStores = () => {
    tagsStore();
    nextBtnStore();
  };

  initializeStores();

  //eslint-disable-next-line
  const arr2 = [<QuestionOptions />, <CreateQuestionForm />];

  //@ts-ignore
  const questions = questionStore((state) => state.questions);

  const setActionEnabled = nextBtnStore((state) => state.setActionEnabled);

  function handleProximo() {
    setProximo((prev: number) => prev + 1);
    setActionEnabled(true);
  }

  // console.log(tagsGeneric);
  // console.log(tagsSpec);

  return (
    <div className="absolute left-2/4 top-1/4 mb-4 mt-16 -translate-x-2/4 -translate-y-1/4 text-center text-white">
      <h2 className="mb-8 text-center text-2xl font-bold">Criar Pergunta</h2>

      {proximo === 0 ? arr2[proximo] : arr2[proximo]}

      {proximo === 0 && (
        <button className="btn-primary mt-8" onClick={handleProximo}>
          Proximo
        </button>
      )}
    </div>
  );
}

export default CreateQuestion2;

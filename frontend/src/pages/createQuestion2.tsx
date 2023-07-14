import { useState } from "react";
import QuestionOptions from "../components/QuestionOptions";

import CreateQuestionForm from "@/components/CreateQuestionForm";
import questionStore from "@/store/questionsStore";
import nextBtnStore from "@/store/nextBtnStore";
import tagsStore from "@/store/tagsStore";
import Layout from "@/components/Layout";

function CreateQuestion2() {
  const [proximo, setProximo] = useState(0);

  const initializeStores = () => {
    tagsStore();
    nextBtnStore();
  };

  initializeStores();

  const arr2 = [
    <QuestionOptions key={0} setProximo={setProximo} />,
    <CreateQuestionForm key={1} setProximo={setProximo} />,
  ];

  return (
    <Layout>
      <div className="absolute left-2/4 top-1/4 mb-4 mt-16 -translate-x-2/4 -translate-y-1/4 text-center text-white">
        <h2 className="mb-8 text-center text-2xl font-bold">Criar Pergunta</h2>

        {proximo === 0 ? arr2[proximo] : arr2[proximo]}
      </div>
    </Layout>
  );
}

export default CreateQuestion2;

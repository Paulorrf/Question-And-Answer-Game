import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestionFn } from "@/api/questions";

import { decode } from "jsonwebtoken";
import questionStore from "@/store/questionsStore";
import questionQuantityStore from "@/store/questionsQuantityStore";
import tagsStore from "@/store/tagsStore";
import setQuestionStore from "@/store/setQuestionStore";
import { useRouter } from "next/router";

interface AnswerProp {
  body: string;
  answerNr: number;
}

interface IFormInput {
  question: String;
  resposta1: String;
  resposta2: String;
  resposta3: String;
  resposta4: String;
  description: String;
  tags: String[];
  user_id: Number;
}

interface Questions {
  question: String;
  answer1: String;
  answer2: String;
  answer3: String;
  answer4: String;
  tags: String[];
  answer: number;
  difficulty: String;
  description: String;
  user_id: Number | undefined;
}

const CreateQuestionForm = ({
  setProximo,
}: {
  setProximo: Dispatch<SetStateAction<number>>;
}) => {
  const [answer, setAnswer] = useState(1);
  const [quantity, setQuantity] = useState(0);

  const router = useRouter();

  const totalQuantity = questionQuantityStore((state) => state.quantity);

  const setTitle = setQuestionStore((state) => state.question_set.title);
  const setDesc = setQuestionStore((state) => state.question_set.description);
  const setDifficulty = setQuestionStore(
    (state) => state.question_set.difficulty
  );

  const addQuestion = questionStore((state) => state.addQuestion);
  const questions = questionStore((state) => state.questions);

  const tags_primary = tagsStore((state) => state.genericTags);
  const tags_spec = tagsStore((state) => state.specificTags);

  // console.log(tags_spec);

  useEffect(() => {
    //manda dados das questoes pro backend
    if (quantity === totalQuantity) {
      console.log("entrou-kle");
      mutation.mutate({
        question_set: {
          title: setTitle,
          description: setDesc,
          difficulty: setDifficulty,
        },
        questions,
        tags_primary,
        tags_spec,
      });

      router.push("/");
    }
    // eslint-disable-next-line
  }, [quantity, totalQuantity]);

  const { control, register, handleSubmit, reset } = useForm();
  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    console.log(data);

    addQuestion({
      body: data.question,
      description_right_answer: data.description,
      //@ts-ignore
      user_id: Number(decode(localStorage?.getItem("user")).sub),
      answers: [
        {
          body: data.resposta1,
          is_correct: answer === 1 ? true : false,
        },
        {
          body: data.resposta2,
          is_correct: answer === 2 ? true : false,
        },
        {
          body: data.resposta3,
          is_correct: answer === 3 ? true : false,
        },
        {
          body: data.resposta4,
          is_correct: answer === 4 ? true : false,
        },
      ],
    });

    setQuantity((prev: number) => prev + 1);

    reset();
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createQuestionFn,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["question"] });
    },
  });

  const difficulties = [
    { name: "easy", brName: "Fácil" },
    { name: "normal", brName: "Normal" },
    { name: "hard", brName: "Díficil" },
    { name: "very_hard", brName: "Muito Díficil" },
    // { name: "expert", brName: "Expert" },
  ];

  const answers = [
    { body: "resposta1", answerNr: 1 },
    { body: "resposta2", answerNr: 2 },
    { body: "resposta3", answerNr: 3 },
    { body: "resposta4", answerNr: 4 },
  ];

  function AnswerOptions(name: string, answerNr: number) {
    return (
      <textarea
        maxLength={200}
        rows={2}
        cols={80}
        placeholder={name}
        key={name}
        {...register(name as keyof IFormInput, { required: true })}
        className={
          answerNr === answer ? "border-4 border-green-600" : "border-black"
        }
      />
    );
  }

  function RightAnswer(value: number) {
    return (
      <li
        key={value}
        className={answer === value ? "bg-green-500 text-white" : ""}
        onClick={() => setAnswer(value)}
      >
        {value}
      </li>
    );
  }

  function handlePrevious() {
    setProximo((prev: number) => prev - 1);
  }

  // console.log("questions");
  // console.log(tags_primary);
  // console.log(tags_spec);
  // // console.log(quantity);
  // // console.log(totalQuantity);
  // console.log("questions");

  return quantity === totalQuantity ? (
    <p>Criando o questionário...</p>
  ) : (
    <div key="123">
      <h2 className="mb-2">{`Questão ${quantity + 1} de ${totalQuantity}`}</h2>
      <form
        id="create-question-form"
        className="flex flex-col items-center"
        //@ts-ignore
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          className="mb-4 resize-none rounded border-2 border-black text-black"
          placeholder="Questão"
          maxLength={200}
          rows={3}
          cols={80}
          {...register("question", { required: true })}
          required
        />

        <div className="flex w-full flex-col text-black child:mb-2 child:resize-none child:rounded child:border-2 ">
          {answers.map((anwer: AnswerProp) => {
            return AnswerOptions(anwer.body, anwer.answerNr);
          })}
        </div>

        <div className="mb-4 flex">
          <h3 className="mr-4 font-bold">Qual a resposta correta?</h3>

          <ul className="flex child:mr-2 child:cursor-pointer child:border child:border-white child:px-2">
            {[1, 2, 3, 4].map((value: number) => {
              return RightAnswer(value);
            })}
          </ul>
        </div>

        <div>
          <p>Adicionar uma descrição para a resposta correta </p>
          <textarea
            className="mb-4 resize-none rounded border-2 border-black text-black"
            placeholder="Questão"
            maxLength={200}
            rows={3}
            cols={80}
            {...register("description", { required: true })}
            required
          />
        </div>
        <div className="mb-8 mt-4 flex items-center justify-center">
          {questions.length <= 0 && (
            <button className="btn-primary mr-4" onClick={handlePrevious}>
              Voltar
            </button>
          )}

          <button type="submit" className="btn-primary mr-4">
            {quantity < totalQuantity - 1 ? "Próximo" : "Criar Pergunta"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestionForm;

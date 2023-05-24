import ReactDOM from "react-dom";
import { useState, SyntheticEvent, useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestionFn } from "@/api/questions";

import { MdDelete } from "react-icons/md";
import { DifficultyOption } from "@/module/createQuestion/createQuestionFunctions";

import { decode } from "jsonwebtoken";

interface DifficultyProp {
  name: string;
  brName: string;
}

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

function CreateQuestion2() {
  const [difficulty, setDifficulty] = useState("easy");
  const [answer, setAnswer] = useState(1);
  const [quantity, setQuantity] = useState(0);
  const [questions, setQuestions] = useState<Questions[]>([]);

  const { control, register, handleSubmit, reset } = useForm();
  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    // console.log(data);

    setQuestions((prev: Questions[]) => [
      ...prev,
      {
        question: data.question,
        answer1: data.resposta1,
        answer2: data.resposta2,
        answer3: data.resposta3,
        answer4: data.resposta4,
        tags: data.tags,
        answer,
        difficulty,
        description: data.description,
        //@ts-ignore
        user_id: Number(decode(localStorage?.getItem("user")).sub),
      },
    ]);

    if (quantity === 4) {
      console.log("questions");
      console.log(questions);

      mutation.mutate(questions);
      // mutation.mutate({
      //   question: data.question,
      //   answer1: data.resposta1,
      //   answer2: data.resposta2,
      //   answer3: data.resposta3,
      //   answer4: data.resposta4,
      //   tags: data.tags,
      //   answer,
      //   difficulty,
      //   description: data.description,
      //   //@ts-ignore
      //   user_id: decode(localStorage?.getItem("user")).sub,
      // });
    }

    setQuantity((prev: number) => prev + 1);

    reset();
  };
  const { fields, append, remove } = useFieldArray({
    name: "tags", // unique name for your Field Array
    control,
  });

  // console.log(questions);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createQuestionFn,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["question"] });
    },
  });

  if (typeof window !== "undefined") {
    //@ts-ignore
    console.log(decode(localStorage?.getItem("user")).sub);
  }

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
        {...register(name)}
        className={answerNr === answer ? "border-green-600" : "border-black"}
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

  return (
    <div className="absolute left-2/4 top-1/4 mb-4 mt-16 -translate-x-2/4 -translate-y-1/4 text-white">
      <h2 className="mb-8 text-center text-2xl font-bold">Criar Pergunta</h2>

      <h3>Questão {quantity} de 20</h3>

      <h3 className="mb-4 text-center font-bold">Dificuldade</h3>
      <div>
        <ul className="mb-4 flex justify-center text-white child:mr-4">
          {difficulties.map((difficultyItem: DifficultyProp) => {
            return DifficultyOption(
              difficultyItem.name,
              difficultyItem.brName,
              difficulty,
              setDifficulty
            );
          })}
        </ul>
      </div>

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
          {...register("question")}
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
            {...register("description")}
            required
          />
        </div>

        <div className="mt-2">
          <p>Selecione até 5 tags</p>

          <ul className="flex flex-col items-center justify-center text-black">
            {fields.map((field, index) => (
              <li key={field.id} className="mb-2 flex items-center">
                <input
                  className="w-16 border border-black"
                  {...register(`tags.${index}.value`)}
                />

                <button type="button" onClick={() => remove(index)}>
                  <MdDelete color="white" size="20" />
                </button>
              </li>
            ))}
          </ul>

          <button type="button" onClick={() => append({ tag: "" })}>
            Novo
          </button>
        </div>

        <div className="mb-8 mt-4 flex items-center justify-center">
          <button type="submit" className="btn-primary mr-4">
            {quantity < 10 ? "Próximo" : "Criar Pergunta"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateQuestion2;
import React, { SyntheticEvent, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestionFn } from "@/api/questions";
import axios from "axios";

interface DifficultyProp {
  name: string;
  brName: string;
}

interface AnswerProp {
  body: string;
  answerNr: number;
}

interface Question {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  tags: string[];
  answer: string;
}

const CreateQuestion = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [answer, setAnswer] = useState(1);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);

  const queryClient = useQueryClient();

  function nextFn() {
    setDifficulty("easy");
    setAnswer(1);
    setDescription("");
    setQuantity((prev: number) => prev + 1);
    // document.getElementById("create-question-form")!.reset();
  }

  async function createQuestionFn({
    question,
    answer1,
    answer2,
    answer3,
    answer4,
    tags,
    answer,
    difficulty,
    description,
  }: any) {
    const questions = await axios({
      method: "post",
      url: "http://localhost:5000/perguntas/create",
      data: {
        question,
        answer1,
        answer2,
        answer3,
        answer4,
        tags,
        answer,
        difficulty,
        description,
      },
    });
    return questions.data;
  }

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
    { body: "Resposta1", answerNr: 1 },
    { body: "Resposta2", answerNr: 2 },
    { body: "Resposta3", answerNr: 3 },
    { body: "Resposta4", answerNr: 4 },
  ];

  function DifficultyOption(name: string, brName: string) {
    return (
      <li key={name} className="child:cursor-pointer child:p-2">
        <label
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
        />
      </li>
    );
  }

  function AnswerOptions(name: string, answerNr: number) {
    return (
      <textarea
        name={name}
        maxLength={200}
        rows={2}
        cols={80}
        placeholder={name}
        key={name}
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

  function addTag(event: SyntheticEvent) {
    setTags((prev: Array<string>) => [...prev, tag]);
    setTag("");
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    const question = (event?.target as any).question.value;
    const answer1 = (event?.target as any).Resposta1.value;
    const answer2 = (event?.target as any).Resposta2.value;
    const answer3 = (event?.target as any).Resposta3.value;
    const answer4 = (event?.target as any).Resposta4.value;

    console.log("form");
    console.log(`question ${question}`);
    console.log(`answer1 ${answer1}`);
    console.log(`answer2 ${answer2}`);
    console.log(`answer3 ${answer3}`);
    console.log(`answer4 ${answer4}`);
    console.log(`tags ${tags}`);
    console.log(`answer ${answer}`);
    console.log("form");

    mutation.mutate({
      question,
      answer1,
      answer2,
      answer3,
      answer4,
      tags,
      answer,
      difficulty,
      description,
    });
  }

  return (
    <div className="absolute left-2/4 top-1/4 mb-4 mt-16 -translate-x-2/4 -translate-y-1/4 text-white">
      <h2 className="mb-8 text-center text-2xl font-bold">Criar Pergunta</h2>

      <h3>Questão {quantity} de 20</h3>

      <h3 className="mb-4 text-center font-bold">Dificuldade</h3>
      <div>
        <ul className="mb-4 flex justify-center text-white child:mr-4">
          {difficulties.map((difficulty: DifficultyProp) => {
            return DifficultyOption(difficulty.name, difficulty.brName);
          })}
        </ul>
      </div>

      <form
        id="create-question-form"
        className="flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <textarea
          className="mb-4 resize-none rounded border-2 border-black text-black"
          id="question"
          name="question"
          placeholder="Questão"
          maxLength={200}
          rows={3}
          cols={80}
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
            id="description"
            name="description"
            placeholder="Descrição"
            maxLength={200}
            rows={3}
            cols={80}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>

        <div className="mt-2">
          <p>Selecione até 5 tags</p>
          <input
            onChange={(e: any) => setTag(e.target.value)}
            type="text"
            name="tag"
            className="input-primary mr-2 py-0 text-black"
            placeholder="tag"
            value={tag}
          />
          <button type="button" onClick={addTag}>
            Adicionar
          </button>
        </div>
        <div className="mt-2 flex">
          <p className="mr-4 font-bold">tags selecionadas: </p>
          <ul className="flex">
            {tags.map((item: string) => {
              return (
                <li className="mr-2" key={item}>
                  {item.toUpperCase()}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mb-8 mt-4 flex items-center justify-center">
          {quantity >= 3 && (
            <button className="btn-primary mr-4">Criar Pergunta</button>
          )}
          <input
            type="button"
            className="btn-primary cursor-pointer"
            onClick={() => nextFn()}
            value="Próximo"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateQuestion;

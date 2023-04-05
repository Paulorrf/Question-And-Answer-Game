import React, { SyntheticEvent, useState } from "react";

interface DifficultyProp {
  name: string;
  brName: string;
}

interface AnswerProp {
  body: string;
  answerNr: number;
}

const CreateQuestion = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [answer, setAnswer] = useState<number>(1);
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [description, setDescription] = useState("");
  const [showDescrip, setShowDescrip] = useState(false);

  const difficulties = [
    { name: "easy", brName: "Fácil" },
    { name: "normal", brName: "Normal" },
    { name: "hard", brName: "Díficil" },
    { name: "very_hard", brName: "Muito Díficil" },
    // { name: "expert", brName: "Expert" },
  ];

  const answers = [
    { body: "Resposta 1", answerNr: 1 },
    { body: "Resposta 2", answerNr: 2 },
    { body: "Resposta 3", answerNr: 3 },
    { body: "Resposta 4", answerNr: 4 },
  ];

  function DifficultyOption(name: string, brName: string) {
    return (
      <li key={name} className="child:cursor-pointer child:p-2">
        <label
          htmlFor={name}
          className={difficulty === name ? " rounded border border-black" : ""}
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

  return (
    <div className="absolute top-1/4 left-2/4 mt-12 -translate-y-1/4 -translate-x-2/4">
      <h2 className="mb-8 text-center text-2xl font-bold">Criar Pergunta</h2>

      <h3 className="mb-4 text-center font-bold">Dificuldade</h3>
      <div>
        <ul className="mb-4 flex justify-center child:mr-4">
          {difficulties.map((difficulty: DifficultyProp) => {
            return DifficultyOption(difficulty.name, difficulty.brName);
          })}
        </ul>
      </div>

      <form className="flex flex-col items-center">
        <textarea
          className="mb-4 resize-none rounded border-2 border-black"
          id="question"
          name="question"
          placeholder="Questão"
          maxLength={200}
          rows={3}
          cols={80}
          required
        />

        <div className="flex w-full flex-col child:mb-2 child:resize-none child:rounded child:border-2 ">
          {answers.map((anwer: AnswerProp) => {
            return AnswerOptions(anwer.body, anwer.answerNr);
          })}
        </div>

        <div className="mb-4 flex">
          <h3 className="mr-4 font-bold">Qual a resposta correta?</h3>

          <ul className="flex child:mr-2 child:cursor-pointer child:border child:border-black child:px-2">
            {[1, 2, 3, 4].map((value: number) => {
              return RightAnswer(value);
            })}
          </ul>
        </div>

        <div>
          <p>
            Adicionar uma descrição para a resposta correta?{" "}
            <span onClick={() => setShowDescrip((prev) => !prev)}>+</span>
          </p>
          {showDescrip && (
            <textarea
              className="mb-4 resize-none rounded border-2 border-black"
              id="description"
              name="description"
              placeholder="Descrição"
              maxLength={200}
              rows={3}
              cols={80}
              required
            />
          )}
        </div>

        <div>
          <p>Selecione até 5 tags</p>
          <input
            onChange={(e: any) => setTag(e.target.value)}
            type="text"
            name="tag"
            className="input-primary mr-2 py-0"
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

        <button className="btn-primary">Criar Pergunta</button>
      </form>
    </div>
  );
};

export default CreateQuestion;

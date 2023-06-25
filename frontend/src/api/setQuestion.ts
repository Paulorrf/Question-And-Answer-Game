import axios from "axios";

export async function getSetQuestions(questionId: Number) {
  const questions = await axios({
    method: "get",
    url: `https://question-and-answer-game-production.up.railway.app/perguntas/one/${questionId}`,
  });

  console.log("questions data");
  console.log(questions.data);
  console.log("questions data");

  return questions.data === undefined ? {} : questions.data;
}

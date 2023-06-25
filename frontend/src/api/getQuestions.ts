import axios from "axios";

export async function getQuestions() {
  const questions = await axios({
    method: "get",
    url: "https://question-and-answer-game-production.up.railway.app/perguntas/10",
  });
  return questions.data;
}

import axios from "axios";

export async function getQuestions() {
  const questions = await axios({
    method: "get",
    url: "http://localhost:5000/perguntas/10",
  });
  return questions.data;
}

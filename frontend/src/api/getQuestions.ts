// import axios from "axios";

import axios from "@/axios";

export async function getQuestions() {
  const questions = await axios({
    method: "get",
    url: "perguntas/10",
  });
  return questions.data;
}

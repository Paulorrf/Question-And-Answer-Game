// import axios from "axios";
import axios from "@/axios";

interface Question {
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

export async function createQuestionFn(data: any) {
  const questions = await axios({
    method: "post",
    url: "questions/create",
    data: {
      data,
    },
  });
  return questions.data;
}

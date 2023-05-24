import axios from "axios";

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

export async function createQuestionFn(data: Question[]) {
  const questions = await axios({
    method: "post",
    url: "http://localhost:5000/perguntas/create",
    data: {
      data,
    },
  });
  return questions.data;
}
// export async function createQuestionFn({
//   question,
//   answer1,
//   answer2,
//   answer3,
//   answer4,
//   tags,
//   answer,
//   difficulty,
//   description,
//   user_id,
// }: Question) {
//   const questions = await axios({
//     method: "post",
//     url: "http://localhost:5000/perguntas/create",
//     data: {
//       question,
//       answer1,
//       answer2,
//       answer3,
//       answer4,
//       tags,
//       answer,
//       difficulty,
//       description,
//       user_id,
//     },
//   });
//   return questions.data;
// }
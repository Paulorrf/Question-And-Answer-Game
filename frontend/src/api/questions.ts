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

export async function createQuestionFn(data: any) {
  const questions = await axios({
    method: "post",
    url: "https://question-and-answer-game-production.up.railway.app/questions",
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
//     url: "https://question-and-answer-game-production.up.railway.app/perguntas/create",
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

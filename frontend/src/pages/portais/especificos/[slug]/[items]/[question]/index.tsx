import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import QuestionCarousel from "../../../../../../components/QuestionCarousel";

interface Answer {
  id: number;
  body: string;
  question_id: number;
  is_correct: boolean;
}

type Repo = {
  id: number;
  description_right_answer: number;
  body: string;
  question_set_id: number;
  situation: "active";
  user_data_id: number;
  answers: Answer[];
};

export const getServerSideProps: GetServerSideProps<{
  repo: Repo[];
}> = async ({ query }) => {
  console.log("query");
  console.log(query);
  const res = await fetch(
    `http://localhost:5000/questions/questions/${query.question}`
  );
  const repo = await res.json();
  return { props: { repo } };
};

// const data = [
//   {
//     id: 1,
//     question: "What is your favorite color?",
//     answers: [
//       { body: "Red" },
//       { body: "Blue" },
//       { body: "Green" },
//       { body: "Yellow" },
//     ],
//   },
//   {
//     id: 2,
//     question: "What is your favorite animal?",
//     answers: [
//       { body: "Dog" },
//       { body: "Cat" },
//       { body: "Elephant" },
//       { body: "Lion" },
//     ],
//   },
//   {
//     id: 3,
//     question: "What is your favorite food?",
//     answers: [
//       { body: "Pizza" },
//       { body: "Burger" },
//       { body: "Sushi" },
//       { body: "Pasta" },
//     ],
//   },
// ];

const index = ({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(repo);
  return (
    <div>
      <QuestionCarousel questions={repo} />
    </div>
  );
};

export default index;

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import QuestionCarousel from "../../../../../../components/QuestionCarousel";
import Layout from "@/components/Layout";
import axios from "@/axios";

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
  difficulty: string;
  answers: Answer[];
};

export const getServerSideProps: GetServerSideProps<{
  repo: Repo[];
}> = async ({ query }) => {
  // console.log("query");
  // console.log(query);
  // const res = await fetch(
  //   `https://question-and-answer-game-production.up.railway.app/questions/questions/${query.question}`
  // );
  // const repo = await res.json();
  const res = await axios.get(`questions/questions/${query.question}`);
  return { props: { repo: res.data } };
};

const index = ({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // console.log(repo);
  return (
    <Layout>
      <div>
        <QuestionCarousel questions={repo} />
      </div>
    </Layout>
  );
};

export default index;

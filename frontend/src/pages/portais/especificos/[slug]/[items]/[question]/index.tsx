import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import QuestionCarousel from "../../../../../../components/QuestionCarousel";
import Layout from "@/components/Layout";

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
  // console.log("query");
  // console.log(query);
  const res = await fetch(
    `http://localhost:5000/questions/questions/${query.question}`
  );
  const repo = await res.json();
  return { props: { repo } };
};

const index = ({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(repo);
  return (
    <Layout>
      <div>
        <QuestionCarousel questions={repo} />
      </div>
    </Layout>
  );
};

export default index;

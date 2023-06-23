import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";

type Repo = {
  id: number;
  answered_number: number;
  title: string;
  description: string;
  rating: number;
  difficulty: string;
  situation: string;
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

const index = ({ repo }: any) => {
  console.log(repo);
  return <div></div>;
};

export default index;

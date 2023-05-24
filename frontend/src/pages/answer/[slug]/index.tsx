import { getSetQuestions } from "@/api/setQuestion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";

export const getServerSideProps: any = async (props: any) => {
  console.log(props);
  // const res = await fetch('https://api.github.com/repos/vercel/next.js');
  // const repo = await res.json();
  return { props: { id: props.query.slug } };
};

const Page = (props: any) => {
  // Access the client
  const queryClient = useQueryClient();
  console.log(props);

  function delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const router = useRouter();
  console.log(router.query.slug);

  // Queries
  const { data, status } = useQuery({
    queryKey: ["setQuestions"],
    queryFn: () => getSetQuestions(Number(props.id)),
    // retry: 3,
  });

  console.log(data);

  function question(data: any) {
    if (data === undefined) return;
    return (
      <div className="absolute left-2/4 top-2/4 -mt-28 -translate-x-2/4 -translate-y-2/4">
        <div className="rounded border border-black bg-slate-800 px-32 py-16 text-white">
          <h3 className="pb-12">{data.body.toUpperCase()}</h3>
          <ul>
            {data.answer.map((item: any) => {
              return (
                <li key={item.id} className="mb-4">
                  <input
                    type="radio"
                    id={`question${item.id}`}
                    name="question"
                    value={`${item.body.toUpperCase()}`}
                  />
                  <label htmlFor={`question${item.id}`}>
                    {item.body.toUpperCase()}
                  </label>
                </li>
              );
            })}
          </ul>
          <h3 className="mt-8">Questão 1 de 10</h3>
          <p className="btn-primary mt-2 text-center">Próximo</p>
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return;
    // return <span>Loading...</span>;
  }

  if (status === "error") {
    return;
    // return <span>deu ruim</span>;
  }

  console.log(data);

  return <div>{question(data)}</div>;
};

export default Page;

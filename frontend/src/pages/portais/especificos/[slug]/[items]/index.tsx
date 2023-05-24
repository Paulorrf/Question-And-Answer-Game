import React from "react";
import { useRouter } from "next/router";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { getQuestions } from "@/api/getQuestions";

function question(item: any) {
  return (
    <div key={item.id}>
      <Link href={`/answer/${item.id}`}>
        <div className="mt-2 px-2 leading-6">
          <div className="flex justify-between">
            <div>
              <h2>Questão {item.id}</h2>
            </div>
            <div>
              <h2 className="text-green-600">{item.difficulty}</h2>
            </div>
          </div>
          <p>{item.body}</p>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold">Quantidade de perguntas: 10</h2>
            </div>
            <div className="flex items-center">
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <p className="ml-2">5.0</p>
            </div>
          </div>
        </div>
      </Link>
      <hr />
    </div>
  );
}

const Page = () => {
  const router = useRouter();

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data, status } = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
  });

  if (status === "loading") {
    return;
    // return <span>Loading...</span>;
  }

  if (status === "error") {
    return;
    // return <span>deu ruim</span>;
  }

  return (
    <div className="mt-8 overflow-hidden text-white">
      <div className="fixed left-0 top-0 z-10 h-screen w-screen bg-slate-800"></div>
      <div className="relative z-20 mx-auto mt-16 max-h-screen w-3/4 overflow-y-auto px-8 child:mb-2">
        {data.map((item: any) => {
          return question(item);
        })}

        {/* <div className="mt-2 leading-6">
          <div className="flex justify-between">
            <div>
              <h2>Questão 2</h2>
            </div>
            <div>
              <h2 className="text-cyan-500">Normal</h2>
            </div>
          </div>
          <p>descrição geral sobre as perguntas</p>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold">Quantidade de perguntas: 12</h2>
            </div>
            <div className="flex items-center">
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStar />
              <p className="ml-2">4.0</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-2 leading-6">
          <div className="flex justify-between">
            <div>
              <h2>Questão 3</h2>
            </div>
            <div>
              <h2 className="text-amber-500">Díficil</h2>
            </div>
          </div>
          <p>descrição geral sobre as perguntas</p>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold">Quantidade de perguntas: 16</h2>
            </div>
            <div className="flex items-center">
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarHalf />
              <BsStar />
              <p className="ml-2">3.5</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-2 leading-6">
          <div className="flex justify-between">
            <div>
              <h2>Questão 4</h2>
            </div>
            <div>
              <h2 className="text-red-700">Muito Díficil</h2>
            </div>
          </div>
          <p>descrição geral sobre as perguntas</p>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold">Quantidade de perguntas: 20</h2>
            </div>
            <div className="flex items-center">
              <BsStarFill />
              <BsStarFill />
              <BsStar />
              <BsStar />
              <BsStar />
              <p className="ml-2">2.0</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Page;

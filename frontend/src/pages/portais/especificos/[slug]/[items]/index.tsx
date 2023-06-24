import React, { useEffect, useState } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import axios from "axios";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { decode } from "jsonwebtoken";

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
  console.log("query2222");
  console.log(query);
  const res = await axios({
    method: "post",
    url: `http://localhost:5000/questions/findTen`,
    data: {
      tags: query.items,
    },
  });

  console.log(res.data);
  const repo = await res.data;
  return { props: { repo } };
};

function question(item: any, path: any, data: any) {
  const condition = data.includes(
    item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)
  )
    ? true
    : false;

  return (
    <div key={item.id}>
      {condition ? (
        <Link
          href={`${path}/${item.id}`}
          className="cursor-pointer opacity-100"
          title=""
        >
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
      ) : (
        <div
          className="cursor-not-allowed opacity-50"
          title="Você não tem status suficientes para responder essa pergunta"
        >
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
        </div>
      )}
      <hr />
    </div>
  );
}

const Page = ({ repo }: any) => {
  // const [userStatus, setUserStatus] = useState();
  const [data, setData] = useState();

  console.log(repo);
  const router = useRouter();

  const path = router.asPath;

  console.log(router.query.slug);

  let userStatus: any;

  if (typeof window !== "undefined") {
    //@ts-ignore
    userStatus = decode(localStorage?.getItem("user")).status;
    // setUserStatus(status);
  }

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios({
          method: "post",
          url: `http://localhost:5000/portal/requirements`,
          data: {
            userStatus,
            portal_name: router.query.slug,

            // chosenAnswers,
            //@ts-ignore
            // userId: Number(decode(localStorage?.getItem("user")).sub),
          },
          cancelToken: cancelTokenSource.token,
        });

        // setData(response.data);
        setData(response.data);

        // const response = await axios.post(
        //   "http://localhost:5000/questions/rightAnswers",
        //   {
        //     chosenAnswers,
        //     //@ts-ignore
        //     userId: Number(decode(localStorage?.getItem("user")).sub),
        //     cancelToken: cancelTokenSource.token,
        //   }
        // );

        // console.log("response");
        // console.log(response.data);
        // console.log("response");

        // setShowResult(true);

        // const resp = response.data.map((item: any) => item.id);
        // const ans = chosenAnswers.map((item: any) => item.answerId);

        // setAnswers(ans);

        // setCorrectAnswers(resp);

        // Process the response
      } catch (error) {
        if (axios.isCancel(error)) {
          //   console.log("Request canceled:", error.message);
        } else {
          // Handle other errors
        }
      }
    };

    fetchData();

    return () => {
      // Cancel the request when the component unmounts
      cancelTokenSource.cancel("Request canceled due to component unmount.");
    };
  }, []);

  // Access the client
  // const queryClient = useQueryClient();

  // // Queries
  // const { data, status } = useQuery({
  //   queryKey: ["questions"],
  //   queryFn: getQuestions,
  // });

  // if (status === "loading") {
  //   return;
  //   // return <span>Loading...</span>;
  // }

  // if (status === "error") {
  //   return;
  //   // return <span>deu ruim</span>;
  // }

  // console.log(data);

  return (
    <div className="mt-8 overflow-hidden text-white">
      <div className="fixed left-0 top-0 z-10 h-screen w-screen bg-slate-800"></div>
      <div className="relative z-20 mx-auto mt-16 max-h-screen w-3/4 overflow-y-auto px-8 child:mb-2">
        {data &&
          repo.map((item: any) => {
            return question(item, path, data);
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

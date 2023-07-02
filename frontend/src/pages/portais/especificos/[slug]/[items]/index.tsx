import React, { useEffect, useState } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import axios from "axios";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { decode } from "jsonwebtoken";
import Layout from "@/components/Layout";
import ModalStatus from "../../../../../components/ModalStatus";

type Repo = {
  id: number;
  answered_number: number;
  title: string;
  description: string;
  rating: number;
  difficulty: string;
  situation: string;
};

const difficultyMap: Record<string, string> = {
  easy: "Fácil",
  normal: "Normal",
  hard: "Difícil",
  very_hard: "Muito Difícil",
};

export const getServerSideProps: GetServerSideProps<{
  repo: Repo[];
}> = async ({ query }) => {
  // console.log("query2222");
  // console.log(query);
  const res = await axios({
    method: "post",
    url: `https://question-and-answer-game-production.up.railway.app/questions/findTen`,
    data: {
      tags: query.items,
    },
  });

  console.log(res.data);
  const repo = await res.data;
  return { props: { repo } };
};

const RatingDisplay = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating); // Get the integer part of the rating
  const decimalPart = rating % 1; // Get the decimal part of the rating

  const renderStars = () => {
    const stars = [];

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={`star-${i}`} />);
    }

    // Render half star if applicable
    if (decimalPart >= 0.25 && decimalPart <= 0.75) {
      stars.push(<BsStarHalf key="half-star" />);
    }

    // Render empty stars
    const emptyStars = 5 - fullStars; // Calculate the number of empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<BsStar key={`empty-star-${i}`} />);
    }

    return stars;
  };

  return <div className="flex gap-2">{renderStars()}</div>;
};

function question(item: any, path: any, data: any) {
  console.log(item);
  const difficulty = difficultyMap[item.difficulty];
  const condition =
    Array.isArray(data) &&
    data.includes(
      item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)
    )
      ? true
      : false;

  console.log(item);
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
                <h2>{item.title}</h2>
              </div>
              <div>
                <h2>Questão {item.id}</h2>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <h2 className="text-green-600">{item.description}</h2>
              </div>
              <div>
                <h2 className="text-green-600">{difficulty}</h2>
              </div>
            </div>
            <p>{item.body}</p>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold">
                  Quantidade de perguntas: {item.question_number}
                </h2>
              </div>
              <div className="flex items-center">
                {/* <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill /> */}
                <RatingDisplay rating={item.rating} />
                <p className="ml-2">{item.rating}</p>
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
                <h2>{item.title}</h2>
              </div>
              <div>
                <h2>Questão {item.id}</h2>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <h2 className="text-green-600">{item.description}</h2>
              </div>
              <div>
                <h2 className="text-green-600">{difficulty}</h2>
              </div>
            </div>
            <p>{item.body}</p>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold">
                  Quantidade de perguntas: {item.question_number}
                </h2>
              </div>
              <div className="flex items-center">
                {/* <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <p className="ml-2">{item.rating}</p> */}
                <RatingDisplay rating={item.rating} />
                <p className="ml-2">{item.rating}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <hr className="mb-4" />
    </div>
  );
}

const Page = ({ repo }: any) => {
  // const [userStatus, setUserStatus] = useState();
  const [data, setData] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<any>();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  console.log(repo);
  const router = useRouter();

  const path = router.asPath;

  console.log(router.query.slug);

  let userStatus: any;
  let userId: any;

  if (typeof window !== "undefined") {
    //@ts-ignore
    userStatus = decode(localStorage?.getItem("user")).status;
    //@ts-ignore
    userId = decode(localStorage?.getItem("user")).sub;
    // setUserStatus(status);
  }

  // useEffect(() => {
  //   const cancelTokenSource = axios.CancelToken.source();

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios({
  //         method: "post",
  //         url: `http://localhost:5000/portal/requirements`,
  //         data: {
  //           userStatus,
  //           portal_name: router.query.slug,
  //         },
  //         cancelToken: cancelTokenSource.token,
  //       });

  //       setData(response.data);

  //       // Process the response
  //     } catch (error) {
  //       if (axios.isCancel(error)) {
  //         //   console.log("Request canceled:", error.message);
  //       } else {
  //         // Handle other errors
  //       }
  //     }
  //   };

  //   fetchData();

  //   return () => {
  //     // Cancel the request when the component unmounts
  //     cancelTokenSource.cancel("Request canceled due to component unmount.");
  //   };
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios({
            method: "post",
            url: `http://localhost:5000/portal/requirements`,
            data: {
              userStatus,
              portal_name: router.query.slug,
            },
            cancelToken: cancelTokenSource.token,
          }),
          // Make the second API call here
          // Example:
          axios({
            method: "get",
            url: `http://localhost:5000/auth/${userId}`,
          }),
        ]);

        const data1 = response1.data; // Data from the first API call
        const data2 = response2.data; // Data from the second API call

        setData(data1);
        setNewStatus(data2.character.status);
        // Process the data as needed

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
    // eslint-disable-next-line
  }, []);

  console.log(newStatus);
  // console.log(router.query.slug);

  return (
    <Layout>
      <div className="mt-8 overflow-hidden text-white">
        <div className="fixed left-0 top-0 z-10 h-screen w-screen bg-slate-800"></div>
        <div className="relative z-20 mx-auto mt-16 max-h-screen w-3/4 overflow-y-auto px-8 child:mb-2">
          <button className="btn-primary" onClick={() => setIsOpen(true)}>
            Status Necessários Por Dificuldade
          </button>
          <ModalStatus
            isOpen={isOpen}
            onClose={handleCloseModal}
            portalStatusArray={data?.portalStatus}
            availables={data?.availables}
            userStatus={newStatus}
          />
          {data &&
            repo.map((item: any) => {
              return question(item, path, data);
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Page;

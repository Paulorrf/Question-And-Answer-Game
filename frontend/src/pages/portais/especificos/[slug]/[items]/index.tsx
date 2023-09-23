import React, { useEffect, useState } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import axios, { cancelTokenSource, isCancel } from "@/axios";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { decode } from "jsonwebtoken";
import Layout from "@/components/Layout";
import { useDisclosure } from "@mantine/hooks";
import { Button, Group, Modal, Rating } from "@mantine/core";
import ModalData from "@/components/ModalData";

type Repo = {
  id: number;
  answered_number: number;
  title: string;
  description: string;
  rating: number;
  difficulty: string;
  situation: string;
};

type Item = {
  answered_number: number;
  description: string;
  difficulty: string;
  id: number;
  question: [
    {
      user_data: {
        display_name: string;
        id: number;
      };
    }
  ];
  question_number: number;
  rating: number;
  situation: string;
  title: string;
};

type Data = {
  availables: string[];
  portalStatus: {
    agility_required: number;
    difficulty: string;
    id: number;
    intelligence_required: number;
    luck_required: number;
    portal_name: string;
    strength_required: number;
  }[];
};

const difficultyMap: Record<string, string> = {
  easy: "Fácil",
  normal: "Normal",
  hard: "Difícil",
  very_hard: "Muito Difícil",
};

const difficultyColorMap: Record<string, string> = {
  easy: "text-green-600",
  normal: "text-sky-400",
  hard: "text-amber-600",
  very_hard: "text-red-600",
};

export const getServerSideProps: GetServerSideProps<{
  repo: Repo[];
}> = async ({ query }) => {
  const res = await axios({
    method: "post",
    url: `questions/findTen`,
    data: {
      tags: query.items,
    },
  });

  const repo = await res.data;
  return { props: { repo } };
};

const RatingDisplay = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating); // Get the integer part of the rating
  const decimalPart = rating % 1; // Get the decimal part of the rating

  const renderStars = () => {
    const stars = [];

    // Render full stars
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<BsStarFill key={`star-${i}`} />);
    }

    // Render half star if applicable
    if (rating % 1 >= 0.25 && rating % 1 <= 0.75) {
      stars.push(<BsStarHalf key="half-star" />);
    }

    // Render empty stars
    const emptyStars = Math.max(5 - Math.ceil(rating), 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<BsStar key={`empty-star-${i}`} />);
    }

    return stars;
  };

  return <div className="flex gap-2">{renderStars()}</div>;
};

function convertNumber(number: number) {
  var roundedNumber = Math.floor(number); // Round down the number to the nearest integer
  var decimalPart = number - roundedNumber; // Extract the decimal part of the number

  if (decimalPart >= 0.3 && decimalPart <= 0.5) {
    decimalPart = 0.5;
  } else if (decimalPart >= 0.6 && decimalPart <= 0.9) {
    decimalPart = 1;
  } else {
    decimalPart = 0;
  }

  return roundedNumber + decimalPart;
}

function question(item: Item, path: any, data: any) {
  console.log(item);
  const difficulty = difficultyMap[item.difficulty];
  const difficultyColor = difficultyColorMap[item.difficulty]; // Get the color class based on the difficulty level
  const condition =
    Array.isArray(data.availables) &&
    //@ts-ignore
    data.availables.some(
      (d: string) =>
        d.toLowerCase().replace(/ /g, "_") === item.difficulty.toLowerCase()
    );

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
                <h2 className={difficultyColor}>{item.description}</h2>
              </div>
              <div>
                <h2 className={difficultyColor}>{difficulty}</h2>
              </div>
            </div>
            {/* <p>{item.body}</p> */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold">
                  Quantidade de perguntas: {item.question_number}
                </h2>
              </div>
              {/* <div className="flex items-center">
                <RatingDisplay rating={item.rating} />
                <p className="ml-2">{item.rating}</p>
              </div> */}
              <div className="flex items-center">
                <Rating
                  fractions={2}
                  defaultValue={convertNumber(item.rating)}
                  readOnly
                />
                <p className="ml-2">{convertNumber(item.rating)}</p>
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
                <h2 className={difficultyColor}>{item.description}</h2>
              </div>
              <div>
                <h2 className={difficultyColor}>{difficulty}</h2>
              </div>
            </div>
            {/* <p>{item.body}</p> */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold">
                  Quantidade de perguntas: {item.question_number}
                </h2>
              </div>
              <div className="flex items-center">
                <RatingDisplay rating={item.rating} />
                <p className="ml-2">{item.rating}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <p className="mb-2 mt-2 px-2 font-bold">
        Criado por:
        <Link href={`/user/${item.question[0].user_data.id}`}>
          <span className="ml-2 text-sky-500">
            {item.question[0].user_data.display_name.toUpperCase()}
          </span>
        </Link>
      </p>
      <hr className="mb-4" />
    </div>
  );
}

const Page = ({ repo }: any) => {
  const [data, setData] = useState<Data | undefined>(undefined);
  const [newStatus, setNewStatus] = useState<any>();
  const [opened, { open, close }] = useDisclosure(false);

  const router = useRouter();

  const path = router.asPath;

  // let userStatus: any;
  let userId: any;

  if (typeof window !== "undefined") {
    // userStatus = decode(localStorage?.getItem("user")).status;
    const userFromLocalStorage = localStorage?.getItem("user") ?? ""; // Use an empty string as a default value if localStorage.getItem("user") is null
    const decodedUser = decode(userFromLocalStorage)?.sub;

    console.log(decodedUser);

    if (decodedUser === "" || decodedUser === undefined) {
      // setIsLogged(false);
      router.push("/register");
    } else {
      userId = decodedUser;
    }
  }

  useEffect(() => {
    // const cancelTokenSource = axios.CancelToken.source();
    const cancelTokenSource2 = cancelTokenSource.source();

    const fetchData = async () => {
      try {
        const response2 = await axios({
          method: "get",
          url: `auth/${userId}`,
        });

        const data2 = response2.data;

        setNewStatus(data2.character.status);

        const response1 = await axios({
          method: "post",
          url: `portal/requirements`,
          data: {
            userStatus: data2.character.status,
            portal_name: router.query.slug,
          },
          cancelToken: cancelTokenSource2.token,
        });

        const data1 = response1.data;

        setData(data1);
      } catch (error) {
        if (isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          // Handle other errors
        }
      }
    };

    fetchData();

    return () => {
      // Cancel the request when the component unmounts
      cancelTokenSource2.cancel("Request canceled due to component unmount.");
    };
  }, []);

  return (
    <Layout>
      <div className="mt-8 overflow-hidden text-white">
        <div className="fixed left-0 top-0 z-10 h-screen w-screen"></div>
        <div className="relative z-20 mx-auto mt-16 max-h-screen w-3/4 overflow-y-auto px-8 child:mb-2">
          <Modal
            opened={opened}
            onClose={close}
            title="Status Necessários Por Dificuldade"
            centered
            size="auto"
          >
            <ModalData
              portalStatusArray={data?.portalStatus}
              availables={data?.availables}
              userStatus={newStatus}
            />
          </Modal>
          <Group className="mb-2">
            <Button className="btn-primary" onClick={open}>
              Status Necessários Por Dificuldade
            </Button>
          </Group>
          {data &&
            repo.map((item: Item) => {
              return question(item, path, data);
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Page;

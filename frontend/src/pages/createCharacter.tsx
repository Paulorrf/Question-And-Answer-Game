import React, { useEffect, useState } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import axios from "@/axios";
import { Carousel } from "@mantine/carousel";

import Elfo from "../assets/elfo.png";
import Orc from "../assets/orc.png";
import Humano from "../assets/humano.png";
import Image, { StaticImageData } from "next/image";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { AiOutlineArrowRight, AiOutlineClose } from "react-icons/ai";
import { CgDanger } from "react-icons/cg";

import { Button, Loader, Notification } from "@mantine/core";
import { useSessionId } from "@/customHooks/useSessionId";
import { createCharacterFn } from "@/api/createCharacter";
import { useRouter } from "next/router";

type Classe = {
  id: number;
  nome: string;
  status_id: number;
  status: {
    id: number;
    strength: number;
    intelligence: number;
    agility: number;
    luck: number;
  };
};

type Item = {
  id: number;
  name: string;
  imagem: StaticImageData | null;
  status: {
    agility: number;
    luck: number;
    strength: number;
    intelligence: number;
  };
};

type Data = { data: Classe[] };

export const getStaticProps = (async (context) => {
  const classes: Data = await axios("/races/get-all");

  return { props: { classes: classes.data } };
}) satisfies GetStaticProps<{
  classes: Classe[];
}>;

export default function CreateCharacter({
  classes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [loading, setLoading] = useState(false);
  const sessionId = useSessionId();
  const router = useRouter();

  async function createCharacter(classeId: number) {
    setLoading(true);
    if (sessionId !== null) {
      let characterCreated = await createCharacterFn({ sessionId, classeId });
      if (characterCreated) router.push("/");
    }
  }

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (sessionId === null) {
      router.push("/login");
    }
    setMounted(true);
    return () => setMounted(false);
  }, [sessionId, router]);

  const images = [
    {
      nome: "elfo",
      imagem: Elfo,
    },
    {
      nome: "orc",
      imagem: Orc,
    },
    {
      nome: "humano",
      imagem: Humano,
    },
  ];

  function carouselItems(item: Item) {
    return (
      <Carousel.Slide className="flex flex-row gap-3">
        <div>
          <Image src={item.imagem ?? ""} alt={item.name} width={300} />
        </div>
        <div className="flex flex-col justify-between leading-7">
          <div>
            <h3 className="text-center font-bold text-cyan-700">
              {item.name.toUpperCase()}
            </h3>
            <h3 className="text-center font-bold">STATUS</h3>
            <ul>
              <li>Agility: {item.status.agility}</li>
              <li>Luck: {item.status.luck}</li>
              <li>Strength: {item.status.strength}</li>
              <li>Intelligence: {item.status.intelligence}</li>
            </ul>
          </div>
          <Button
            variant="light"
            color="green"
            size="lg"
            loading={loading}
            rightIcon={<AiOutlineArrowRight />}
            onClick={() => createCharacter(item.id)}
          >
            CREATE
          </Button>
        </div>
      </Carousel.Slide>
    );
  }

  const listItems = classes.map((item) => {
    const matchingImage = images.find((image) => image.nome === item.nome);

    return {
      id: item.id,
      name: item.nome,
      imagem: matchingImage ? matchingImage.imagem : null,
      status: {
        agility: item.status.agility,
        luck: item.status.luck,
        strength: item.status.strength,
        intelligence: item.status.intelligence,
      },
    };
  });

  return mounted && sessionId === null ? (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex flex-grow items-center justify-center">
        <Loader color="blue" />
      </div>
      <div className="absolute bottom-0 left-0 w-96 bg-red-400">
        <Notification
          icon={<AiOutlineClose size={24} />}
          color="red"
          title="ERROR!"
          withCloseButton={false}
        >
          You must be logged to create a character
        </Notification>
      </div>
    </div>
  ) : (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[500px] rounded-lg bg-gray-200 p-4">
        <Carousel
          height={300}
          loop
          draggable={false}
          align="center"
          nextControlIcon={<BsFillArrowRightCircleFill size={30} />}
          previousControlIcon={<BsFillArrowLeftCircleFill size={30} />}
        >
          {listItems.map((item: Item) => {
            return carouselItems(item);
          })}
        </Carousel>
      </div>
    </div>
  );
}

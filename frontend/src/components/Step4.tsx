// Step2.tsx

import React, { useState } from "react";

import Elf from "../assets/elf_game.png";
import Orc from "../assets/orc_game.png";
import Human from "../assets/human_game.png";
import Image from "next/image";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { createUserFn } from "@/api/register";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const races = [
  {
    name: "orc",
    img: Orc,
    status: {
      strength: 4,
      intelligence: 1,
      agility: 3,
      luck: 1,
    },
  },
  {
    name: "elfo",
    img: Elf,
    status: {
      strength: 2,
      intelligence: 5,
      agility: 2,
      luck: 1,
    },
  },
  {
    name: "humano",
    img: Human,
    status: {
      strength: 3,
      intelligence: 3,
      agility: 3,
      luck: 3,
    },
  },
];

const Step4 = ({
  formData,
  onChange,
  onPrev,
  onSubmit,
}: {
  formData: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onPrev: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  // Slideshow logic and image state goes here
  const [currentImage, setCurrentImage] = React.useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const router = useRouter();

  const images = [Elf, Orc, Human];

  const handlePrevImage = () => {
    setCurrentImage(
      (prevImage) => (prevImage - 1 + images.length) % images.length
    );
  };

  const handleNextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const changeFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const navigateLeft = () => {
    const newIndex = (focusedIndex - 1 + races.length) % races.length;
    setFocusedIndex(newIndex);
  };

  const navigateRight = () => {
    const newIndex = (focusedIndex + 1) % races.length;
    setFocusedIndex(newIndex);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUserFn,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["register"] });
      router.push("/login");
    },
  });

  function handleCreateAccount() {
    // let race = "";
    // if (focusedIndex === 0) {
    //   race = "orc";
    // } else if (focusedIndex === 1) {
    //   race = "elfo";
    // } else {
    //   race = "humano";
    // }
    //
    // console.log(race);
    //descomentar se quiser salvar no banco
    mutation.mutate({
      data: formData,
      character: {
        race: races[focusedIndex].name,
        status: races[focusedIndex].status,
      },
    });
  }

  console.log(formData);

  return (
    <div className="">
      <div className="">
        <div>
          <h3 className="text-center font-bold">ESCOLHA A SUA RAÇA</h3>
          {races.map((race, index) => (
            <div key={index} className={index === focusedIndex ? "" : "hidden"}>
              <div className="flex items-center">
                <div className="relative">
                  <p className="mb-2 mt-8 text-center font-bold">
                    {race.name.toUpperCase()}
                  </p>
                  <Image
                    src={race.img}
                    alt={`Image ${index + 1}`}
                    className="h-full w-48 cursor-pointer object-cover"
                    onClick={() => changeFocus(index)}
                  />
                  {index === focusedIndex && (
                    <>
                      <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full border border-black bg-gray-200 p-2 text-gray-700 hover:bg-gray-300 hover:text-gray-800 focus:outline-none"
                        onClick={navigateLeft}
                      >
                        <AiOutlineArrowLeft />
                      </button>
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full border border-black bg-gray-200 p-2 text-gray-700 hover:bg-gray-300 hover:text-gray-800 focus:outline-none"
                        onClick={navigateRight}
                      >
                        <AiOutlineArrowRight />
                      </button>
                    </>
                  )}
                </div>

                <div className="ml-4 mt-8 w-1/3 ">
                  <ul className="child:mb-4 child:flex">
                    <li>
                      <span className="mr-2 font-bold">Força:</span>{" "}
                      {race.status.strength}
                    </li>
                    <li>
                      <span className="mr-2 font-bold">Inteligência:</span>{" "}
                      {race.status.intelligence}
                    </li>
                    <li>
                      <span className="mr-2 font-bold">Agilidade:</span>{" "}
                      {race.status.agility}
                    </li>
                    <li>
                      <span className="mr-2 font-bold">Sorte:</span>{" "}
                      {race.status.luck}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="justify-centern mt-4 flex">
        <button
          className="btn-primary mx-auto mt-8 text-center text-white"
          onClick={handleCreateAccount}
        >
          Criar conta
        </button>
      </div>
    </div>
  );
};

export default Step4;

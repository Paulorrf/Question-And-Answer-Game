import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Elf from "../assets/elf.jpg";
import Orc from "../assets/orc.png";
import Human from "../assets/human.jpg";
import signInStore from "@/store/signInStore";
import { createUserFn } from "@/api/register";
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
const Slideshow = () => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const router = useRouter();

  const dataStore = signInStore((state) => state.data);

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

    // console.log(race);
    mutation.mutate({
      data: dataStore,
      character: {
        race: races[focusedIndex].name,
        status: races[focusedIndex].status,
      },
    });
  }

  console.log(dataStore);

  return (
    <div className="relative">
      <h3 className="mb-4 mt-8">Escolha sua raça</h3>
      <div className="flex h-64 w-full items-center justify-center">
        {races.map((race, index) => (
          <div key={index} className={index === focusedIndex ? "" : "hidden"}>
            <p className="mt-8 text-center font-bold">
              {race.name.toUpperCase()}
            </p>
            <div className="flex items-center">
              <div className="relative">
                <Image
                  src={race.img}
                  alt={`Image ${index + 1}`}
                  className="h-full w-48 cursor-pointer object-cover"
                  onClick={() => changeFocus(index)}
                />
                {index === focusedIndex && (
                  <>
                    <button
                      className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-gray-300 hover:text-gray-800 focus:outline-none"
                      onClick={navigateLeft}
                    >
                      &lt;
                    </button>
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-gray-300 hover:text-gray-800 focus:outline-none"
                      onClick={navigateRight}
                    >
                      &gt;
                    </button>
                  </>
                )}
              </div>
              <div className="ml-4 w-1/3 ">
                <ul className="child:mb-4">
                  <li>Força: {race.status.strength}</li>
                  <li>Inteligência: {race.status.intelligence}</li>
                  <li>Agilidade: {race.status.agility}</li>
                  <li>Sorte: {race.status.luck}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="btn-primary mx-auto mt-8 text-center text-white"
        onClick={handleCreateAccount}
      >
        Criar conta
      </button>
    </div>
  );
};

export default Slideshow;

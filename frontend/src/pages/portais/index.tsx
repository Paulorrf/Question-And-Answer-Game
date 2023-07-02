import Link from "next/link";
import React, { useState } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Layout from "@/components/Layout";
import Portal from "../../assets/portal3.png";
import Image from "next/image";

export const getStaticProps: GetStaticProps<{
  portais: Array<{ id: number; name: string }>;
}> = async () => {
  const res = await fetch(
    "https://question-and-answer-game-production.up.railway.app/portal/generic"
  );
  const portais = await res.json();
  return { props: { portais } };
};

const Portais = ({
  portais,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 5; // Number of slides to show at a time

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % portais.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? portais.length - 1 : prevSlide - 1
    );
  };

  const translateX = `calc(-100% / ${slidesToShow} * ${currentSlide})`;

  return (
    <Layout>
      <div className="relative">
        <div className="absolute left-2/4 top-1/4 -translate-x-2/4 -translate-y-1/4 text-center text-white">
          <div className="overflow-hidden">
            <ul
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(${translateX})` }}
            >
              {portais.map((portal) => (
                <li key={portal.id} className="w-56">
                  <p>{portal.name}</p>
                  <Link href={`/portais/especificos/${portal.name}`}>
                    <Image src={Portal} alt="portal" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
          {currentSlide !== 0 && (
            <button
              className="rounded-full bg-gray-500 p-2 text-white"
              onClick={handlePrevSlide}
            >
              Prev
            </button>
          )}
          {currentSlide !== portais.length - slidesToShow && (
            <button
              className="rounded-full bg-gray-500 p-2 text-white"
              onClick={handleNextSlide}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Portais;

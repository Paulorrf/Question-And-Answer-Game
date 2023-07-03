import Link from "next/link";
import React, { useState } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Layout from "@/components/Layout";
import Portal from "../../assets/portal3.png";
import Image from "next/image";
import Slider from "react-slick";

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
  console.log(portais);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <Layout>
      <div className="mx-auto mt-36 w-[1200px] text-white">
        <Slider {...settings}>
          {portais.map((portal, index) => (
            <div key={index} className="text-center">
              <h3>{portal.name.toUpperCase()}</h3>

              <Link href={`/portais/especificos/${portal.name}`}>
                <Image
                  src={Portal}
                  className="h-[250px] w-[220px] object-cover"
                  alt={`Image ${index + 1}`}
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </Layout>
  );

  // return (
  //   <Layout>
  //     <div className="relative">
  //       <div className="absolute left-2/4 top-1/4 -translate-x-2/4 -translate-y-1/4 text-center text-white">
  //         <div className="overflow-hidden">
  //           <ul
  //             className="flex transition-transform duration-300 ease-in-out"
  //             style={{ transform: `translateX(${translateX})` }}
  //           >
  //             {portais.map((portal) => (
  //               <li key={portal.id} className="w-56">
  //                 <p>{portal.name}</p>
  //                 <Link href={`/portais/especificos/${portal.name}`}>
  //                   <Image src={Portal} alt="portal" />
  //                 </Link>
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //       </div>
  //       <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
  //         {currentSlide !== 0 && (
  //           <button
  //             className="rounded-full bg-gray-500 p-2 text-white"
  //             onClick={handlePrevSlide}
  //           >
  //             Prev
  //           </button>
  //         )}
  //         {currentSlide !== portais.length - slidesToShow && (
  //           <button
  //             className="rounded-full bg-gray-500 p-2 text-white"
  //             onClick={handleNextSlide}
  //           >
  //             Next
  //           </button>
  //         )}
  //       </div>
  //     </div>
  //   </Layout>
  // );
};

export default Portais;

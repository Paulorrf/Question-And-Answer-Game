import Link from "next/link";
import React, { useState } from "react";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import Layout from "@/components/Layout";
import Portal from "../../assets/portal3.png";
import Image from "next/image";
import Slider from "react-slick";
import { getCookie, hasCookie } from "cookies-next";

import axios from "@/axios";
import { checkAuthentication } from "@/utils/authUtil";
import { checkCharacter } from "@/utils/checkCharacter";

type PortaisProps = Array<{ id: number; name: string }>;

export const getServerSideProps = (async (context) => {
  const sessionCookie = context.req.cookies["userData"];

  //cookie not set
  if (sessionCookie === undefined) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const userIsLoggedIn = await checkAuthentication(sessionCookie);

  //if the user created an account, but didnt created a character
  if (userIsLoggedIn) {
    const characterExist = await checkCharacter(sessionCookie);

    if (!characterExist) {
      return {
        redirect: {
          destination: "/createCharacter",
          permanent: false,
        },
      };
    }
  }

  if (!userIsLoggedIn) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const res = await axios.get("/portal/generic");
    const portais = res.data;
    return { props: { portais } };
  } catch (error) {
    console.error("Error fetching portal data:", error);
    return { props: { portais: [] } };
  }
}) satisfies GetServerSideProps<{
  portais: PortaisProps;
}>;

const Portais = ({
  portais,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // console.log(portais);

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
          {portais.map((portal: any, index: number) => (
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
};

export default Portais;

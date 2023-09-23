import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

type UserData = {
  accessToken: string;
  refreshToken: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
};

const Success = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    // console.log("Cookies: ", cookies);
    setUserData(cookies.userData);
  }, [cookies]);

  console.log(userData);

  return <div>success</div>;
};

export default Success;

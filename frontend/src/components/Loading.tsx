import { useRouter } from "next/router";
import React from "react";

const Loading = ({ isLogged }: { isLogged: boolean | null }) => {
  const router = useRouter();

  console.log(isLogged);

  if (isLogged === null) {
    return <p>loading</p>;
  } else if (isLogged === false && router.pathname !== "/login") {
    // router.push("/login");
  }
};

export default Loading;

import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { useAuthentication } from "@/customHooks/useAuthentication";
import { useRouter } from "next/router";
import Loading from "./Loading";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const userIsValid = useAuthentication();

  if (userIsValid === null) {
    // Handle the case where authentication status is still being determined
    return <p>loading</p>;
  }

  console.log("userIsValid: ", userIsValid);

  const unprotectedRoutes = ["/", "/login"];

  // Check if the current route is unprotected or if the user is logged in
  const isRouteAllowed =
    unprotectedRoutes.includes(router.pathname) || userIsValid;

  // If the route is not allowed, redirect to the login page
  if (!isRouteAllowed && router.pathname !== "/login") {
    console.log("entrouuuu");
    router.push("/login");
    return <Loading isLogged={userIsValid} />;
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;

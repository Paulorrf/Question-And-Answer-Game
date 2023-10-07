import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { GiSpikedDragonHead } from "react-icons/gi";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/router";
import { MdLogout } from "react-icons/md";
import { useAuthentication } from "@/customHooks/useAuthentication";
import { logoutUser } from "@/api/logout";
import { deleteCookie } from "cookies-next";

interface UserProp {
  email: string;
  exp: number;
  iat: number;
  name: string;
  status: {
    agility: number;
    luck: number;
    strength: number;
    intelligence: number;
  };
  sub: number;
}

const Navbar = () => {
  const userIsLogged = useAuthentication();

  const router = useRouter();

  const user = useRef<UserProp | undefined>(undefined);

  function logout() {
    const sessionCookie: string | undefined = document.cookie.replace(
      /(?:(?:^|.*;\s*)userData\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (sessionCookie && userIsLogged) {
      //delete session from redis
      logoutUser(sessionCookie);

      //delete cookie from browser
      deleteCookie("userData");

      //send to homepage
      // router.push("/");
      window.location.href = "/";
    }
  }

  return (
    <div className="relative z-30 bg-black/75">
      <ul className="mx-16 flex justify-between py-4 text-xl font-bold uppercase text-white">
        <li className="group flex items-center hover:underline">
          <div className="invisible z-40 mr-2 text-black group-hover:visible">
            <GiSpikedDragonHead color="white" size={20} />
          </div>
          <Link href="/">Início</Link>
        </li>

        {user.current && (
          <li className="group flex items-center  hover:underline">
            <div className="invisible z-40 mr-2 text-black group-hover:visible">
              <GiSpikedDragonHead color="white" size={20} />
            </div>
            <Link href="/createQuestion2">Criar Questionário</Link>
          </li>
        )}

        {!userIsLogged && (
          <>
            <li className="group flex items-center  hover:underline">
              <div className="invisible z-40 mr-2 text-black group-hover:visible">
                <GiSpikedDragonHead color="white" size={20} />
              </div>
              <Link href="/login">Login</Link>
            </li>
            {/* <li className="group flex items-center  hover:underline">
              <div className="invisible z-40 mr-2 text-black group-hover:visible">
                <GiSpikedDragonHead color="white" size={20} />
              </div>
              <Link href="/register">Criar conta</Link>
            </li> */}
          </>
        )}

        <li className="group flex items-center  hover:underline">
          <div className="invisible z-40 mr-2 text-black group-hover:visible">
            <GiSpikedDragonHead color="white" size={20} />
          </div>
          <Link href="/portais">Portais</Link>
        </li>

        {user.current && (
          <li className="flex items-center ">
            <Link href="/userPage">
              <div className="group mr-4 flex cursor-pointer items-center">
                <div className="invisible z-40 mr-2 text-black group-hover:visible">
                  <GiSpikedDragonHead color="white" size={20} />
                </div>
                <p className=" hover:underline">{user.current.name}</p>
              </div>
            </Link>
          </li>
        )}
        {userIsLogged && (
          <li className="flex items-center text-white hover:scale-125 ">
            <button onClick={logout}>
              <MdLogout size={20} />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;

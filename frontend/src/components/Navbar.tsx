import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { GiSpikedDragonHead } from "react-icons/gi";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/router";
import { MdLogout } from "react-icons/md";

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
  const [accessTk, setAccessTk] = useState<String | null | undefined>();
  const [isUserIdReady, setIsUserIdReady] = useState(false);
  const router = useRouter();

  const user = useRef<UserProp | undefined>(undefined);

  // console.log(localStorage?.getItem("user"));
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAccessTk(localStorage.getItem("user"));
    }
  }, []);

  useEffect(() => {
    if (accessTk !== undefined) {
      //@ts-ignore
      const decodedToken = decode(localStorage?.getItem("user"));
      if (decodedToken && decodedToken.sub) {
        //@ts-ignore
        user.current = decodedToken;
        setIsUserIdReady(true);
      }
    }
  }, [accessTk]);

  function handleLogout() {
    localStorage.clear();
    setAccessTk(undefined);
    user.current = undefined;
    router.push("/");
  }

  // console.log(user);

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

        {!user.current && (
          <>
            <li className="group flex items-center  hover:underline">
              <div className="invisible z-40 mr-2 text-black group-hover:visible">
                <GiSpikedDragonHead color="white" size={20} />
              </div>
              <Link href="/login">Login</Link>
            </li>
            <li className="group flex items-center  hover:underline">
              <div className="invisible z-40 mr-2 text-black group-hover:visible">
                <GiSpikedDragonHead color="white" size={20} />
              </div>
              <Link href="/register">Criar conta</Link>
            </li>
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

            <div className="flex items-center text-white hover:scale-125 ">
              <button onClick={handleLogout}>
                <MdLogout size={20} />
              </button>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;

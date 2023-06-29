import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { GiSpikedDragonHead } from "react-icons/gi";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/router";

const Navbar = () => {
  const [accessTk, setAccessTk] = useState<String | null | undefined>();
  const [isUserIdReady, setIsUserIdReady] = useState(false);
  const router = useRouter();

  const userId = useRef<number | undefined>(undefined);

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
        userId.current = decodedToken.sub;
        setIsUserIdReady(true);
      }
    }
  }, [accessTk]);

  function handleLogout() {
    localStorage.clear();
    setAccessTk(undefined);
    userId.current = undefined;
    router.push("/");
  }

  // console.log(userId.current);

  return (
    <div className="relative z-30 bg-slate-800">
      <ul className="mx-16 flex justify-between py-4 text-xl font-bold uppercase text-white">
        <li className="group flex items-center hover:text-red-600 hover:underline">
          <div className="invisible z-40 mr-2 text-black group-hover:visible">
            <GiSpikedDragonHead color="red" size={20} />
          </div>
          <Link href="/">Início</Link>
        </li>

        {userId.current && (
          <li className="group flex items-center hover:text-red-600 hover:underline">
            <div className="invisible z-40 mr-2 text-black group-hover:visible">
              <GiSpikedDragonHead color="red" size={20} />
            </div>
            <Link href="/createQuestion2">Criar Questionário</Link>
          </li>
        )}

        {!userId.current && (
          <>
            <li className="group flex items-center hover:text-red-600 hover:underline">
              <div className="invisible z-40 mr-2 text-black group-hover:visible">
                <GiSpikedDragonHead color="red" size={20} />
              </div>
              <Link href="/login">Login</Link>
            </li>
            <li className="group flex items-center hover:text-red-600 hover:underline">
              <div className="invisible z-40 mr-2 text-black group-hover:visible">
                <GiSpikedDragonHead color="red" size={20} />
              </div>
              <Link href="/register">Criar conta</Link>
            </li>
          </>
        )}

        <li className="group flex items-center hover:text-red-600 hover:underline">
          <div className="invisible z-40 mr-2 text-black group-hover:visible">
            <GiSpikedDragonHead color="red" size={20} />
          </div>
          <Link href="/portais">Portais</Link>
        </li>

        {userId.current && (
          <li className="group flex items-center hover:text-red-600 hover:underline">
            <div className="invisible z-40 mr-2 text-black group-hover:visible">
              <GiSpikedDragonHead color="red" size={20} />
            </div>
            <button onClick={handleLogout}>SAIR</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;

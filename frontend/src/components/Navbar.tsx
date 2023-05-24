import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { GiSpikedDragonHead } from "react-icons/gi";

const Navbar = () => {
  const path = usePathname();
  const [accessTk, setAcessTk] = useState<String | null | undefined>();

  // console.log(localStorage?.getItem("user"));

  useEffect(() => {
    // Perform localStorage action
    setAcessTk(localStorage.getItem("user"));
  }, []);

  console.log(accessTk);

  return (
    <div className="relative z-30">
      <ul className="flex justify-between px-16 pt-4 text-xl font-bold uppercase text-white">
        <li className="group flex items-center hover:text-red-600 hover:underline">
          <div className="invisible z-40 mr-2 text-black group-hover:visible">
            <GiSpikedDragonHead color="red" size={20} />
          </div>
          <Link href="/">Início</Link>
        </li>
        <li className="group flex items-center hover:text-red-600 hover:underline">
          <div className="invisible z-40 mr-2 text-black group-hover:visible">
            <GiSpikedDragonHead color="red" size={20} />
          </div>
          <Link href="/createQuestion2">Criar Questão</Link>
        </li>

        {accessTk === undefined && (
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
        {/* <li className="hover:underline hover:text-red-600 group flex items-center">
          <div className="invisible text-black z-40 mr-2 group-hover:visible">
            <GiSpikedDragonHead color="red" size={20} />
          </div>
          <Link href="/logout">logout</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Navbar;

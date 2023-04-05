import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  return (
    <div>
      <ul className="flex justify-between px-16 pt-2">
        <li className="hover:underline">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:underline">
          <Link href="/createQuestion">Create Question</Link>
        </li>
        <li className="hover:underline">
          <Link href="/login">Login</Link>
        </li>
        <li className="hover:underline">
          <Link href="/register">Criar conta</Link>
        </li>
        <li className="hover:underline">
          <Link href="/logout">logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

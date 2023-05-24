import Link from "next/link";
import React from "react";

const Portais = () => {
  return (
    <div className="absolute left-2/4 top-1/4 -translate-x-2/4 -translate-y-1/4 text-center text-white">
      <div className="flex child:mr-10">
        <div>
          <p>biologia</p>
          <Link href="/portais/especificos/biologia">
            <div className="h-40 w-40 rounded-full border bg-red-600"></div>
          </Link>
        </div>
        <div>
          <p>física</p>
          <Link href="/portais/especificos/fisica">
            <div className="h-40 w-40 rounded-full border bg-yellow-600"></div>
          </Link>
        </div>
        <div>
          <p>artes</p>
          <Link href="/portais/especificos/artes">
            <div className="h-40 w-40 rounded-full border bg-blue-600"></div>
          </Link>
        </div>
        <div>
          <p>quimica</p>
          <Link href="/portais/especificos/quimica">
            <div className="h-40 w-40 rounded-full border bg-green-600"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Portais;

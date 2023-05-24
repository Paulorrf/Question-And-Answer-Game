import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="absolute left-2/4 top-1/4 -translate-x-2/4 -translate-y-1/4 text-center text-white">
      <h2 className="mb-8 text-xl font-bold">PORTAIS ESPECÍFICOS</h2>
      <div className="flex child:mr-10">
        <div>
          <p>Zoologia</p>
          <Link href="/portais/especificos/biologia/questoes">
            <div className="h-40 w-40 rounded-full border bg-rose-600"></div>
          </Link>
        </div>
        <div>
          <p>Genética</p>
          <Link href="/portais/especificos/biologia/questoes">
            <div className="h-40 w-40 rounded-full border bg-teal-600"></div>
          </Link>
        </div>
        <div>
          <p>Anatomia</p>
          <Link href="/portais/especificos/biologia/questoes">
            <div className="h-40 w-40 rounded-full border bg-cyan-600"></div>
          </Link>
        </div>
        <div>
          <p>Bôtanica</p>
          <Link href="/portais/especificos/biologia/questoes">
            <div className="h-40 w-40 rounded-full border bg-violet-600"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;

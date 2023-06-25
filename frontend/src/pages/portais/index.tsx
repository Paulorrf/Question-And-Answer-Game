import Link from "next/link";
import React from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Layout from "@/components/Layout";

export const getStaticProps: GetStaticProps<{
  portais: Array<{ id: number; name: string }>;
}> = async () => {
  const res = await fetch("http://localhost:5000/portal/generic");
  const portais = await res.json();
  return { props: { portais } };
};

const Portais = ({
  portais,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(portais);

  return (
    <Layout>
      <div className="absolute left-2/4 top-1/4 -translate-x-2/4 -translate-y-1/4 text-center text-white">
        <div className="flex child:mr-10">
          {portais.map((portal) => {
            return (
              <div key={portal.id}>
                <p>{portal.name}</p>
                <Link href={`/portais/especificos/${portal.name}`}>
                  <div className="h-40 w-40 rounded-full border bg-red-600"></div>
                </Link>
              </div>
            );
          })}
          {/* <div>
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
        </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default Portais;

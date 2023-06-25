import Link from "next/link";
import React from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

type Repo = {
  name: string;
  id: number;
};

export const getServerSideProps: GetServerSideProps<{
  repo: Repo[];
}> = async ({ query }) => {
  console.log("query");
  console.log(query);
  const res = await fetch(
    `http://localhost:5000/portal/specific/${query.slug}`
  );
  const repo = await res.json();
  return { props: { repo } };
};

const Page = ({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(repo);
  const router = useRouter();
  console.log(router.query.slug);
  return (
    <Layout>
      <div className="absolute left-2/4 top-1/4 -translate-x-2/4 -translate-y-1/4 text-center text-white">
        <h2 className="mb-8 text-xl font-bold">PORTAIS ESPECÍFICOS</h2>
        <div className="flex child:mr-10">
          {repo.map((portal) => {
            return (
              <div key={portal.id}>
                <p>{portal.name}</p>
                <Link
                  href={`/portais/especificos/${router.query.slug}/${portal.name}`}
                >
                  <div className="h-40 w-40 rounded-full border bg-red-600"></div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Page;

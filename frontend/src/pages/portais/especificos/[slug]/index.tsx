import Link from "next/link";
import React from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Portal from "../../../../assets/portal3.png";
// import Portal from "../../../../assets/portal_img.png";
import Image from "next/image";
import Slider from "react-slick";
import axios from "@/axios";

type Repo = {
  name: string;
  id: number;
};

export const getServerSideProps: GetServerSideProps<{
  repo: Repo[];
}> = async ({ query }) => {
  console.log("query");
  console.log(query);

  const res = await axios.get(`portal/specific/${query.slug}`);
  return { props: { repo: res.data } };
};

const Page = ({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(repo);
  const router = useRouter();
  console.log(router.query.slug);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(repo.length, 5),
    slidesToScroll: 1,
  };
  return (
    <Layout>
      <div className="mx-auto mt-36 w-[800px] text-white">
        <Slider {...settings}>
          {repo.map((portal, index) => {
            return (
              <div key={index}>
                <h3 className="text-center">
                  {portal.name.toLocaleUpperCase()}
                </h3>
                <Link
                  href={`/portais/especificos/${router.query.slug}/${portal.name}`}
                >
                  <div className="mx-auto flex justify-center">
                    <Image
                      src={Portal}
                      alt="portal"
                      className="h-[250px] w-[220px] object-cover"
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </Layout>
  );
};

export default Page;

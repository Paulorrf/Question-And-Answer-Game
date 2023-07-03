import Link from "next/link";
import React from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Portal from "../../../../assets/portal3.png";
// import Portal from "../../../../assets/portal_img.png";
import Image from "next/image";
import Slider from "react-slick";

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
    `https://question-and-answer-game-production.up.railway.app/portal/specific/${query.slug}`
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
                  {/* <div className="h-40 w-40 rounded-full border bg-red-600"></div> */}
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
          {/* {repo.map((portal, index) => (
            <div key={index} className="text-center">
              <h3>{portal.name}</h3>

              <Link href={`/portais/especificos/${portal.name}`}>
                <Image
                  src={Portal}
                  className="h-[250px] w-[220px] object-cover"
                  alt={`Image ${index + 1}`}
                />
              </Link>
            </div>
          ))} */}
        </Slider>
      </div>
    </Layout>

    // <Layout>
    //   <div className="absolute left-2/4 top-1/4 -translate-x-2/4 -translate-y-1/4 text-center text-white">
    //     <h2 className="mb-8 text-xl font-bold">PORTAIS ESPECÍFICOS</h2>
    //     <div className="flex child:mr-10">
    //       {repo.map((portal) => {
    //         return (
    //           <div key={portal.id}>
    //             <p>{portal.name}</p>
    //             <Link
    //               href={`/portais/especificos/${router.query.slug}/${portal.name}`}
    //             >
    //               {/* <div className="h-40 w-40 rounded-full border bg-red-600"></div> */}
    //               <div className="relative">
    //                 <Image src={Portal} alt="portal" width={200} />
    //               </div>
    //             </Link>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </Layout>
  );
};

export default Page;

import axios from "@/axios";
import Layout from "@/components/Layout";
import { Accordion, Pagination } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Data = {
  description: string;
  question: [
    {
      answer: [
        {
          body: string;
          id: number;
          is_correct: boolean;
          question_id: number;
        }
      ];
      body: string;
      situation: string;
    }
  ];
};

const UserPage = () => {
  const [activePage, setPage] = useState(1);
  const [data, setData] = useState<Data[]>([]);
  const [numberOfPages, setNumberOfPages] = useState(1);

  //The amount of items in each page
  const pageSize = 5;
  const totalPages = Math.ceil(numberOfPages / pageSize);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (router.query.slug) {
          const response = await axios.get(
            `/questions/setnumber?userId=${router.query.slug}`
          );
          setNumberOfPages(response.data);
        }
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };

    fetchData();
  }, [router.query.slug]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (router.query.slug) {
          const response = await axios.get(
            `/questions/pagination?page=${activePage}&size=${5}&userId=${
              router.query.slug
            }`
          );
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };

    fetchData();
  }, [activePage, router.query.slug]);

  function listItem(data: Data, index: number) {
    return (
      <Accordion.Item
        key={index}
        className="bg-[#3498db]"
        value={`${data.description}${index}`}
      >
        <Accordion.Control>{data.description}</Accordion.Control>
        <Accordion.Panel>
          <Accordion
            variant="separated"
            styles={{
              control: {
                color: "black",
                backgroundColor: "#f0e0e0",
                ":hover": {
                  backgroundColor: "#dbc7c7c7",
                },
                "&[data-active]": {
                  color: "black",
                },
              },
            }}
          >
            {data.question.map((question, questionIndex) => (
              <Accordion.Item
                key={questionIndex}
                className="bg-[#f0e0e0]"
                value={`question${Math.random()}`}
              >
                <Accordion.Control>{question.body}</Accordion.Control>
                {question.answer.map((answer, answerIndex) => (
                  <Accordion.Panel
                    key={answerIndex}
                    className={
                      answer.is_correct ? "bg-green-500" : "bg-[#dddddd]"
                    }
                    styles={{
                      panel: {
                        marginTop: 0,
                      },
                    }}
                  >
                    {answer.body}
                  </Accordion.Panel>
                ))}
              </Accordion.Item>
            ))}
          </Accordion>
        </Accordion.Panel>
      </Accordion.Item>
    );
  }

  return (
    <Layout>
      <div className="flex min-h-screen flex-col py-12">
        <div className="flex flex-grow items-center justify-center">
          <div className="w-full max-w-screen-lg">
            <p className="mb-2 text-center font-bold text-white">
              {"Questionários Criados".toUpperCase()}
            </p>
            {data && (
              <div className="overflow-y-auto">
                <Accordion
                  variant="separated"
                  radius="lg"
                  styles={{
                    control: {
                      color: "white",
                      "&[data-active]": {
                        color: "black",
                      },
                    },
                  }}
                >
                  {data.map((item: Data, index: number) =>
                    listItem(item, index)
                  )}
                </Accordion>
                {totalPages > 1 && (
                  <Pagination
                    value={activePage}
                    onChange={setPage}
                    total={totalPages}
                    className="mt-4"
                    size="lg"
                    styles={{
                      control: {
                        color: "white",
                        ":hover": {
                          color: "black",
                        },
                      },
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;

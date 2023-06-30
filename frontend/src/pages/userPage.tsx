import React, { useRef, useEffect, useState } from "react";
import { decode } from "jsonwebtoken";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next/types";
import axios from "axios";
import CharacterStatus from "@/components/CharacterStatus";

interface User {
  sub: number;
  email: string;
  exp: number;
  iat: number;
  status: {
    agility: number;
    luck: number;
    strength: number;
    intelligence: number;
  };
}

type Repo = {
  name: string;
  id: number;
};

// export const getServerSideProps: GetServerSideProps<{
//   repo: Repo[];
// }> = async ({ query }) => {
//   console.log("query");
//   console.log(query);
//   const res = await fetch(`http://localhost:5000/auth/findOne`);
//   const repo = await res.json();
//   return { props: { repo } };
// };

const UserPage = () => {
  const userId = useRef<number | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("tab1");
  //   const userInfo = useRef<null | any>();
  const [userInfo, setUserInfo] = useState<any | null>(null);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  function getUserFromLocalStorage(): any | null {
    if (typeof window !== "undefined") {
      const token = localStorage?.getItem("user");

      if (token) {
        try {
          const decoded = decode(token) as any;
          return decoded;
        } catch (error) {
          // Handle any decoding errors here
          console.error("Error decoding JWT:", error);
        }
      }
    }

    return null;
  }

  const user = getUserFromLocalStorage();

  async function requestUser() {
    if (user.sub) {
      //   console.log(user);
      const userData = await axios({
        method: "get",
        //@ts-ignore
        url: `https://question-and-answer-game-production.up.railway.app/auth/${user.sub}`,
        // url: `https://question-and-answer-game-production.up.railway.app/auth/${user.sub}`,
      });

      //   userInfo.current = userData.data;
      setUserInfo(userData.data);
    }
  }

  useEffect(() => {
    try {
      requestUser();
    } catch (error) {
      console.log("erro ao dar fetch em user");
      console.log(error);
    }
  }, []);

  console.log(user);
  console.log(userInfo);

  // userInfo === null ||

  return userInfo === null ? (
    <div>loading</div>
  ) : (
    <Layout>
      <div className="mx-auto mt-16 w-[600px] p-4 text-white">
        <div className="mb-4 flex justify-center">
          <button
            className={`mr-4 rounded px-4 py-2 ${
              activeTab === "tab1"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handleTabClick("tab1")}
          >
            Tab 1
          </button>
          <button
            className={`rounded px-4 py-2 ${
              activeTab === "tab2"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handleTabClick("tab2")}
          >
            Personagem
          </button>
        </div>
        <div className="rounded-lg bg-slate-800 p-4">
          {activeTab === "tab1" && (
            <div>
              <h2 className="text-lg font-bold">Tab 1 Content</h2>
              <p>Display some information related to Tab 1 here.</p>
            </div>
          )}
          {activeTab === "tab2" && (
            <div>
              <CharacterStatus
                characterInfo={userInfo.character}
                statusPointRemaining={userInfo.status_point_remain}
                email={user.email}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;

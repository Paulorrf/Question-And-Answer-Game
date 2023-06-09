import React, { useRef, useEffect, useState } from "react";
import { decode } from "jsonwebtoken";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next/types";
import axios from "axios";
import CharacterStatus from "@/components/CharacterStatus";
import UserInfo from "@/components/UserInfo";

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

const UserPage = () => {
  const userId = useRef<number | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("tab2");
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
        // url: `https://question-and-answer-game-production.up.railway.app/auth/${user.sub}`,
        url: `https://question-and-answer-game-production.up.railway.app/auth/${user.sub}`,
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
          <div
            className={`rounded px-4 py-2 ${
              activeTab === "tab2"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handleTabClick("tab2")}
          >
            PERSONAGEM
          </div>
        </div>
        <div className="rounded-lg bg-slate-800 p-4">
          <div>
            <CharacterStatus
              characterInfo={userInfo.character}
              statusPointRemaining={userInfo.status_point_remain}
              email={user.email}
              nivel={userInfo.nivel}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;

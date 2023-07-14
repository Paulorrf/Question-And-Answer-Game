import React, { useRef, useEffect, useState } from "react";
import { decode } from "jsonwebtoken";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next/types";
// import axios from "axios";
import CharacterStatus from "@/components/CharacterStatus";
import UserInfo from "@/components/UserInfo";
import axios from "@/axios";
import CharacterStatus2 from "@/components/CharacterStatus2";

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

  // console.log(user);
  // console.log(userInfo);

  // userInfo === null ||

  return (
    <Layout>
      <div className="mx-auto mt-16 w-[600px] p-4 text-white">
        {activeTab === "tab1" ? (
          <div className="mb-4 flex justify-center">
            <div
              className={`rounded px-4 py-2 ${
                //@ts-ignore
                activeTab === "tab2"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => handleTabClick("tab2")}
            >
              PERSONAGEM
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-slate-800 p-4">
            <div>
              {/* <CharacterStatus
              characterInfo={userInfo.character}
              statusPointRemaining={userInfo.status_point_remain}
              email={user.email}
              nivel={userInfo.nivel}
            /> */}
              <CharacterStatus2 />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserPage;

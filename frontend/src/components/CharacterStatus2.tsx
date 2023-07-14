import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import axios from "@/axios";
import { decode } from "jsonwebtoken";

interface StatusProp {
  agility: number;
  strength: number;
  intelligence: number;
  luck: number;
}

interface CharacterInfoProps {
  classe_id: number;
  status_id: number;
  id: number;
  classes: { nome: string };
  status: StatusProp;
}

interface UserDataProps {
  character: CharacterInfoProps;
  email: string;
  experience: number;
  name: string;
  nivel: number;
  status_point_remain: number;
}

const CharacterStatus2 = () => {
  const [userInfo, setUserInfo] = useState<UserDataProps | null>(null);

  const [strength, setStrength] = useState(0);
  const [agility, setAgility] = useState(0);
  const [intelligence, setIntelligence] = useState(0);
  const [luck, setLuck] = useState(0);

  const [remainingPoints, setRemainingPoints] = useState(0);

  const [loading, setLoading] = useState(false);

  async function requestUser() {
    if (user.sub) {
      const userData: { data: UserDataProps } = await axios({
        method: "get",
        url: `auth/${user.sub}`,
      });

      setUserInfo(userData.data);

      setStrength(userData.data.character.status.strength);
      setAgility(userData.data.character.status.agility);
      setIntelligence(userData.data.character.status.intelligence);
      setLuck(userData.data.character.status.luck);
      setRemainingPoints(userData.data.status_point_remain);
    }
  }

  function increaseStatus(statusName: string) {
    if (remainingPoints && userInfo && remainingPoints > 0) {
      switch (statusName) {
        case "strength":
          setStrength((prev) => prev + 1);
          setRemainingPoints((prev) => prev - 1);
          break;
        case "agility":
          setAgility((prev) => prev + 1);
          setRemainingPoints((prev) => prev - 1);
          break;
        case "intelligence":
          setIntelligence((prev) => prev + 1);
          setRemainingPoints((prev) => prev - 1);
          break;
        case "luck":
          setLuck((prev) => prev + 1);
          setRemainingPoints((prev) => prev - 1);
          break;
        default:
          break;
      }
    }
  }

  function decreaseStatus(statusName: string) {
    if (userInfo) {
      switch (statusName) {
        case "strength":
          if (strength > userInfo.character.status.strength) {
            setStrength((prev) => prev - 1);
            setRemainingPoints((prev) => prev + 1);
          }
          break;
        case "agility":
          if (agility > userInfo.character.status.agility) {
            setAgility((prev) => prev - 1);
            setRemainingPoints((prev) => prev + 1);
          }
          break;
        case "intelligence":
          if (intelligence > userInfo.character.status.intelligence) {
            setIntelligence((prev) => prev - 1);
            setRemainingPoints((prev) => prev + 1);
          }
          break;
        case "luck":
          if (luck > userInfo.character.status.luck) {
            setLuck((prev) => prev - 1);
            setRemainingPoints((prev) => prev + 1);
          }
          break;
        default:
          break;
      }
    }
  }

  function canDecrease(statusName: string) {
    if (userInfo) {
      switch (statusName) {
        case "strength":
          return strength > userInfo.character.status.strength;
        case "agility":
          return agility > userInfo.character.status.agility;
        case "intelligence":
          return intelligence > userInfo.character.status.intelligence;
        case "luck":
          return luck > userInfo.character.status.luck;
        default:
          return false;
      }
    }
  }

  function saveStatus() {
    try {
      setLoading(true);

      axios({
        method: "post",
        url: "auth/updateStatus",
        data: {
          agility,
          strength,
          intelligence,
          luck,
          remainingPoints,
          email: userInfo?.email,
          characterId: userInfo?.character.id,
        },
      })
        .then((data) => {
          console.log(data);
          setAgility(data.data.character.status.agility);
          setStrength(data.data.character.status.strength);
          setLuck(data.data.character.status.luck);
          setIntelligence(data.data.character.status.intelligence);
          requestUser();
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log("erro ao salvar os status");
      console.log(error);
    }
  }

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

  useEffect(() => {
    try {
      requestUser();
    } catch (error) {
      console.log("erro ao dar fetch em user");
      console.log(error);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {userInfo && (
        <>
          <h2 className="mb-4">Nível: {userInfo.nivel}</h2>
          <ul className="child:mb-4">
            <li className="flex items-center">
              Strength: {strength}{" "}
              {!loading && (
                <>
                  <span
                    className={`${
                      remainingPoints <= 0 && "invisible"
                    } cursor-pointer hover:scale-125`}
                    onClick={() => increaseStatus("strength")}
                  >
                    <AiOutlinePlus
                      color="white"
                      className="ml-2"
                      size={"1.1rem"}
                    />
                  </span>
                  <span
                    className={`${
                      !canDecrease("strength") && "invisible"
                    } cursor-pointer hover:scale-125`}
                    onClick={() => decreaseStatus("strength")}
                  >
                    <AiOutlineMinus
                      color="white"
                      className="ml-2"
                      size={"1.1rem"}
                    />
                  </span>
                </>
              )}
            </li>
            <li className="flex items-center">
              Agility: {agility}{" "}
              <span
                className={`${
                  remainingPoints <= 0 && "invisible"
                } cursor-pointer hover:scale-125`}
                onClick={() => increaseStatus("agility")}
              >
                <AiOutlinePlus color="white" className="ml-2" size={"1.1rem"} />
              </span>
              <span
                className={`${
                  !canDecrease("agility") && "invisible"
                } cursor-pointer hover:scale-125`}
                onClick={() => decreaseStatus("agility")}
              >
                <AiOutlineMinus
                  color="white"
                  className="ml-2"
                  size={"1.1rem"}
                />
              </span>
            </li>
            <li className="flex items-center">
              Intelligence: {intelligence}{" "}
              <span
                className={`${
                  remainingPoints <= 0 && "invisible"
                } cursor-pointer hover:scale-125`}
                onClick={() => increaseStatus("intelligence")}
              >
                <AiOutlinePlus color="white" className="ml-2" size={"1.1rem"} />
              </span>
              <span
                className={`${
                  !canDecrease("intelligence") && "invisible"
                } cursor-pointer hover:scale-125`}
                onClick={() => decreaseStatus("intelligence")}
              >
                <AiOutlineMinus
                  color="white"
                  className="ml-2"
                  size={"1.1rem"}
                />
              </span>
            </li>
            <li className="flex items-center">
              Luck: {luck}{" "}
              <span
                className={`${
                  remainingPoints <= 0 && "invisible"
                } cursor-pointer hover:scale-125`}
                onClick={() => increaseStatus("luck")}
              >
                <AiOutlinePlus color="white" className="ml-2" size={"1.1rem"} />
              </span>
              <span
                className={`${
                  !canDecrease("luck") && "invisible"
                } cursor-pointer hover:scale-125`}
                onClick={() => decreaseStatus("luck")}
              >
                <AiOutlineMinus
                  color="white"
                  className="ml-2"
                  size={"1.1rem"}
                />
              </span>
            </li>
          </ul>
          <div>
            <h3>Pontos restantes: {remainingPoints}</h3>
          </div>
        </>
      )}

      <div className="mt-4">
        <button className="btn-primary" onClick={saveStatus}>
          Salvar status
        </button>
      </div>
    </div>
  );
};

export default CharacterStatus2;

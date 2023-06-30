import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

interface CharacterProps {
  classe_id?: number;
  classes?: {
    nome: string;
  };
  id?: number;
  status?: {
    agility?: number;
    luck?: number;
    strength?: number;
    intelligence?: number;
  };
  status_id?: number;
}

const CharacterStatus = ({
  characterInfo,
  statusPointRemaining,
  email,
  nivel,
}: {
  characterInfo: CharacterProps | null;
  statusPointRemaining: number | null;
  email: string | null;
  nivel: number | null;
}) => {
  const [agilityPoints, setAgilityPoints] = useState<number>(
    characterInfo?.status?.agility ?? 0
  );
  const [strengthPoints, setStrengthPoints] = useState<number>(
    characterInfo?.status?.strength ?? 0
  );
  const [luckPoints, setLuckPoints] = useState<number>(
    characterInfo?.status?.luck ?? 0
  );
  const [intelligencePoints, setIntelligencePoints] = useState<number>(
    characterInfo?.status?.intelligence ?? 0
  );

  const [startStatus, setStartStatus] = useState(characterInfo);

  const [loadingStatus, setLoadingStatus] = useState(false);

  const [remainStatusP, setRemainStatusP] = useState(statusPointRemaining);

  const handleIncrease = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    remainingPoints: number | null
  ) => {
    if (remainingPoints !== null && remainingPoints > 0) {
      setter((prevPoints) => prevPoints + 1);
      //@ts-ignore
      setRemainStatusP((prev) => prev - 1);
    }
  };

  const handleDecrease = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    originalValue: number
  ) => {
    setter((prevPoints) =>
      prevPoints > originalValue ? prevPoints - 1 : prevPoints
    );
    setRemainStatusP((prev) => prev! + 1);
  };

  // canIncrease(
  //   agilityPoints, 5 6 11
  //   startStatus?.status?.agility ?? 0, 5
  //   remainStatusP 6 5 0
  // )

  const canIncrease = (
    currentValue: number,
    originalValue: number,
    remainingPoints: number | null
  ) => {
    return (
      currentValue <= originalValue + (remainingPoints ?? 0) &&
      remainingPoints !== null &&
      remainingPoints >= 1
      // currentValue < originalValue + (remainingPoints ?? 0) &&
      // remainingPoints !== null &&
      // remainingPoints >= 1
    );
  };

  const handleIncreaseStatus = async () => {
    //api call

    try {
      setLoadingStatus(true);
      axios({
        method: "post",
        //@ts-ignore
        url: `http://localhost:5000/auth/updateStatus`,
        // url: `https://question-and-answer-game-production.up.railway.app/auth/updateStatus`,
        data: {
          agility: agilityPoints,
          strength: strengthPoints,
          intelligence: intelligencePoints,
          luck: luckPoints,
          remainingPoints: remainStatusP,
          email,
          characterId: characterInfo?.id,
        },
      })
        .then((data) => {
          console.log(data.data.character);
          setAgilityPoints(data.data.character.status.agility);
          setIntelligencePoints(data.data.character.status.intelligence);
          setLuckPoints(data.data.character.status.luck);
          setStrengthPoints(data.data.character.status.strength);
          setRemainStatusP(data.data.status_point_remain);

          setStartStatus((prevStatus) => ({
            ...prevStatus,
            status: {
              ...prevStatus?.status,
              agility: data.data.character.status.agility,
              intelligence: data.data.character.status.intelligence,
              luck: data.data.character.status.luck,
              strength: data.data.character.status.strength,
            },
          }));
        })
        .finally(() => {
          setLoadingStatus(false);
        });
      // console.log(updatedUser.data);
    } catch (error) {
      console.log(error);
      console.log("deu ruim ao atualizar os status");
    }
  };

  console.log(startStatus);
  // console.log(characterInfo);

  return (
    <div className="mb-4 p-4">
      <div>
        <p>
          <span className="font-bold">Classe escolhida:</span>{" "}
          {startStatus?.classes?.nome}
        </p>
        <p>
          {" "}
          <span className="font-bold"> Nível do personagem:</span> {nivel}
        </p>
      </div>
      <div>
        <h2 className="mb-2 font-bold">Status do personagem</h2>
        <ul>
          <li className="flex items-center">
            <span className="mr-2 font-bold">Agilidade:</span>
            {agilityPoints}
            {loadingStatus ? (
              <AiOutlineLoading3Quarters className="ml-2 animate-spin" />
            ) : (
              <>
                {remainStatusP !== null &&
                  remainStatusP > 0 &&
                  canIncrease(
                    agilityPoints,
                    startStatus?.status?.agility ?? 0,
                    remainStatusP
                  ) && (
                    <button
                      className="ml-2 text-blue-500"
                      onClick={() =>
                        handleIncrease(setAgilityPoints, remainStatusP)
                      }
                      disabled={!(remainStatusP && remainStatusP >= 1)}
                    >
                      <AiOutlinePlus />
                    </button>
                  )}
                {agilityPoints > (startStatus?.status?.agility ?? 0) && (
                  <button
                    className="ml-2 text-red-500"
                    onClick={() =>
                      handleDecrease(
                        setAgilityPoints,
                        startStatus?.status?.agility ?? 0
                      )
                    }
                  >
                    <AiOutlineMinus />
                  </button>
                )}
              </>
            )}
          </li>
          <li className="flex items-center">
            <span className="mr-2 font-bold">Força:</span> {strengthPoints}{" "}
            {loadingStatus ? (
              <AiOutlineLoading3Quarters className="ml-2 animate-spin" />
            ) : (
              <>
                {remainStatusP !== null &&
                  remainStatusP > 0 &&
                  canIncrease(
                    strengthPoints,
                    startStatus?.status?.strength ?? 0,
                    remainStatusP
                  ) && (
                    <button
                      className="ml-2 text-blue-500"
                      onClick={() =>
                        handleIncrease(setStrengthPoints, remainStatusP)
                      }
                      disabled={!(remainStatusP && remainStatusP >= 1)}
                    >
                      <AiOutlinePlus />
                    </button>
                  )}
                {strengthPoints > (startStatus?.status?.strength ?? 0) && (
                  <button
                    className="ml-2 text-red-500"
                    onClick={() =>
                      handleDecrease(
                        setStrengthPoints,
                        startStatus?.status?.strength ?? 0
                      )
                    }
                  >
                    <AiOutlineMinus />
                  </button>
                )}
              </>
            )}
          </li>
          <li className="flex items-center">
            <span className="mr-2 font-bold">Sorte:</span> {strengthPoints}{" "}
            {loadingStatus ? (
              <AiOutlineLoading3Quarters className="ml-2 animate-spin" />
            ) : (
              <>
                {remainStatusP !== null &&
                  remainStatusP > 0 &&
                  canIncrease(
                    luckPoints,
                    startStatus?.status?.luck ?? 0,
                    remainStatusP
                  ) && (
                    <button
                      className="ml-2 text-blue-500"
                      onClick={() =>
                        handleIncrease(setLuckPoints, remainStatusP)
                      }
                      disabled={!(remainStatusP && remainStatusP >= 1)}
                    >
                      <AiOutlinePlus />
                    </button>
                  )}
                {luckPoints > (startStatus?.status?.luck ?? 0) && (
                  <button
                    className="ml-2 text-red-500"
                    onClick={() =>
                      handleDecrease(
                        setLuckPoints,
                        startStatus?.status?.luck ?? 0
                      )
                    }
                  >
                    <AiOutlineMinus />
                  </button>
                )}
              </>
            )}
          </li>
          <li className="flex items-center">
            <span className="mr-2 font-bold">Inteligência:</span>{" "}
            {strengthPoints}{" "}
            {loadingStatus ? (
              <AiOutlineLoading3Quarters className="ml-2 animate-spin" />
            ) : (
              <>
                {remainStatusP !== null &&
                  remainStatusP > 0 &&
                  canIncrease(
                    intelligencePoints,
                    startStatus?.status?.intelligence ?? 0,
                    remainStatusP
                  ) && (
                    <button
                      className="ml-2 text-blue-500"
                      onClick={() =>
                        handleIncrease(setIntelligencePoints, remainStatusP)
                      }
                      disabled={!(remainStatusP && remainStatusP >= 1)}
                    >
                      <AiOutlinePlus />
                    </button>
                  )}
                {strengthPoints > (startStatus?.status?.intelligence ?? 0) && (
                  <button
                    className="ml-2 text-red-500"
                    onClick={() =>
                      handleDecrease(
                        setIntelligencePoints,
                        startStatus?.status?.intelligence ?? 0
                      )
                    }
                  >
                    <AiOutlineMinus />
                  </button>
                )}
              </>
            )}
          </li>
        </ul>
      </div>
      <p>
        <span className="font-bold">Pontos restantes para gastar:</span>{" "}
        {remainStatusP}
      </p>
      {statusPointRemaining !== null &&
        remainStatusP !== null &&
        remainStatusP < statusPointRemaining && (
          <button className="btn-primary mt-4" onClick={handleIncreaseStatus}>
            Aumentar Status
          </button>
        )}
    </div>
  );
};

export default CharacterStatus;

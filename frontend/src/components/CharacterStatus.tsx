import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface CharacterProps {
  classe_id: number;
  classes: {
    nome: string;
  };
  id: number;
  status: {
    agility?: number;
    luck?: number;
    strength?: number;
    intelligence?: number;
  };
  status_id: number;
}

const CharacterStatus = ({
  characterInfo,
  statusPointRemaining,
  email,
}: {
  characterInfo: CharacterProps | null;
  statusPointRemaining: number | null;
  email: string | null;
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

  const [loadingStatus, setLoadingStatus] = useState(false);

  const [remainStatusP, setRemainStatusP] = useState(statusPointRemaining);

  const handleIncrease = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    remainingPoints: number | null
  ) => {
    if (remainingPoints !== null && remainingPoints > 0) {
      setter((prevPoints) => prevPoints + 1);
      setRemainStatusP((prev) => prev! - 1);
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
        // url: `http://localhost:5000/auth/updateStatus`,
        url: `https://question-and-answer-game-production.up.railway.app/auth/updateStatus`,
        data: {
          agilityPoints,
          strengthPoints,
          intelligencePoints,
          luckPoints,
          remainStatusP,
          email,
        },
      }).then((data) => {
        console.log(data);
        setLoadingStatus(false);
      });
    } catch (error) {
      console.log(error);
      console.log("deu ruim ao atualizar os status");
    }
  };

  console.log(characterInfo);

  return (
    <div className="mb-4 p-4">
      <div>
        <p>
          <span className="font-bold">Classe escolhida:</span>{" "}
          {characterInfo?.classes.nome}
        </p>
      </div>
      <div>
        <h2 className="mb-2 font-bold">Status do personagem</h2>
        <ul>
          <li>
            <span className="font-bold">Agilidade:</span> {agilityPoints}{" "}
            {remainStatusP !== null && remainStatusP > 0 && (
              <>
                {canIncrease(
                  agilityPoints,
                  characterInfo?.status?.agility ?? 0,
                  remainStatusP
                ) && (
                  <button
                    className="ml-2 text-blue-500"
                    onClick={() =>
                      handleIncrease(setAgilityPoints, remainStatusP)
                    }
                    disabled={
                      !(remainStatusP && remainStatusP >= 1) || loadingStatus
                    }
                  >
                    <AiOutlinePlus />
                  </button>
                )}
              </>
            )}
            {agilityPoints > (characterInfo?.status?.agility ?? 0) && (
              <button
                className="ml-2 text-red-500"
                onClick={() =>
                  handleDecrease(
                    setAgilityPoints,
                    characterInfo?.status?.agility ?? 0
                  )
                }
              >
                <AiOutlineMinus />
              </button>
            )}
          </li>
          <li>
            <span className="font-bold">Força:</span> {strengthPoints}{" "}
            {remainStatusP !== null && remainStatusP > 0 && (
              <>
                {canIncrease(
                  strengthPoints,
                  characterInfo?.status?.strength ?? 0,
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
              </>
            )}
            {strengthPoints > (characterInfo?.status?.strength ?? 0) && (
              <button
                className="ml-2 text-red-500"
                onClick={() =>
                  handleDecrease(
                    setStrengthPoints,
                    characterInfo?.status?.strength ?? 0
                  )
                }
              >
                <AiOutlineMinus />
              </button>
            )}
          </li>
          <li>
            <span className="font-bold">Sorte:</span> {luckPoints}{" "}
            {remainStatusP !== null && remainStatusP > 0 && (
              <>
                {canIncrease(
                  luckPoints,
                  characterInfo?.status?.luck ?? 0,
                  remainStatusP
                ) && (
                  <button
                    className="ml-2 text-blue-500"
                    onClick={() => handleIncrease(setLuckPoints, remainStatusP)}
                    disabled={!(remainStatusP && remainStatusP >= 1)}
                  >
                    <AiOutlinePlus />
                  </button>
                )}
              </>
            )}
            {luckPoints > (characterInfo?.status?.luck ?? 0) && (
              <button
                className="ml-2 text-red-500"
                onClick={() =>
                  handleDecrease(
                    setLuckPoints,
                    characterInfo?.status?.luck ?? 0
                  )
                }
              >
                <AiOutlineMinus />
              </button>
            )}
          </li>
          <li>
            <span className="font-bold">Inteligência:</span>{" "}
            {intelligencePoints}{" "}
            {remainStatusP !== null && remainStatusP > 0 && (
              <>
                {canIncrease(
                  intelligencePoints,
                  characterInfo?.status?.intelligence ?? 0,
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
              </>
            )}
            {intelligencePoints >
              (characterInfo?.status?.intelligence ?? 0) && (
              <button
                className="ml-2 text-red-500"
                onClick={() =>
                  handleDecrease(
                    setIntelligencePoints,
                    characterInfo?.status?.intelligence ?? 0
                  )
                }
              >
                <AiOutlineMinus />
              </button>
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

import React from "react";

interface CharacterProps {
  classe_id: number;
  classes: {
    nome: string;
  };
  id: number;
  status: {
    agility: number;
    luck: number;
    strength: number;
    intelligence: number;
  };
  status_id: number;
}

const CharacterStatus = ({
  characterInfo,
  statusPointRemaining,
}: {
  characterInfo: CharacterProps | null;
  statusPointRemaining: number | null;
}) => {
  console.log("character page");
  console.log(characterInfo);
  console.log(statusPointRemaining);
  console.log("character page");

  return (
    <div className="p-4 child:mb-4">
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
            <span className="font-bold">Agilidade:</span>{" "}
            {characterInfo?.status.agility}
          </li>
          <li>
            <span className="font-bold">Força:</span>{" "}
            {characterInfo?.status.strength}
          </li>
          <li>
            <span className="font-bold">Sorte:</span>{" "}
            {characterInfo?.status.luck}
          </li>
          <li>
            <span className="font-bold">Inteligência:</span>{" "}
            {characterInfo?.status.intelligence}
          </li>
        </ul>
      </div>
      <p>
        <span className="font-bold">Pontos restantes para gastar:</span>{" "}
        {statusPointRemaining}
      </p>
    </div>
  );
};

export default CharacterStatus;

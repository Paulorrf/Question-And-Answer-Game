import React from "react";

type PortalStatus = {
  agility_required: number;
  difficulty: string;
  id: number;
  intelligence_required: number;
  luck_required: number;
  portal_name: string;
  strength_required: number;
};

type ModalProps = {
  portalStatusArray: PortalStatus[] | undefined;
  availables: string[] | undefined;
  userStatus: {
    agility: number;
    intelligence: number;
    luck: number;
    strength: number;
  };
};

const ModalData: React.FC<ModalProps> = ({
  portalStatusArray,
  availables,
  userStatus,
}) => {
  const getDifficultyTranslation = (difficulty: string): string => {
    switch (difficulty) {
      case "Easy":
        return "Fácil";
      case "Normal":
        return "Normal";
      case "Hard":
        return "Difícil";
      case "Very Hard":
        return "Muito Difícil";
      default:
        return "";
    }
  };

  if (typeof portalStatusArray === "undefined") {
    return null; // Return null or handle the loading state as needed
  }

  const difficultyOrder: { [key: string]: number } = {
    Easy: 0,
    Normal: 1,
    Hard: 2,
    "Very Hard": 3,
  };

  const sortedPortals = [...portalStatusArray].sort((a, b) => {
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  });

  const getStatusDifference = (
    requiredStatus: number,
    userStatus: number
  ): string => {
    const difference = requiredStatus - userStatus;
    return difference > 0 ? `(+${difference})` : "";
  };

  return (
    <>
      {
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 ">
            {sortedPortals.map((portal, index) => (
              <div key={index} className="bg-white child:flex">
                <p className="font-bold">
                  <span className="mb-2 mr-2 font-bold">Difficulty:</span>{" "}
                  <span
                    className={`${
                      availables?.includes(portal.difficulty)
                        ? "text-green-500"
                        : "text-black"
                    }`}
                  >
                    {getDifficultyTranslation(portal.difficulty)}
                  </span>
                </p>
                <p>
                  <span className="mr-1 font-bold">Agilidade:</span>{" "}
                  <span className="mr-1">{portal.agility_required}</span>
                  <span
                    className={`${
                      getStatusDifference(
                        portal.agility_required,
                        userStatus.agility
                      ) !== ""
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {getStatusDifference(
                      portal.agility_required,
                      userStatus.agility
                    )}
                  </span>
                </p>
                <p>
                  <span className="mr-1 font-bold">Inteligência: </span>
                  <span className="mr-1">{portal.intelligence_required}</span>
                  <span
                    className={`${
                      getStatusDifference(
                        portal.intelligence_required,
                        userStatus.intelligence
                      ) !== ""
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {getStatusDifference(
                      portal.intelligence_required,
                      userStatus.intelligence
                    )}
                  </span>
                </p>
                <p>
                  <span className="mr-1 font-bold">Sorte:</span>{" "}
                  <span className="mr-1">{portal.luck_required}</span>
                  <span
                    className={`${
                      getStatusDifference(
                        portal.luck_required,
                        userStatus.luck
                      ) !== ""
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {getStatusDifference(portal.luck_required, userStatus.luck)}
                  </span>
                </p>
                <p>
                  <span className="mr-1 font-bold">Força:</span>{" "}
                  <span className="mr-1">{portal.strength_required}</span>
                  <span
                    className={`${
                      getStatusDifference(
                        portal.strength_required,
                        userStatus.strength
                      ) !== ""
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {getStatusDifference(
                      portal.strength_required,
                      userStatus.strength
                    )}
                  </span>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold">Seu status:</h3>
            <p>
              <span className="font-bold">Agilidade:</span> {userStatus.agility}
            </p>
            <p>
              <span className="font-bold">Inteligência:</span>{" "}
              {userStatus.intelligence}
            </p>
            <p>
              <span className="font-bold">Sorte:</span> {userStatus.luck}
            </p>
            <p>
              <span className="font-bold">Força:</span> {userStatus.strength}
            </p>
          </div>
        </div>
      }
    </>
  );
};

export default ModalData;

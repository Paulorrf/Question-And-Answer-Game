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
  isOpen: boolean;
  onClose: () => void;
  portalStatusArray: PortalStatus[];
  availables: string[];
  userStatus: {
    agility: number;
    intelligence: number;
    luck: number;
    strength: number;
  };
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
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
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-black">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="max-h-104 z-10 w-3/4 max-w-lg overflow-y-auto rounded bg-white p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-black">
                Status necessários
              </h2>
              <h2 className="font-bold text-green-600">
                {sortedPortals[0].portal_name}
              </h2>
              <button
                className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
                onClick={onClose}
              >
                Fechar
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {sortedPortals.map((portal, index) => (
                <div key={index} className="bg-white p-4 child:flex">
                  <p className="font-bold">
                    <span className="mb-2 mr-2 font-bold">Difficulty:</span>{" "}
                    <span
                      className={`${
                        availables.includes(portal.difficulty)
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
                      {getStatusDifference(
                        portal.luck_required,
                        userStatus.luck
                      )}
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
                <span className="font-bold">Agilidade:</span>{" "}
                {userStatus.agility}
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
        </div>
      )}
    </>
  );
};

export default Modal;

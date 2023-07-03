import Image from "next/image";
import { useState, useEffect } from "react";
import Death from "../assets/death.png";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface ModalProps {
  onClose: () => void;
}

const DeathModal: React.FC<ModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      onClose();
    }, 20000); // 20 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50  -mt-24 flex items-center justify-center">
      <div className="fixed inset-0  bg-gray-800 bg-opacity-50"></div>
      <div className="absolute z-10 w-96 rounded p-4 shadow-lg">
        <Image src={Death} width={400} alt="death" />
        <h3 className="relative inset-0 -mt-24 w-full rounded bg-gray-800 bg-opacity-75 p-4 text-white shadow-black drop-shadow-lg">
          <span className="mr-4"></span>Para jogar na dificuldade muito dificil
          é necessário apostar seus pontos de status.
          <br></br>
          <span className="mr-4"></span>Cada resposta incorreta fará com que
          você perca aleatóriamente um dos seus pontos de status.
        </h3>

        <button
          className="absolute right-0 top-0 mt-4 rounded px-4 py-2 text-red-600"
          onClick={onClose}
        >
          <AiOutlineCloseCircle size={40} />
        </button>
      </div>
    </div>
  );
};

export default DeathModal;

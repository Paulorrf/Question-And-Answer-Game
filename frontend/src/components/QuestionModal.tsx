import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  question_set: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, question_set }) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);

  const closeModal = () => {
    setModalIsOpen(false);
    onClose();
  };

  if (!modalIsOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="z-10 rounded-md bg-white p-6 text-black shadow-lg">
        <h3 className="text-lg font-medium">{question_set.title}</h3>
        <p className="mt-2">{question_set.description}</p>
        <div className="mt-4 flex justify-end">
          <button
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

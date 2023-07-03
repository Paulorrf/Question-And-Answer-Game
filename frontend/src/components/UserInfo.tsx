import { useState, useEffect } from "react";
import Modal from "./QuestionModal";
import axios from "axios";

interface UserInfoProps {
  userId: number;
}

interface QuestionSetProp {
  description: string;
  id: number;
  title: string;
  question: [
    {
      body: string;
      description_right_answer: string;
      situation: string;
      answer: [
        {
          body: string;
          id: number;
          is_correct: boolean;
        }
      ];
    }
  ];
  isOpen: boolean;
}

const UserInfo = ({ userId }: UserInfoProps) => {
  const [questionSetInfo, setQuestionSetInfo] = useState<
    QuestionSetProp[] | null
  >(null);

  const openModal = (questionSetId: number) => {
    setQuestionSetInfo((prevQuestionSetInfo) => {
      if (prevQuestionSetInfo) {
        return prevQuestionSetInfo.map((questionSet) =>
          questionSet.id === questionSetId
            ? { ...questionSet, isOpen: true }
            : questionSet
        );
      }
      return null;
    });
  };

  const closeModal = (questionSetId: number) => {
    setQuestionSetInfo((prevQuestionSetInfo) => {
      if (prevQuestionSetInfo) {
        return prevQuestionSetInfo.map((questionSet) =>
          questionSet.id === questionSetId
            ? { ...questionSet, isOpen: false }
            : questionSet
        );
      }
      return null;
    });
  };

  // Fetch user data and set question set info
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `https://question-and-answer-game-production.up.railway.app/questions/findbymail/${userId}`
          );
          setQuestionSetInfo(response.data);
        }
      } catch (error) {
        console.log("Error fetching user data");
        console.log(error);
      }
    };

    requestUser();
  }, [userId]);

  return !userId || !questionSetInfo ? (
    <p>Loading</p>
  ) : (
    <div>
      <p className="mb-4 font-bold">Questionários criados</p>
      <ul className="child:mb-2">
        {questionSetInfo.map((questionSet) => (
          <div key={questionSet.id}>
            <li onClick={() => openModal(questionSet.id)}>
              <p className="mb-2">
                <span className="font-bold">Título: </span>
                {questionSet.title}
              </p>
              <p>
                <span className="font-bold">Descrição: </span>
                {questionSet.description}
              </p>
            </li>
            {questionSet.isOpen && (
              <Modal
                isOpen={questionSet.isOpen}
                onClose={() => closeModal(questionSet.id)}
                //@ts-ignore
                questionSet={questionSet}
              />
            )}
            <hr className="mb-8"></hr>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserInfo;

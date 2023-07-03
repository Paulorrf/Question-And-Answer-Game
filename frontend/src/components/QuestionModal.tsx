import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { SubmitHandler, useForm } from "react-hook-form";

interface Answer {
  body: string;
  id: number;
  is_correct: boolean;
}

interface Question {
  id: number;
  body: string;
  description_right_answer: string;
  situation: string;
  answer: Answer[];
}

interface QuestionSetProp {
  description: string;
  id: number;
  title: string;
  question: Question[];
  isOpen: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionSet: QuestionSetProp;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, questionSet }) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(
    null
  );
  const [questionAnswers, setQuestionAnswers] = useState<
    Record<number, string>
  >({});
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = (data) => {
    const userResponses: any[] = [];
    questionSet.question.forEach((question) => {
      const answerKey = `answer-${question.id}`;
      const answer = answers[answerKey];
      userResponses.push({
        question: question.body,
        answer: answer,
      });
    });
    console.log(userResponses);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    onClose();
  };
  //

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestionId((prevId) =>
      prevId === questionId ? null : questionId
    );
  };

  const handleAnswerChange = (questionId: number, answerId: number) => {
    const answerKey = `${questionId}-${answerId}`;
    setQuestionAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerKey,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    answerKey: string
  ) => {
    const answer = e.target.value;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [answerKey]: answer,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="z-10 rounded-md bg-white p-6 text-black shadow-lg">
        <h3 className="text-lg font-medium">{questionSet.title}</h3>
        <p className="mt-2">{questionSet.description}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Accordion allowZeroExpanded>
              {questionSet.question.map((question) => (
                <AccordionItem key={question.id}>
                  <input
                    className="mb-4 rounded border p-2"
                    defaultValue={question.body}
                    type="text"
                    {...register(`question-${question.id}`)}
                  />
                  <AccordionItemHeading>
                    <AccordionItemButton
                      onClick={() => toggleQuestion(question.id)}
                      className="font-medium"
                    >
                      {question.body}
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <ul className="mt-2">
                      {question.answer.map((answer) => (
                        <li key={answer.id}>
                          <label>
                            <input
                              type="radio"
                              value={`${question.id}-${answer.id}`}
                              name={`question-${question.id}`}
                              onChange={() =>
                                handleAnswerChange(question.id, answer.id)
                              }
                            />
                            <input
                              className="mb-2 ml-2 rounded border p-2"
                              defaultValue={answer.body}
                              type="text"
                              {...register(
                                `answer-${question.id}-${answer.id}`
                              )}
                            />
                          </label>
                        </li>
                      ))}
                    </ul>
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="mr-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Enviar
            </button>
            <button
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              onClick={closeModal}
            >
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

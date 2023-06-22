import create from "zustand";
import useStore from "./store";

interface QuestionSetState {
  description: string;
  title: string;
  difficulty?: "easy" | "normal" | "hard" | "very_hard" | "expert";
}

interface QuestionState {
  question_set: QuestionSetState;
  changeQuestionSet: (question_set_obj: QuestionSetState) => void;
}

const setQuestionStore = create<QuestionState>((set: any) => ({
  question_set: {
    description: "",
    title: "",
    difficulty: "easy",
  },
  changeQuestionSet: (question_set_obj: QuestionSetState) =>
    set({
      question_set: {
        description: question_set_obj.description,
        title: question_set_obj.title,
        difficulty: useStore.getState().difficulty,
      },
    }),
}));

export default setQuestionStore;

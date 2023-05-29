import create from "zustand";

interface Questions {
  question: String;
  answer1: String;
  answer2: String;
  answer3: String;
  answer4: String;
  tags: String[];
  answer: number;
  difficulty: String;
  description: String;
  user_id: Number | undefined;
}

interface QuestionState {
  question22: any;
  addQuestion: (question: Questions, state: Questions) => void;
}

const questionStore = create<any>((set) => ({
  questions: [],
  addQuestion: (question: Questions, state: any) =>
    set((store: any) => ({ questions: [...store.questions, question] })),
}));

export default questionStore;

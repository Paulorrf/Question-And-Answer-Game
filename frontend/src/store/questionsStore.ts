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

const questionStore = create<any>((set, get) => ({
  questions: [],
  addQuestion: (question: any, state: any) =>
    // questionStore.getState()
    set((state: any) => ({
      questions: [...state.questions, question],
    })),
}));

export default questionStore;

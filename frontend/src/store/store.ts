import create from "zustand";

interface DifficultyState {
  difficulty: String;
  changeDifficulty: (difficulty: string) => void;
}

const useStore = create<DifficultyState>((set: any) => ({
  difficulty: "easy",
  changeDifficulty: (difficulty: string) => set({ difficulty: difficulty }),
}));

export default useStore;

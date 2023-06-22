import create from "zustand";

interface DifficultyState {
  difficulty: "easy" | "normal" | "hard" | "very_hard" | "expert";
  changeDifficulty: (difficulty: string) => void;
}

const useStore = create<DifficultyState>((set: any) => ({
  difficulty: "easy",
  changeDifficulty: (difficulty: string) => set({ difficulty: difficulty }),
}));

export default useStore;

import create from "zustand";

interface RegisterErrorState {
  hasError: boolean;
  changeError: (hasError: boolean) => void;
}

const registerErrorStore = create<RegisterErrorState>((set: any) => ({
  hasError: true,

  changeError: (hasError: boolean) =>
    set((state: boolean) => ({
      hasError: hasError,
    })),
}));

export default registerErrorStore;

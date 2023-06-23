import create from "zustand";

interface FieldsState {
  email: string;
  password: string;
  name: string;
}

interface DataState {
  data: FieldsState;
  changeData: (data: FieldsState) => void;
}

const signInStore = create<DataState>((set: any) => ({
  data: {
    email: "",
    password: "",
    name: "",
  },
  changeData: (data: FieldsState) => set({ data }),
}));

export default signInStore;

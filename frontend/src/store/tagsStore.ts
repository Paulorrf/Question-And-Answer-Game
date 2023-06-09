import { getQuestions } from "@/api/getQuestions";
import create from "zustand";

interface TagsState {
  genericTags: string[];
  specificTags: string[];
  changeGeneric: (genericTags: string) => void;
  changeSpecific: (specificTags: string) => void;
}

const tagsStore = create<TagsState>((set: any) => ({
  genericTags: [],
  specificTags: [],

  changeGeneric: (genericTags: string) =>
    set((state: any) => ({
      genericTags: [...state.genericTags, genericTags],
    })),
  //   changeGeneric: (genericTags: string[]) => set({ genericTags }),
  changeSpecific: (specificTags: string) =>
    set((state: any) => ({
      specificTags: [...state.specificTags, specificTags],
    })),
}));

export default tagsStore;

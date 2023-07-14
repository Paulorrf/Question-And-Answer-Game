import create from "zustand";

interface TagsState {
  genericTags: string[];
  specificTags: string[];
  storedRecommendedSpec: string[];
  newTags: string[];
  changeGeneric: (genericTags: string) => void;
  changeGenericArr: (genericTags: string[]) => void;
  changeSpecific: (specificTags: string) => void;
  changeSpecificArr: (specificTags: string[]) => void;
  addStoredRecommendedSpecOne: (specificTag: string) => void;
  addStoredRecommendedSpecArr: (specificTag: string[]) => void;
  addNewTag: (specificTag: string) => void;
}

const compareArrays = (a: string[], b: string[]) =>
  a.length === b.length && a.every((element, index) => element === b[index]);

const tagsStore = create<TagsState>((set: any) => ({
  genericTags: [],
  specificTags: [],
  storedRecommendedSpec: [],
  newTags: [],

  changeGeneric: (genericTags: string) =>
    set((state: any) => ({
      genericTags: [...state.genericTags, genericTags],
    })),
  changeGenericArr: (genericTags: string[]) => {
    set((state: any) => ({
      genericTags,
    }));
  },
  changeSpecificArr: (specificTags: string[]) => {
    set((state: any) => ({
      // specificTags,
      specificTags: compareArrays(state.specificTags, specificTags)
        ? state.specificTags
        : specificTags,
    }));
  },
  //   changeGeneric: (genericTags: string[]) => set({ genericTags }),
  changeSpecific: (specificTags: string) =>
    set((state: any) => ({
      specificTags: [...state.specificTags, specificTags],
    })),
  addStoredRecommendedSpecOne: (specificTag: string) =>
    set((state: any) => ({
      storedRecommendedSpec: [...state.storedRecommendedSpec, specificTag],
    })),
  addStoredRecommendedSpecArr: (specificTag: string[]) =>
    set((state: any) => ({
      storedRecommendedSpec: specificTag,
    })),
  addNewTag: (specificTag: string) =>
    set((state: any) => ({
      newTags: [...state.newTags, specificTag],
    })),
}));

export default tagsStore;

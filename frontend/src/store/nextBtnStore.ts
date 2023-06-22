import create from "zustand";
import tagsStore from "./tagsStore";

// const changeTagsGeneric = tagsStore((state) => state.changeGeneric);
// const changeTagsSpec = tagsStore((state) => state.changeSpecific);

interface NextBtnState {
  isActionEnabled: boolean;
  performAction: (genericTags: string[], specificTags: string[]) => void;
  setActionEnabled: (value: boolean) => void;
}

const nextBtnStore = create<NextBtnState>((set, get) => ({
  // Initial state
  isActionEnabled: false,

  // Action to be performed
  performAction: (genericTags, specificTags) => {
    tagsStore.getState().changeGeneric(genericTags);
    tagsStore.getState().changeSpecific(specificTags);
    // changeTagsGeneric(genericTags);
    // changeTagsSpec(specificTags);
    // Do something when the button is clicked
  },

  setActionEnabled: (value: boolean) => set({ isActionEnabled: value }),
}));

export default nextBtnStore;

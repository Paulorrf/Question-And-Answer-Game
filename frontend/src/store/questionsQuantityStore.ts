import create from "zustand";

interface QuantityState {
  quantity: number;
  changeQuantity: (quantity: number) => void;
}

const questionQuantityStore = create<QuantityState>((set: any) => ({
  quantity: 10,
  changeQuantity: (quantity: number) => set({ quantity: quantity }),
}));

export default questionQuantityStore;

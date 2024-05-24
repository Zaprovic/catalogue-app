import { create } from "zustand";

type useStoreType = {
  items: number;
  increaseItems: (items: number) => void;
  decreaseItems: (items: number) => void;
};

export const useStoreItems = create<useStoreType>((set) => ({
  items: 0,
  increaseItems: () => set((state) => ({ items: state.items + 1 })),
  decreaseItems: () => set((state) => ({ items: state.items - 1 })),
}));

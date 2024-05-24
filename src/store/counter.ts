import { create } from "zustand";
import { persist } from "zustand/middleware";

type useStoreType = {
  items: number;
  pressedProducts: Record<number, boolean>; // Track pressed state per product ID
  toggleProductInCart: (productId: number) => void; // Combined action
};

export const useStoreItems = create(
  persist<useStoreType>(
    (set, get) => ({
      items: 0,
      pressedProducts: {}, // Initialize an empty object
      toggleProductInCart: (productId: number) =>
        set((state) => {
          return {
            items: state.pressedProducts[productId]
              ? state.items - 1
              : state.items + 1,
            pressedProducts: {
              ...state.pressedProducts,
              [productId]: !state.pressedProducts[productId],
            },
          };
        }),
    }),
    {
      name: "cart-storage",
    },
  ),
);

// import { create } from "zustand";

// type useStoreType = {
//   items: number;
//   increaseItems: () => void;
//   decreaseItems: () => void;
// };

// export const useStoreItems = create<useStoreType>()((set, get) => ({
//   items: 0,
//   increaseItems: () => set((state) => ({ items: state.items + 1 })),
//   decreaseItems: () => set((state) => ({ items: state.items - 1 })),
// }));

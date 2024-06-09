import { SelectProductType } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = SelectProductType;

type useStoreType = {
  items: number;
  pressedProducts: Record<number, boolean>; // Track pressed state per product ID
  toggleProductInCart: (product: Product) => void; // Combined action
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
};

export const useStoreItems = create(
  persist<useStoreType>(
    (set, get) => ({
      items: 0,
      cartItems: [],
      pressedProducts: {}, // Initialize an empty object
      addToCart: (product: Product) =>
        set((state) => ({
          cartItems: [...state.cartItems, product],
        })),
      removeFromCart: (productId: number) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== productId),
          items: state.items - 1,
        })),
      toggleProductInCart: (product: Product) =>
        set((state) => {
          if (state.pressedProducts[product.id]) {
            return {
              items: state.items - 1,
              cartItems: state.cartItems.filter(
                (item) => item.id !== product.id,
              ),
              pressedProducts: {
                ...state.pressedProducts,
                [product.id]: !state.pressedProducts[product.id],
              },
            };
          }

          return {
            items: state.items + 1,
            cartItems: [...state.cartItems, product],
            pressedProducts: {
              ...state.pressedProducts,
              [product.id]: !state.pressedProducts[product.id],
            },
          };
        }),
    }),
    {
      name: "cart-storage", // Unique name for your cookie
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

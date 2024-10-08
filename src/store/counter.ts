import { calculatePriceWithDiscount } from "@/lib/utils";
import { SelectProductType } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = SelectProductType;

type useStoreType = {
  items: number;
  filterSearch: string;
  setFilteredSearch: (products: string) => void;
  filteredProducts: Product[];
  setFilteredProducts: (products: Product[]) => void;
  pressedProducts: Record<number, boolean>; // Track pressed state per product ID
  toggleProductInCart: (product: Product) => void; // Combined action
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  removeAllItems: () => void;
};

export const useStoreItems = create(
  persist<useStoreType>(
    (set, get) => ({
      items: 0,
      cartItems: [],
      filteredProducts: [],
      setFilteredProducts: (products) => set({ filteredProducts: products }),
      filterSearch: "",
      setFilteredSearch: (products) => set({ filterSearch: products }),
      pressedProducts: {}, // Initialize an empty object
      addToCart: (product: Product) => {
        if (product.discountPercentage !== 0) {
          const discountedPrice = calculatePriceWithDiscount(
            product.price,
            product.discountPercentage as number,
          );

          return set((state) => ({
            cartItems: [...state.cartItems, { ...product, discountedPrice }],
          }));
        } else {
          return set((state) => ({
            cartItems: [...state.cartItems, product],
          }));
        }
      },
      removeFromCart: (productId: number) =>
        set((state) => {
          const productIndex = state.cartItems.findIndex(
            (item) => item.id === productId,
          );
          if (productIndex !== -1) {
            const newCartItems = [...state.cartItems];
            newCartItems.splice(productIndex, 1);

            return {
              cartItems: newCartItems,
              items: newCartItems.length,
              pressedProducts: {
                ...state.pressedProducts,
                [productId]: false,
              },
            };
          } else {
            return state; // If the product doesn't exist, don't modify the state
          }
        }),
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

      removeAllItems: () =>
        set((state) => ({
          items: 0,
          cartItems: [],
          pressedProducts: {},
        })),
    }),
    {
      name: "cart-storage", // Unique name for your cookie
    },
  ),
);

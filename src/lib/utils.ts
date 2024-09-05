import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { SelectProductType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPricetoCOP(price: number) {
  return new Intl.NumberFormat("es-CO", {
    currency: "COP",
    style: "currency",
    minimumFractionDigits: 0,
  }).format(price);
}

export async function getProducts() {
  return db.select().from(ProductTable).all();
}

export function calculateTotalPrice(cartItems: SelectProductType[]) {
  // calculate total price with discount

  return cartItems
    .map((item) => {
      if (item.discountPercentage !== null) {
        return item.price - (item.price * item.discountPercentage ?? 0) / 100;
      } else {
        return item.price;
      }
    })
    .reduce((acc, price) => acc + price, 0);
}

export function calculatePriceWithDiscount(price: number, discount: number) {
  return formatPricetoCOP(price - (price * discount) / 100);
}

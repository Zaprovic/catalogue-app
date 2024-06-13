import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { SelectProductType } from "@/types";
import { type ClassValue, clsx } from "clsx";
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
  return cartItems
    .map((item) => item.price)
    .reduce((acc, price) => acc + price, 0);
}

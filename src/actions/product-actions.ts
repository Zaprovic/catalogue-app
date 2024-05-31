"use server";

import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { InsertProductType } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

//* THIS ACTION WORKS
export const getAllProductsAction = async () => {
  const products = await db.select().from(ProductTable).all();

  // todo: make sure to revalidate
  return products;
};

//* THIS ACTION WORKS
export const insertProductAction = async (data: InsertProductType) => {
  try {
    const productToAdd = await db.insert(ProductTable).values(data).returning();
    revalidatePath("/dashboard");
    revalidatePath("/products");
    return productToAdd;
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: "Unknown error",
      };
    }
  }
};

//* THIS ACTION WORKS
export const deleteProductAction = async (id: number) => {
  try {
    await db.delete(ProductTable).where(eq(ProductTable.id, id));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
  revalidatePath("/dashboard");
};

//! THIS ACTION DOESNT WORK
export const getProductsAction = async (formData: FormData) => {
  const products = db.select().from(ProductTable).all();

  return products;
};

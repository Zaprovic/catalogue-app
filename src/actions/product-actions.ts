"use server";

import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { InsertProductType } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

//! THIS ACTION DOESNT WORK
export const getAllProductsAction = async (formData: InsertProductType) => {
  console.log(formData);
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

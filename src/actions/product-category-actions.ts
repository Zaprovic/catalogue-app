"use server";

import { db } from "@/db/main";
import { ProductCategoryTable } from "@/db/schema";
import { InsertProductCategoryType } from "@/types";
import { revalidatePath } from "next/cache";

export const insertProductCategoryAction = async (
  data: InsertProductCategoryType[],
) => {
  try {
    const productToAdd = await db
      .insert(ProductCategoryTable)
      .values(data)
      .returning();
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

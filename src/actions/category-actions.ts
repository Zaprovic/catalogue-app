"use server";

import { InsertCategorySchema } from "@/schemas/category";
import { InsertCategoryType } from "@/types";
import { revalidatePath } from "next/cache";
import { db } from "../db/main";
import { CategoryTable } from "../db/schema";

//! THIS DOES NOT WORK
export async function selectAllCategoriesAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  for (let key in data) {
    if (key.startsWith("$ACTION")) delete data[key];
  }

  const result = await InsertCategorySchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.format());
    return;
  }

  await db.insert(CategoryTable).values(result.data);
  revalidatePath("/api/categories");
}

//! THIS DOES NOT WORK
export async function getCategoriesAction() {
  return db.select().from(CategoryTable).all();
}

export async function insertCategoryAction(data: InsertCategoryType) {
  try {
    const categoryToAdd = await db
      .insert(CategoryTable)
      .values(data)
      .returning();
    revalidatePath("/products");
    return categoryToAdd;
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
}

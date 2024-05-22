"use server";

import { InsertCategorySchema } from "@/schemas/category";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { CategoryTable } from "../db/schema";

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
  // console.log(result.data);
  // revalidatePath("/products");
  revalidatePath("/");
}

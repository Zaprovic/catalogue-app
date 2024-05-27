"use server";
import { revalidatePath } from "next/cache";

export const revalidateProducts = async () => {
  revalidatePath("/products");
};

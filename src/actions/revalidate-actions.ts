"use server";
import { revalidatePath } from "next/cache";

export const revalidateProducts = async () => {
  revalidatePath("/products");
  revalidatePath("/dashboard");
};

export const revalidateOneProduct = async (id: number) => {
  revalidatePath(`/products/${id}`);
  revalidatePath("/dashboard");
};

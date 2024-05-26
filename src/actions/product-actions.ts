"use server";

import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { InsertProductType } from "@/types";

export const getAllProductsAction = async (formData: InsertProductType) => {
  console.log(formData);
};

export const deleteProductAction = async () => {
  console.log("deleted");
};

export const getProductsAction = async (formData: FormData) => {
  const products = db.select().from(ProductTable).all();

  return products;
};

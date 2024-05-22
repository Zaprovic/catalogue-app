import { ProductCategoryTable } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const SelectProductCategorySchema =
  createSelectSchema(ProductCategoryTable);

export const InsertProductCategorySchema =
  createInsertSchema(ProductCategoryTable);

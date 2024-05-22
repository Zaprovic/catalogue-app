import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { ProductCategoryTable } from "../db/schema";

export const SelectProductCategorySchema =
  createSelectSchema(ProductCategoryTable);

export const InsertProductCategorySchema =
  createInsertSchema(ProductCategoryTable);

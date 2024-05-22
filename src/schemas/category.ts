import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { CategoryTable } from "../db/schema";

export const SelectCategorySchema = createSelectSchema(CategoryTable);
export const InsertCategorySchema = createInsertSchema(CategoryTable, {
  name: z.string().trim().min(1, {
    message: "La categoria no puede ser vacia",
  }),
});

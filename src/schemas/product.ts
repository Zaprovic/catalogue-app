import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { ProductTable } from "../db/schema";

const productBaseSchema = {
  title: z.string().trim().min(1, {
    message: "Asegurate de colocar un titulo no vacio",
  }),
  price: z.coerce.number().min(0),
  discountPercentage: z.coerce.number().min(0).max(100),
  image: z.string().url({
    message: "Por favor coloca una URL valida",
  }),
  isAvailable: z.boolean(),
};

export const SelectProductSchema = createSelectSchema(
  ProductTable,
  productBaseSchema,
);

export const InsertProductSchema = createInsertSchema(
  ProductTable,
  productBaseSchema,
);

export const UpdateProductSchema = SelectProductSchema.partial();

import { ProductTable } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const productBaseSchema = {
  title: z.string().trim().min(1, {
    message: "Asegurate de colocar un titulo no vacio",
  }),
  price: z.coerce.number().min(0),
  image: z.string().url({
    message: "Por favor coloca una URL valida",
  }),
};

export const SelectProductSchema = createSelectSchema(
  ProductTable,
  productBaseSchema,
);

export const InsertProductSchema = createInsertSchema(
  ProductTable,
  productBaseSchema,
);

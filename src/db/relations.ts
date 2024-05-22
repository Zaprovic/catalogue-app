import { relations } from "drizzle-orm";
import { CategoryTable, ProductCategoryTable, ProductTable } from "./schema";

export const productRelations = relations(ProductTable, ({ many }) => ({
  categories: many(ProductCategoryTable),
}));

export const categoryRelations = relations(CategoryTable, ({ many }) => ({
  products: many(ProductCategoryTable),
}));

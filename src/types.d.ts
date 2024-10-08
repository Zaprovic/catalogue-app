import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { CategoryTable, ProductCategoryTable, ProductTable } from "./db/schema";

// product
export type SelectProductType = InferSelectModel<typeof ProductTable>;
export type InsertProductType = InferInsertModel<typeof ProductTable>;
export type UpdateProductType = Partial<SelectProductType>;

//category
export type SelectCategoryType = InferSelectModel<typeof CategoryTable>;
export type InsertCategoryType = InferInsertModel<typeof CategoryTable>;

//product-category
export type SelectProductCategoryType = InferSelectModel<
  typeof ProductCategoryTable
>;
export type InsertProductCategoryType = InferInsertModel<
  typeof ProductCategoryTable
>;

// sorting methods
type SortMethods = "asc" | "desc" | "discount";

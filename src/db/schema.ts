import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const ProductTable = sqliteTable("Product", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  title: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  image: text("image", { mode: "text" }),
  specification: text("specification"),
  brand: text("brand"),
  userId: text("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
});

export const CategoryTable = sqliteTable("Category", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  name: text("name").notNull().unique(),
});

export const UserTable = sqliteTable("User", {
  id: text("id", { mode: "text" }).primaryKey().notNull(),
  username: text("username").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").notNull().unique(),
});

// many-to-many relation between the tables
export const ProductCategoryTable = sqliteTable("ProductCategory", {
  productId: integer("product_id")
    .notNull()
    .references(() => ProductTable.id, {
      onDelete: "cascade",
    }),
  categoryId: integer("category_id")
    .notNull()
    .references(() => CategoryTable.id, {
      onDelete: "cascade",
    }),
});

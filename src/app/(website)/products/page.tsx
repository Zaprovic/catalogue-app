import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { type SelectProductType } from "@/types";
import { asc, eq } from "drizzle-orm";
import ProductCardList from "./(components)/product-card-list";

export const revalidate = 0;

export default async function ProductPage() {
  const userId = undefined;

  let products: SelectProductType[] = [];

  if (userId) {
    products = await db
      .select()
      .from(ProductTable)
      .where(eq(ProductTable.userId, userId));
  } else {
    products = products = await db
      .select()
      .from(ProductTable)
      .orderBy(asc(ProductTable.title));
  }

  return (
    <>
      <div className="flex flex-1 gap-10">
        <section className="mx-auto w-full">
          <ProductCardList />
        </section>
      </div>
    </>
  );
}

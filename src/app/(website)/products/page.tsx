import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { asc } from "drizzle-orm";
import ProductCardList from "./(components)/product-card-list";

export const revalidate = 0;

export default async function ProductPage() {
  const products = await db
    .select()
    .from(ProductTable)
    .orderBy(asc(ProductTable.title));

  return (
    <>
      <div className="relative flex h-screen flex-1 gap-10 overflow-y-auto">
        <section className="relative mx-auto w-full">
          <h4 className="my-4 bg-background text-xl font-semibold md:my-0 md:pb-5">
            TODOS LOS PRODUCTOS
          </h4>
          <ProductCardList products={products} />
        </section>
      </div>
    </>
  );
}

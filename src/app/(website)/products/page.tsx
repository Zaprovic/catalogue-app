import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { asc } from "drizzle-orm";
import ProductCardList from "./(components)/product-card-list";

export const revalidate = 0;

export default async function ProductPage() {
  //const userId = undefined;
  //
  //let products: SelectProductType[] = [];
  //
  //if (userId) {
  //  products = await db
  //    .select()
  //    .from(ProductTable)
  //    .where(eq(ProductTable.userId, userId));
  //} else {
  //  products = products = await db
  //    .select()
  //    .from(ProductTable)
  //    .orderBy(asc(ProductTable.title));
  //}
  const products = await db.select().from(ProductTable).orderBy(asc(ProductTable.title))

  return (
    <>
      <div className="flex flex-1 gap-10">
        <section className="mx-auto w-full">
          <h4 className="my-4 text-xl font-semibold md:my-0 md:mb-5">
            TODOS LOS PRODUCTOS
          </h4>
          <ProductCardList products={products} />
        </section>
      </div>
    </>
  );
}

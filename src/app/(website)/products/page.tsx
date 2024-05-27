import ProductCard from "@/components/product-card";
import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import style from "@/styles.module.css";
import { type SelectProductType } from "@/types";
import { asc, eq } from "drizzle-orm";

export const revalidate = 0;

export default async function ProductPage() {
  // const { userId } = auth();
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
      <div className="flex-1">
        <section className="mx-auto w-full">
          <div
            className={`${style.productContainer} w-full place-items-center`}
          >
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

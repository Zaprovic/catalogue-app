import ProductCard from "@/components/product-card";
import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import style from "@/styles.module.css";
import { type SelectProductType } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { asc, eq, not } from "drizzle-orm";

export const revalidate = 0;

export default async function ProductPage() {
  const { userId } = auth();

  let products: SelectProductType[] = [];

  console.log(String(userId));

  if (userId) {
    products = await db
      .select()
      .from(ProductTable)
      .where(not(eq(ProductTable.userId, userId)));
  } else {
    products = products = await db
      .select()
      .from(ProductTable)
      .orderBy(asc(ProductTable.title));
  }

  return (
    <>
      <div className="flex-1">
        <section className="mx-auto h-full w-full">
          <div
            className={`${style.productContainer} h-full w-full place-items-center`}
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

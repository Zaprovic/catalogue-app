import ProductCard from "@/components/product-card";
import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import style from "@/styles.module.css";

export const revalidate = 0;

export default async function ProductPage() {
  const products = await db.select().from(ProductTable).all();

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

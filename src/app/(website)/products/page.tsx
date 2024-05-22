import CategoriesNavbar from "@/components/categories-navbar";
import Footer from "@/components/footer/footer";
import ProductCard from "@/components/product-card";
import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import style from "@/styles.module.css";

export const revalidate = 0;

export default async function ProductPage() {
  const products = await db.select().from(ProductTable).all();

  return (
    <div className="flex h-full flex-col">
      <main className=" flex-1 px-8 pt-4 md:p-6 ">
        <div className="mb-14">
          <h1 className="mb-8 text-3xl font-bold -tracking-wide">
            Mis productos
          </h1>

          <section className="mx-auto w-full max-w-[1000px]">
            <CategoriesNavbar />
            <div
              className={`${style.productContainer} w-full place-items-center`}
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id.toString()}
                  title={product.title}
                  description={product.description}
                  image={product.image}
                  price={product.price}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

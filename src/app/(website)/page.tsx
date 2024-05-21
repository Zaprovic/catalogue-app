import CategoriesNavbar from "@/components/categories-navbar";
import Footer from "@/components/footer/footer";
import ProductCard from "@/components/product-card";
import style from "../../styles.module.css";

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <main className=" flex-1 px-8 pt-4 md:px-14">
        <div className="mb-14">
          <h1 className="mb-8 text-3xl font-bold -tracking-wide">
            Mis productos
          </h1>

          <section className="mx-auto w-full max-w-[1000px] ">
            <CategoriesNavbar />
            <div className={`${style.productContainer} place-items-center`}>
              {Array.from({ length: 30 }).map((item, idx) => (
                <ProductCard key={idx + 1} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import CategoryOptions from "./products/(components)/category-options";
import CategoryRegistrationForm from "./products/(components)/category-registration-form";
import ProductCategoryForm from "./products/(components)/product-category-form";
import ProductRegistrationForm from "./products/(components)/product-registration-form";

export const revalidate = 0;

export default function Home() {
  return (
    <main className="flex h-full flex-col p-6">
      <h1 className="text-3xl font-bold -tracking-wider">
        Registra tus productos
      </h1>

      <section className="mx-auto my-5 grid w-full max-w-[800px] grid-cols-1 gap-3">
        <CategoryRegistrationForm />
        <CategoryOptions />

        <div className="flex w-full flex-col gap-3">
          <ProductRegistrationForm />
          <ProductCategoryForm />
        </div>
      </section>
    </main>
  );
}

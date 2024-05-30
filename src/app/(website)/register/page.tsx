import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CategoryRegistrationForm from "../products/(components)/category-registration-form";
import ProductCategoryForm from "../products/(components)/product-category-form";
import ProductRegistrationForm from "../products/(components)/product-registration-form";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <main className="flex h-full flex-col p-6">
      <h1 className="text-3xl font-semibold -tracking-wider">
        Crea tus productos
      </h1>

      <section className="mx-auto my-5 grid w-full max-w-[1000px] grid-cols-1 gap-3">
        <CategoryRegistrationForm />
        {/* <CategoryOptions /> */}

        <div className="flex w-full flex-col gap-3">
          <ProductRegistrationForm session={session} />
          <ProductCategoryForm />
        </div>
      </section>
    </main>
  );
};

export default Page;

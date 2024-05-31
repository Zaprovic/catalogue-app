import { auth } from "@/auth";
import { db } from "@/db/main";
import { CategoryTable } from "@/db/schema";
import { redirect } from "next/navigation";
import CategoryOptionsForm from "../products/(components)/category-options-form";
import CategoryRegistrationForm from "../products/(components)/category-registration-form";
import ProductRegistrationForm from "../products/(components)/product-registration-form";

const Page = async () => {
  const session = await auth();
  const categories = await db.select().from(CategoryTable).all();

  if (!session) redirect("/");

  return (
    <main className="flex h-full flex-col p-6">
      <h1 className="text-3xl font-semibold -tracking-wider">
        Crea tus productos
      </h1>

      <section className="my-5 grid w-full max-w-3xl grid-cols-1 gap-3">
        <CategoryRegistrationForm session={session} />
        <CategoryOptionsForm categories={categories} />

        <div className="flex w-full flex-col gap-3">
          <ProductRegistrationForm session={session} />
          {/* <ProductCategoryForm /> */}
        </div>
      </section>
    </main>
  );
};

export default Page;

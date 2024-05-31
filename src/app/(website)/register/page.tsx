import { auth } from "@/auth";
import CategoryOptionsCard from "@/components/forms/categories/category-options-card";
import CategoryRegistrationCard from "@/components/forms/categories/category-registration-card";
import ProductRegistrationCard from "@/components/forms/products/product-registration-card";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <main className="flex h-full flex-col p-6">
      <h1 className="text-3xl font-semibold -tracking-wider">
        Crea tus productos
      </h1>

      <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <section className="grid w-full grid-cols-1 gap-3">
          <CategoryRegistrationCard />

          <div className="flex w-full flex-col gap-3">
            <ProductRegistrationCard />
          </div>
        </section>

        <section>
          <CategoryOptionsCard />
        </section>
      </div>
    </main>
  );
};

export default Page;

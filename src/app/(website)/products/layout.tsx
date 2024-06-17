import CategoriesFilterBtn from "@/components/categories-filter-btn";
import CategoriesNavbar from "@/components/categories-navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/db/main";
import { CategoryTable, ProductTable } from "@/db/schema";
import { ReactNode, Suspense } from "react";

//? Searchbar not working properly

const Layout = async ({ children }: { children: ReactNode }) => {
  const categories = await db.select().from(CategoryTable).all();
  const products = await db.select().from(ProductTable).all();

  return (
    <>
      <main className="p-6">
        {/* <SearchProductsForm products={products} /> */}
        <div className="mb-4 flex w-full justify-end md:hidden">
          <CategoriesFilterBtn categories={categories} />
        </div>

        <div className="flex justify-center md:gap-12">
          <Suspense
            fallback={
              <div className="mx-auto mb-6 flex h-40 w-28 flex-col gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-full w-full" />
                ))}
              </div>
            }
          >
            <CategoriesNavbar />
          </Suspense>

          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;

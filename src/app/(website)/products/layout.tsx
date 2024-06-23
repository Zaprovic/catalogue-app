import CategoriesFilterBtn from "@/components/categories-filter-btn";
import CategoriesNavbar from "@/components/categories-navbar";
import PrevBtn from "@/components/prev-btn";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/db/main";
import { CategoryTable, ProductTable } from "@/db/schema";
import { ReactNode, Suspense } from "react";

//! Searchbar not working properly

const Layout = async ({ children }: { children: ReactNode }) => {
  const categories = await db.select().from(CategoryTable).all();
  const products = await db.select().from(ProductTable).all();

  return (
    <>
      <main className="relative overflow-visible p-0">
        <div className="sticky top-[calc(76px-0rem)] z-10 mb-2 flex w-full justify-between gap-4 bg-background p-6 md:hidden">
          <PrevBtn />
          <CategoriesFilterBtn categories={categories} />
        </div>

        {/* <div>
          <SearchProductsForm products={products} />
        </div> */}

        <div className="p-6">
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
        </div>
      </main>
    </>
  );
};

export default Layout;

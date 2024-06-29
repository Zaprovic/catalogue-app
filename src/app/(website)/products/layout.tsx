import CategoriesFilterBtn from "@/components/categories-filter-btn";
import CategoriesNavbar from "@/components/categories-navbar";
import PrevBtn from "@/components/prev-btn";
import ProductSortBtn from "@/components/products-sort-btn";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/db/main";
import { CategoryTable, ProductTable } from "@/db/schema";
import { SortMethods } from "@/types";
import { ReactNode, Suspense } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const categories = await db.select().from(CategoryTable).all();
  const products = await db.select().from(ProductTable).all();

  const onSortChange = async (s: SortMethods) => {
    if (s === "asc") {
    }
  };

  return (
    <>
      <main className="relative overflow-visible p-0">
        <div className="sticky top-[calc(76px-0rem)] z-10 mb-2 flex w-full justify-between gap-4 bg-background p-6 xl:hidden">
          <PrevBtn />
          <div className="flex gap-2">
            <CategoriesFilterBtn categories={categories} />
            <ProductSortBtn />
          </div>
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
              <CategoriesNavbar categories={categories} />
            </Suspense>

            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;

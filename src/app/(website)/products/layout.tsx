import CategoriesFilterBtn from "@/components/categories-filter-btn";
import CategoriesNavbar from "@/components/categories-navbar";
import PrevBtn from "@/components/prev-btn";
import ProductSortBtn from "@/components/products-sort-btn";
import SearchbarProducts from "@/components/searchbar-products";
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
      <main className="relative">
        <div className="border-gray/20 fixed top-[76px] z-10 flex w-full flex-col gap-4 border border-b-2 bg-background p-6 xl:hidden">
          <div className="flex w-full justify-between">
            <PrevBtn />
            <div className="flex gap-2">
              <CategoriesFilterBtn categories={categories} />
              <ProductSortBtn />
            </div>
          </div>
          <div>
            <SearchbarProducts />
          </div>
        </div>

        <div className="relative mt-[208px] px-6 py-4 xl:mt-[76px]">
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

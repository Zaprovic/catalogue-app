import CategoriesNavbar from "@/components/categories-navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="">
        <h1 className="mb-8 text-3xl font-semibold -tracking-wider">
          Productos
        </h1>

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

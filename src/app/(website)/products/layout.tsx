import CategoriesNavbar from "@/components/categories-navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="">
        <h1 className="mb-8 text-3xl font-bold -tracking-wider">
          Mis productos
        </h1>

        <div className="flex gap-10">
          <Suspense
            fallback={
              <div className="mx-auto mb-6 flex h-6 w-1/2 items-center justify-center gap-2">
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

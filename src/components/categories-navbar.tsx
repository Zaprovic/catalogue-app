"use client";
import { cn } from "@/lib/utils";
import { SelectCategoryType } from "@/types";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Badge } from "./ui/badge";

type props = {
  categories: SelectCategoryType[];
};

const CategoriesNavbar = ({ categories: data }: props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const buildUrl = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set("categoryId", categoryId);
    } else {
      params.delete("categoryId");
    }
    const paramString = params.toString();
    return paramString ? `${pathname}?${paramString}` : pathname;
  };

  const url = buildUrl(categoryId);

  return (
    <nav className="sticky left-0 hidden w-auto flex-col gap-3 overflow-hidden xl:flex">
      <h5 className="hidden text-nowrap text-sm font-medium -tracking-widest md:inline-block">
        Filtrar por categorias
      </h5>
      <ul className="hidden flex-col gap-2 md:flex">
        <li>
          <Link href={"/products/"} key={crypto.randomUUID()}>
            <Badge variant={"secondary"} className="py-1">
              TODOS
            </Badge>
          </Link>
        </li>
        {data.map((category) => (
          <li key={category.id}>
            <Link href={`/products?categoryId=${category.id}`}>
              <Badge
                variant={"secondary"}
                className={cn("text-nowrap py-1", {
                  "": categoryId && url.endsWith(categoryId),
                })}
              >
                {category.name}
              </Badge>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoriesNavbar;

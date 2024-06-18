"use client";

import { cn } from "@/lib/utils";
import { SelectCategoryType } from "@/types";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Toggle } from "./ui/toggle";

const CategoriesFilterBtn = ({
  categories,
}: {
  categories: SelectCategoryType[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const onclick = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"secondary"}
            className="flex w-full gap-2 px-4 md:hidden"
          >
            <span className="text-sm font-semibold -tracking-wide">
              Filtrar
            </span>
            <IconAdjustmentsHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-fit">
          <DropdownMenuLabel>Categorias</DropdownMenuLabel>
          <DropdownMenuGroup className="flex flex-col items-start justify-start gap-0">
            <DropdownMenuItem className="w-full">
              <Toggle
                asChild
                aria-label="Toggle All Categories"
                className={cn("w-full font-semibold", {
                  "bg-primary/20 text-primary": pathname === "/products", // Active when on main /products page
                })}
              >
                <Link href="/products" onClick={onclick}>
                  <span className="w-full">TODOS</span>
                </Link>
              </Toggle>
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem key={category.id} className="w-full">
                <Toggle
                  asChild
                  aria-label={`Toggle ${category.name}`}
                  className={cn("w-full font-semibold", {
                    "bg-primary/20 text-primary": pathname.includes(
                      `/products/categories/${category.id}`,
                    ),
                  })}
                >
                  <Link
                    href={`/products/categories/${category.id}`}
                    onClick={onclick}
                  >
                    <span className="w-full">{category.name}</span>
                  </Link>
                </Toggle>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CategoriesFilterBtn;

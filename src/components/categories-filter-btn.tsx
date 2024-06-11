"use client";

import { cn } from "@/lib/utils";
import { SelectCategoryType } from "@/types";
import { IconFilter } from "@tabler/icons-react";
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

  const category = categories.find((category) => {
    return pathname.includes(`/products/categories/${category.id}`);
  });

  return (
    <div className="flex w-full items-center justify-between">
      <h4 className="text-xs font-bold text-primary">{category?.name}</h4>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant={"secondary"} className="flex gap-2 px-4 md:hidden">
            <span className="text-sm font-semibold -tracking-wide">
              Filtrar
            </span>
            <IconFilter />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-fit">
          <DropdownMenuLabel>Categorias</DropdownMenuLabel>
          <DropdownMenuGroup className="flex flex-col items-start gap-0">
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
                    {category.name}
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

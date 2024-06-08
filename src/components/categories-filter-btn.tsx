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
          <Button size={"icon"} variant={"secondary"} className="md:hidden">
            <IconFilter />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-fit">
          <DropdownMenuLabel>Categorias</DropdownMenuLabel>
          <DropdownMenuGroup>
            {categories.map((category) => (
              <DropdownMenuItem key={category.id}>
                <Toggle
                  asChild
                  aria-label={`Toggle ${category.name}`}
                  className="w-full"
                >
                  <Link
                    href={`/products/categories/${category.id}`}
                    onClick={onclick}
                    className={cn("w-full font-semibold", {
                      "bg-primary/20 text-primary": pathname.includes(
                        `/products/categories/${category.id}`,
                      ),
                    })}
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

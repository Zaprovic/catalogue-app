"use client";

import { cn } from "@/lib/utils";
import { SelectProductType } from "@/types";
import {
  IconArrowsSort,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Toggle } from "./ui/toggle";

const SortProductBtn = ({
  products: productProps,
}: {
  products: SelectProductType[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const pathname = usePathname();

  const onclick = () => {
    setIsOpen(false);
  };

  const product = productProps.find((category) => {
    return pathname.includes(`/products/categories/${category.id}`);
  });
  return (
    <div className="flex w-full flex-1 items-center justify-between">
      {/* <h4 className="text-xs font-bold text-primary">{product?.title}</h4> */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"secondary"}
            className="flex w-full gap-2 px-4 md:hidden"
            onClick={() => setProducts(products.toSorted())}
          >
            <span className="text-sm font-semibold -tracking-wide">
              Organizar
            </span>
            <IconArrowsSort />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-fit">
          <DropdownMenuGroup className="flex flex-col items-start gap-0">
            <DropdownMenuItem className="w-full">
              <Toggle
                asChild
                aria-label={`Toggle `}
                className={cn("w-full font-semibold", {
                  "bg-primary/20 text-primary":
                    pathname.includes(`/products/categories`),
                })}
              >
                <Link
                  href={`/products/categories/`}
                  onClick={onclick}
                  className="flex items-center justify-between gap-3"
                >
                  <span>Ascendente</span>
                  <IconSortAscendingLetters />
                </Link>
              </Toggle>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full">
              <Toggle
                asChild
                aria-label={`Toggle `}
                className={cn("w-full font-semibold", {
                  "bg-primary/20 text-primary":
                    pathname.includes(`/products/categories`),
                })}
              >
                <Link
                  href={`/products/categories/`}
                  onClick={onclick}
                  className="flex items-center justify-between gap-3"
                >
                  <span>Descendente</span>
                  <IconSortDescendingLetters />
                </Link>
              </Toggle>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortProductBtn;

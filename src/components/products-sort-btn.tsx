"use client";

import { SortMethods } from "@/types";
import {
  IconSortAscendingLetters,
  IconSortDescendingLetters,
  IconSortDescendingShapes,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const ProductSortBtn = () => {
  const handleClick = (method: SortMethods) => { };

  const arr = [1, 2, 3, 4, 5];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="rounded-md bg-secondary p-1 text-secondary-foreground">
            <IconSortDescendingShapes />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ordenar productos</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex justify-between">
              <span>Ascendente</span>
              <IconSortAscendingLetters />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between">
              <span>Descendente</span>
              <IconSortDescendingLetters />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProductSortBtn;

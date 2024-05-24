"use client";
import { useStoreItems } from "@/store/counter";
import { UserButton } from "@clerk/nextjs";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const ShoppingCartBtn = () => {
  const { items } = useStoreItems();
  return (
    <div className="hidden items-center gap-3 md:flex">
      <Link href={"/cart"} className="relative flex gap-1 rounded-full p-1">
        {items > 0 && (
          <span className="absolute right-0 top-0 grid aspect-square size-4 place-items-center rounded-full bg-blue-600 text-xs">
            {items}
          </span>
        )}
        <IconShoppingCart className="" />
      </Link>
      <UserButton />
      <ThemeToggle />
    </div>
  );
};

export default ShoppingCartBtn;

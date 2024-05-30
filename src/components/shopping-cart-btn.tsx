"use client";
import { useStoreItems } from "@/store/counter";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";

const ShoppingCartBtn = () => {
  const { items } = useStoreItems();
  return (
    <div>
      <Link href={"/cart"} className="relative flex gap-1 rounded-full p-1">
        {items > 0 && (
          <span className="absolute bottom-4 left-5 grid aspect-square size-4 place-items-center rounded-full bg-secondary text-xs font-semibold text-primary">
            {items}
          </span>
        )}
        <IconShoppingCart className="" />
      </Link>
      {/* <UserButton /> */}
      {/* <ThemeToggle /> */}
    </div>
  );
};

export default ShoppingCartBtn;

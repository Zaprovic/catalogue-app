import { UserButton } from "@clerk/nextjs";
import { IconShoppingBag } from "@tabler/icons-react";
import Link from "next/link";
import Navbar from "./navbar/navbar";
import ShoppingCartBtn from "./shopping-cart-btn";
import { ThemeToggle } from "./theme-toggle";

function Header() {
  return (
    <header className="sticky top-0 flex items-center justify-between bg-primary px-5 py-5 lg:px-8">
      <Link href={"/"}>
        <IconShoppingBag width={36} height={36} />
      </Link>

      <div className="flex flex-1 items-center justify-end gap-2 md:flex-row-reverse md:justify-center">
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <UserButton />
        </div>
        <Navbar />
      </div>

      <ShoppingCartBtn />
    </header>
  );
}

export default Header;

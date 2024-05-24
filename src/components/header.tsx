import { UserButton } from "@clerk/nextjs";
import { IconShoppingBag, IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import Navbar from "./navbar/navbar";
import { ThemeToggle } from "./theme-toggle";

async function Header() {
  return (
    <header className="flex items-center justify-between bg-primary-foreground px-5 py-5 lg:px-8">
      <Link href={"/"}>
        <IconShoppingBag width={36} height={36} />
      </Link>

      <div className="flex items-center justify-center gap-2 md:flex-row-reverse">
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <UserButton />
        </div>
        <Navbar />
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <Link href={"/cart"} className="flex gap-1 rounded-full p-1">
          <IconShoppingCart className="" />
        </Link>
        <UserButton />
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;

import { IconShoppingBag } from "@tabler/icons-react";
import Link from "next/link";
import Navbar from "./navbar/navbar";
import { ThemeToggle } from "./theme-toggle";

function Header() {
  return (
    <header className="flex items-center justify-between bg-primary-foreground px-5 py-5 lg:px-8">
      <Link href={"/"}>
        <IconShoppingBag width={36} height={36} />
      </Link>

      <div className="flex items-center justify-center gap-3 md:flex-row-reverse">
        <div className="md:hidden">
          <ThemeToggle />
        </div>
        <Navbar />
      </div>

      <div className="hidden md:inline-block">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;

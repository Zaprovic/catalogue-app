import { IconShoppingBag } from "@tabler/icons-react";
import Link from "next/link";
import Navbar from "./navbar";

function Header() {
  return (
    <header className="flex items-center justify-between bg-primary-foreground px-5 py-5 lg:px-8">
      <div>
        <Link href={"/"}>
          <IconShoppingBag width={36} height={36} />
        </Link>
      </div>

      <Navbar />
    </header>
  );
}

export default Header;

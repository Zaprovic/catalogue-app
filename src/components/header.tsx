import { auth } from "@/auth";
import { IconSearch, IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import NavbarMobile from "./navbar/navbar-mobile";
import ShoppingCartBtn from "./shopping-cart-btn";

async function Header() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-primary px-5 py-5 text-primary-foreground lg:px-8">
      <Link href={"/"}>
        <span className="font-bold">YeseCommerce</span>
      </Link>

      {/* <div className="flex flex-1 items-center justify-end gap-2 md:flex-row-reverse md:justify-center">
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
        </div>
        <Navbar session={session} />
      </div> */}

      <nav>
        <ul className="flex items-center gap-5">
          <li>
            <Link href={"/products"}>
              <IconSearch />
            </Link>
          </li>
          <li>
            <Link href={"/cart"}>
              <IconShoppingCart />
            </Link>
          </li>
          <li>
            <NavbarMobile session={session} />
          </li>
        </ul>
      </nav>

      <ShoppingCartBtn />
    </header>
  );
}

export default Header;

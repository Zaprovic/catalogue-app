import { signInAction, signOutAction } from "@/actions/auth-actions";
import { auth } from "@/auth";
import { IconLogout2, IconMoneybag, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import NavbarMobileTrigger from "./navbar/navbar-mobile-trigger";
import ShoppingCartBtn from "./shopping-cart-btn";
import { Button } from "./ui/button";

async function Header() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-primary px-5 py-5 text-primary-foreground lg:px-8 xl:px-12">
      <div className="flex gap-10 lg:gap-32">
        <Link href={"/"} className="flex gap-2">
          <span className="font-bold">YeseCommerce</span>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex">
          <ul className="flex gap-8 font-semibold">
            <li>
              <Link href={"/"} className="hover:underline">
                Inicio
              </Link>
            </li>
            <li>
              <Link href={"/products"} className="hover:underline">
                Productos
              </Link>
            </li>
            <li>
              <Link href={"/about"} className="hover:underline">
                Contacto
              </Link>
            </li>
            <li>
              <Link href={"/dashboard"} className="hover:underline">
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="hidden items-center gap-3 lg:flex">
        <div className="hidden items-center gap-4 lg:flex">
          {!session && (
            <form action={signInAction}>
              <Button
                className="flex gap-2 hover:bg-primary hover:text-primary-foreground"
                variant={"ghost"}
              >
                <IconUser />
                <span>Iniciar sesion</span>
              </Button>
            </form>
          )}
        </div>

        <ShoppingCartBtn />
        {session && (
          <form action={signOutAction}>
            <Button
              className="flex gap-2 px-0 hover:bg-primary hover:text-primary-foreground"
              variant={"ghost"}
            >
              <IconLogout2 />
              <span>Salir</span>
            </Button>
          </form>
        )}
      </div>

      <nav className="flex items-center gap-4 lg:hidden">
        <ul className="flex items-center gap-4">
          <li>
            <Link href={"/products"}>
              <IconMoneybag />
            </Link>
          </li>
          <li>
            <ShoppingCartBtn />
          </li>

          <li className="lg:hidden">
            <NavbarMobileTrigger session={session} />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

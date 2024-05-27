"use client";
import { useStoreItems } from "@/store/counter";
import { SignOutButton } from "@clerk/nextjs";
import { IconMenu2, IconShoppingCart } from "@tabler/icons-react";
import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import NavbarItem from "./navbar-item";
import { routes } from "./routes";

const NavbarMobile = ({ session }: { session: Session | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useStoreItems();

  const pathname = usePathname();
  const router = useRouter();

  const filteredRoutes = session
    ? routes
    : routes.filter((route) => route.isPublic);

  const onclick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"ghost"} className="lg:hidden">
          <IconMenu2 />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-8 text-start">
          <div className="flex justify-between gap-2">
            <SheetTitle className="text-2xl">Menu</SheetTitle>
          </div>
          <SheetDescription>
            Navigate through the different pages available.
          </SheetDescription>
        </SheetHeader>
        <ul className="flex w-full flex-col items-center justify-center gap-4">
          {filteredRoutes.map((route) => (
            <NavbarItem
              key={route.href}
              active={pathname === route.href}
              onclick={() => onclick(route.href)}
              {...route}
            />
          ))}

          <div className="relative w-full">
            <NavbarItem
              href="/cart"
              active={pathname === "/cart"}
              onclick={() => onclick("/cart")}
              icon={<IconShoppingCart />}
              label="Carrito"
            />
            <span className="absolute left-6 top-0 grid aspect-square size-4 place-items-center rounded-full bg-blue-600 text-xs text-white">
              {items}
            </span>
          </div>

          <li className="w-full rounded-full" onClick={() => onclick("/")}>
            <Button className="w-full" asChild variant={"secondary"}>
              <SignOutButton />
            </Button>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobile;

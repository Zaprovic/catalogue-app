"use client";
import { IconMenu2 } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useMedia } from "react-use";
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

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMedia("(max-width: 768px)", false);
  const pathname = usePathname();
  const router = useRouter();

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
          <SheetTitle className="text-2xl">Menu</SheetTitle>
          <SheetDescription>
            Navigate through the different pages available.
          </SheetDescription>
        </SheetHeader>
        <ul className="flex w-full flex-col items-center justify-center gap-4">
          {routes.map((route) => (
            <NavbarItem
              key={route.href}
              active={pathname === route.href}
              onclick={() => onclick(route.href)}
              {...route}
            />
          ))}
          <li className="w-full rounded-full" onClick={() => onclick("/")}>
            <Button
              className="w-full"
              variant={"secondary"}
              onClick={() => {
                //todo: add clerk authentication
                // signOut({
                //   redirectUrl: "/",
                // });

                onclick("/");
              }}
            >
              Sign Out
            </Button>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobile;

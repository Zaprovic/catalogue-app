"use client";
import {
  IconDashboard,
  IconHome,
  IconInfoCircle,
  IconMenu2,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useMedia } from "react-use";
import NavbarItem from "./navbar-item";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const routes = [
  {
    label: "Home",
    href: "/",
    icon: <IconHome className="lg:hidden" />,
  },
  {
    label: "About",
    href: "/about",
    icon: <IconInfoCircle className="lg:hidden" />,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <IconDashboard className="lg:hidden" />,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMedia("(max-width: 768px)", false);
  const pathname = usePathname();
  const router = useRouter();

  const onclick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
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
  }

  return (
    <nav>
      <ul className="hidden items-center gap-2 md:flex">
        {routes.map((route) => (
          <NavbarItem
            key={route.label}
            {...route}
            active={pathname === route.href}
          />
        ))}
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

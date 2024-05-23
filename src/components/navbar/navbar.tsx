"use client";
import {
  IconDashboard,
  IconHome,
  IconInfoCircle,
  IconSearch,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useMedia } from "react-use";
import { ThemeToggle } from "../theme-toggle";
import NavbarItem from "./navbar-item";
import NavbarMobile from "./navbar-mobile";

const routes = [
  {
    label: "Home",
    href: "/",
    icon: <IconHome className="lg:hidden" />,
  },
  {
    label: "Products",
    href: "/products",
    icon: <IconSearch className="lg:hidden" />,
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
  const isMobile = useMedia("(max-width: 768px)", false);
  const pathname = usePathname();

  if (isMobile) return <NavbarMobile />;

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

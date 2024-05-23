"use client";
import { usePathname } from "next/navigation";
import { useMedia } from "react-use";
import { ThemeToggle } from "../theme-toggle";
import NavbarItem from "./navbar-item";
import NavbarMobile from "./navbar-mobile";
import { routes } from "./routes";

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

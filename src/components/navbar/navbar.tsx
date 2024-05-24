"use client";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useMedia } from "react-use";
import NavbarItem from "./navbar-item";
import NavbarMobile from "./navbar-mobile";
import { routes } from "./routes";

const Navbar = () => {
  const isMobile = useMedia("(max-width: 768px)", false);
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  const filteredRoutes = isSignedIn
    ? routes
    : routes.filter((route) => route.isPublic);

  if (isMobile) return <NavbarMobile />;

  return (
    <nav>
      <ul className="hidden items-center gap-2 md:flex">
        {filteredRoutes.map((route) => (
          <NavbarItem
            key={route.label}
            active={pathname === route.href}
            {...route}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

"use client";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { useMedia } from "react-use";
import NavbarItem from "./navbar-item";
import NavbarMobile from "./navbar-mobile-trigger";
import { routes } from "./routes";

const Navbar = ({ session }: { session: Session | null }) => {
  const isMobile = useMedia("(max-width: 768px)", false);
  const pathname = usePathname();

  const filteredRoutes = session
    ? routes
    : routes.filter((route) => route.isPublic);

  if (isMobile) return <NavbarMobile session={session} />;

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

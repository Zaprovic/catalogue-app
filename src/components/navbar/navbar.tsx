"use client";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useMedia } from "react-use";
import NavbarItem from "./navbar-item";
import NavbarMobile from "./navbar-mobile";
import { routes } from "./routes";

const Navbar = () => {
  const isMobile = useMedia("(max-width: 768px)", false);
  const pathname = usePathname();
  const [isPublic, setIsPublic] = useState(true);

  const { isSignedIn } = useUser();

  // console.log(isSignedIn);

  if (isMobile) return <NavbarMobile />;

  return (
    <nav>
      <ul className="hidden items-center gap-2 md:flex">
        {routes.map((route) => (
          <NavbarItem
            key={route.label}
            {...route}
            active={pathname === route.href}
            // isPublic={route.isPublic !== isSignedIn}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

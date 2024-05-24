import {
  IconDashboard,
  IconHome,
  IconInfoCircle,
  IconSearch,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useMedia } from "react-use";
import NavbarItem from "./navbar-item";

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

const NavbarDesktop = () => {
  const isMobile = useMedia("(max-width: 768px)", false);
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <nav>
        <ul className="hidden items-center gap-2 md:flex">
          {routes.map((route) => (
            <NavbarItem
              key={route.label}
              {...route}
              active={pathname === route.href}
            />
          ))}
        </ul>
      </nav>
      <div>NavbarDesktop</div>
    </>
  );
};

export default NavbarDesktop;

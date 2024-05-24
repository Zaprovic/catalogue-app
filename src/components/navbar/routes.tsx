import {
  IconHome,
  IconInfoCircle,
  IconLayoutDashboard,
  IconSearch,
  IconShoppingCartCheck,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";

export const routes = [
  {
    label: "Inicio",
    href: "/",
    icon: <IconHome className="lg:hidden" />,
    isPublic: true,
  },

  {
    label: "Productos",
    href: "/products",
    icon: <IconSearch className="lg:hidden" />,
    isPublic: true,
  },
  {
    label: "Contacto",
    href: "/about",
    icon: <IconInfoCircle className="lg:hidden" />,
    isPublic: true,
  },
  {
    label: "Carrito",
    href: "/cart",
    icon: <IconShoppingCartCheck className="" />,
    isPublic: true,
  },
  {
    label: "Crear producto",
    href: "/register",
    icon: <IconSquareRoundedPlus className="lg:hidden" />,
    isPublic: false,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <IconLayoutDashboard className="lg:hidden" />,
    isPublic: false,
  },
];

import {
  IconHome,
  IconInfoCircle,
  IconSearch,
  IconShoppingCartCheck,
} from "@tabler/icons-react";

export const routes = [
  {
    label: "Inicio",
    href: "/",
    icon: <IconHome className="lg:hidden" />,
  },
  {
    label: "Productos",
    href: "/products",
    icon: <IconSearch className="lg:hidden" />,
  },
  {
    label: "Contacto",
    href: "/about",
    icon: <IconInfoCircle className="lg:hidden" />,
  },
  {
    label: "Carrito",
    href: "/cart",
    icon: <IconShoppingCartCheck className="" />,
  },
];

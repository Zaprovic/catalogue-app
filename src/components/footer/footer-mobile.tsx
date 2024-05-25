"use client";
import { useUser } from "@clerk/nextjs";
import {
  IconBrandDeliveroo,
  IconBrandWhatsapp,
  IconCash,
  IconMail,
  IconShoppingBagEdit,
  IconTransactionDollar,
} from "@tabler/icons-react";
import { ReactNode } from "react";
import { Separator } from "../ui/separator";
import FooterItem from "./footer-item";

const FooterMobile = ({ children }: { children?: ReactNode }) => {
  const { user } = useUser();

  return (
    <footer className="grid grid-cols-1 bg-secondary p-6 md:px-10">
      <FooterItem title="Formas de pago">
        <li className="flex gap-3">
          <IconTransactionDollar />
          <span>Transferencia bancaria</span>
        </li>
        <li className="flex gap-3">
          <IconCash />
          <span>Dinero en efectivo</span>
        </li>
      </FooterItem>

      <Separator className="mx-auto my-4" />
      <FooterItem title="Metodo de envio">
        <li className="flex gap-3">
          <IconBrandDeliveroo />
          <span>Entrega a domicilio</span>
        </li>
        <li className="flex gap-3">
          <IconShoppingBagEdit />
          <span>Recogida en tienda</span>
        </li>
      </FooterItem>

      <Separator className="mx-auto my-4" />
      <FooterItem title="Contacto">
        <li className="flex gap-3">
          <IconMail />
          <span>{user?.emailAddresses[0].emailAddress}</span>
        </li>
        <li className="flex gap-3">
          <IconBrandWhatsapp />
          <span>+57 3053925741</span>
        </li>
      </FooterItem>
      <Separator className="mx-auto my-4" />
      <FooterItem title="Seguridad" />
    </footer>
  );
};

export default FooterMobile;

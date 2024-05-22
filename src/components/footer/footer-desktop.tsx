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

const FooterDesktop = ({ children }: { children?: ReactNode }) => {
  return (
    <footer className="flex bg-secondary p-8 text-sm">
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
      <Separator orientation="vertical" className="mx-4 h-auto" />

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

      <Separator orientation="vertical" className="mx-4 h-auto" />

      <FooterItem title="Contacto">
        <li className="flex gap-3">
          <IconMail />
          <span>yese-jacobo@hotmail.com</span>
        </li>
        <li className="flex gap-3">
          <IconBrandWhatsapp />
          <span>+57 3053925741</span>
        </li>
      </FooterItem>

      <Separator orientation="vertical" className="mx-4 h-auto" />
      <FooterItem title="Seguridad" />
    </footer>
  );
};

export default FooterDesktop;

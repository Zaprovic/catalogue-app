import { cn } from "@/lib/utils";
import Link from "next/link";
import { DetailedHTMLProps, LiHTMLAttributes } from "react";
import { Button } from "./ui/button";

interface props
  extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  href: string;
  active?: boolean;
  icon: JSX.Element;
  label: string;
  onclick?: (path: string) => void;
}

const NavbarItem = ({
  href,
  active,
  icon,
  label,
  onclick,
  ...props
}: props) => {
  return (
    <li className="w-full" {...props}>
      <Button
        asChild
        variant={"ghost"}
        className={cn(
          "flex w-full items-center justify-start rounded-lg px-3 md:rounded-xl",
          {
            "bg-muted-foreground/20": active,
          },
        )}
        onClick={() => onclick && onclick(href)}
      >
        <Link href={href} className="flex gap-2">
          {icon}
          <span className="font-bold md:hidden lg:block">{label}</span>
        </Link>
      </Button>
    </li>
  );
};

export default NavbarItem;
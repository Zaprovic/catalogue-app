import { cn } from "@/lib/utils";
import Link from "next/link";
import { DetailedHTMLProps, LiHTMLAttributes } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface props
  extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  href: string;
  active?: boolean;
  icon: JSX.Element;
  label: string;
  isPublic?: boolean;
  onclick?: (path: string) => void;
}

const NavbarItem = ({
  href,
  active,
  icon,
  label,
  isPublic,
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
            "bg-secondary/80 md:bg-secondary/10": active,
          },
        )}
        onClick={() => onclick && onclick(href)}
      >
        <Link href={href} className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>{icon}</TooltipTrigger>
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="font-bold md:hidden lg:block">{label}</span>
        </Link>
      </Button>
    </li>
  );
};

export default NavbarItem;

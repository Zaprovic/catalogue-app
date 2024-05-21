import { IconFilter } from "@tabler/icons-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const CategoriesNavbar = () => {
  return (
    // todo: tweak properly the 'hidden' class if there are more categories
    <nav className="mb-5 flex w-full justify-end md:justify-center">
      <Button size={"icon"} variant={"secondary"} className="md:hidden">
        <IconFilter />
      </Button>
      <ul className="hidden gap-2  md:flex">
        <li>
          <Badge variant={"secondary"} className="py-1 hover:cursor-pointer">
            Desmaquillador
          </Badge>
        </li>
        <li>
          <Badge variant={"secondary"} className="py-1 hover:cursor-pointer">
            Protector solar
          </Badge>
        </li>
        <li>
          <Badge variant={"secondary"} className="py-1 hover:cursor-pointer">
            Limpiadoras
          </Badge>
        </li>
      </ul>
    </nav>
  );
};

export default CategoriesNavbar;

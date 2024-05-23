import { db } from "@/db/main";
import { CategoryTable } from "@/db/schema";
import { IconFilter } from "@tabler/icons-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Toggle } from "./ui/toggle";

const CategoriesFilterBtn = async () => {
  const categories = await db.select().from(CategoryTable).all();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"secondary"} className="md:hidden">
          <IconFilter />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-fit">
        <DropdownMenuLabel>Categorias</DropdownMenuLabel>
        <DropdownMenuGroup>
          {categories.map((category) => (
            <DropdownMenuItem key={category.id}>
              <Toggle aria-label={`Toggle ${category.name}`} className="w-full">
                <span>{category.name}</span>
              </Toggle>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoriesFilterBtn;

import { db } from "@/db/main";
import { CategoryTable } from "@/db/schema";
import { IconFilter } from "@tabler/icons-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const CategoriesNavbar = async () => {
  const categories = await db.select().from(CategoryTable).all();

  return (
    // todo: tweak properly the 'hidden' class if there are more categories
    <nav className="mb-5 flex w-full justify-end md:justify-center">
      <Button size={"icon"} variant={"secondary"} className="md:hidden">
        <IconFilter />
      </Button>
      <ul className="hidden gap-2 md:flex">
        {categories.map((category) => (
          <li key={category.id}>
            <Badge variant={"secondary"} className="py-1 hover:cursor-pointer">
              {category.name}
            </Badge>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoriesNavbar;

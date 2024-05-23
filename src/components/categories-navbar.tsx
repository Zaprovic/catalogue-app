"use client";
import useFetch from "@/hooks/useFetch";
import { SelectCategoryType } from "@/types";
import { IconFilter } from "@tabler/icons-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type props = {
  onclick: () => void;
};

const CategoriesNavbar = ({ onclick }: props) => {
  // const categories = await db.select().from(CategoryTable).all();

  const { data } = useFetch<SelectCategoryType[]>("/api/categories");

  return (
    // todo: tweak properly the 'hidden' class if there are more categories
    <nav className="mb-5 flex w-full justify-end md:justify-center">
      <Button size={"icon"} variant={"secondary"} className="md:hidden">
        <IconFilter />
      </Button>
      <ul className="hidden gap-2 md:flex">
        {data &&
          data.map((category) => (
            <li key={category.id}>
              <>
                <Badge
                  variant={"secondary"}
                  className="py-1 hover:cursor-pointer"
                  onClick={() => onclick()}
                >
                  {category.name}
                </Badge>
              </>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default CategoriesNavbar;

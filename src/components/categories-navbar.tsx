import { db } from "@/db/main";
import { CategoryTable } from "@/db/schema";
import { SelectCategoryType } from "@/types";
import Link from "next/link";
import { Badge } from "./ui/badge";

const CategoriesNavbar = async () => {
  const data = await db.select().from(CategoryTable).all();

  let categories: SelectCategoryType[] = [];
  try {
    const response = await fetch("http:localhost:3000/api/categories");
    if (response.ok) {
      categories = await response.json();
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  return (
    // todo: tweak properly the 'hidden' class if there are more categories
    <nav className="mb-5 flex">
      {/* <CategoriesFilterBtn /> */}
      <ul className="hidden flex-col gap-2 md:flex">
        <li>
          <Link href={"/products/"} key={crypto.randomUUID()}>
            <Badge variant={"secondary"} className="py-1">
              All
            </Badge>
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/products/categories/${category.id}`}>
              <Badge variant={"secondary"} className="py-1">
                {category.name}
              </Badge>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoriesNavbar;

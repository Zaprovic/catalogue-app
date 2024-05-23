import { db } from "@/db/main";
import { CategoryTable } from "@/db/schema";
import Link from "next/link";
import { Badge } from "./ui/badge";

const CategoriesNavbar = async () => {
  const data = await db.select().from(CategoryTable).all();

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
        {data.map((category) => (
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

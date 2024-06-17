import { db } from "@/db/main";
import { CategoryTable, ProductCategoryTable, ProductTable } from "@/db/schema";
import { SelectCategoryType } from "@/types";
import { eq, sql } from "drizzle-orm";
import Link from "next/link";

type props = SelectCategoryType & {
  src?: string;
};

const CategoryImage = async ({ id, name, src }: props) => {
  const categoryCount = await db
    .select({
      name: CategoryTable.name,
      productCount: sql`COUNT(${ProductTable.id})`,
    })
    .from(CategoryTable)
    .innerJoin(
      ProductCategoryTable,
      eq(CategoryTable.id, ProductCategoryTable.categoryId),
    )
    .innerJoin(
      ProductTable,
      eq(ProductCategoryTable.productId, ProductTable.id),
    )
    .groupBy(CategoryTable.id, CategoryTable.name)
    .execute();

  const count = categoryCount.find((item) => item.name === name);

  return (
    <figure className="relative grid h-full w-full place-content-center">
      <div className="">
        <figcaption className="absolute -translate-x-1/2 -translate-y-1/2">
          <span className="font-semibold -tracking-wider text-primary">
            {count?.productCount as number} productos
          </span>
          <h5 className="text-lg font-bold uppercase -tracking-wider text-zinc-500 md:text-base">
            {name}
          </h5>
          <Link
            href={`/products/categories/${id}`}
            className="text-sm font-medium -tracking-wider text-zinc-600 hover:underline"
          >
            Buscar productos
          </Link>
        </figcaption>
      </div>
    </figure>
  );
};

export default CategoryImage;

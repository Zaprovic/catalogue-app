import { db } from "@/db/main";
import { CategoryTable, ProductCategoryTable, ProductTable } from "@/db/schema";
import { SelectCategoryType } from "@/types";
import { eq, sql } from "drizzle-orm";
import Image from "next/image";
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
    <figure className="relative w-full">
      <Image
        src={src ?? ""}
        alt={name}
        width={437}
        height={395}
        quality={100}
        className="h-auto w-full rounded-lg object-contain object-center"
      />
      <figcaption className="absolute left-4 top-4">
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
    </figure>
  );
};

export default CategoryImage;

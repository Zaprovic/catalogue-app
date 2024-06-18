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
    <figure className="overflow-hidden">
      <Image
        src={src ?? "/images/home/mobile/default.jpg"}
        alt={name}
        width={256}
        height={342}
        quality={100}
        className="object-contain"
      />
      <figcaption className="flex flex-col gap-2 p-3">
        <span className="font-semibold -tracking-wider text-primary dark:text-card">
          {count?.productCount as number} productos
        </span>

        <div className="flex flex-col gap-1">
          <h5 className="text-sm font-bold uppercase -tracking-wider">
            {name}
          </h5>
          <Link
            href={`/products/categories/${id}`}
            className="text-sm font-medium -tracking-wider hover:underline"
          >
            Buscar productos
          </Link>
        </div>
      </figcaption>
    </figure>
  );
};

export default CategoryImage;

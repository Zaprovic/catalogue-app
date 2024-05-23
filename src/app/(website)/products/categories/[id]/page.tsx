import ProductCard from "@/components/product-card";
import { db } from "@/db/main";
import { CategoryTable, ProductCategoryTable, ProductTable } from "@/db/schema";
import style from "@/styles.module.css";
import { eq } from "drizzle-orm";

export const revalidate = 0;

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const categories = await db
    .select({
      categoryName: CategoryTable.name,
    })
    .from(CategoryTable)
    .where(eq(CategoryTable.id, +id));

  const products = await db.select().from(ProductTable).all();

  const productCategories = await db
    .select({
      productId: ProductCategoryTable.productId,
      categoryId: ProductCategoryTable.categoryId,
      productName: ProductTable.title,
      categoryName: CategoryTable.name,
      productPrice: ProductTable.price,
      productDescription: ProductTable.description,
      productSpecification: ProductTable.specification,
      productBrand: ProductTable.brand,
      productImage: ProductTable.image,
    })
    .from(ProductCategoryTable)
    .leftJoin(ProductTable, eq(ProductTable.id, ProductCategoryTable.productId))
    .innerJoin(
      CategoryTable,
      eq(CategoryTable.id, ProductCategoryTable.categoryId),
    )
    .where(eq(CategoryTable.id, +id));

  console.log(productCategories);

  return (
    <div className="flex w-full flex-col">
      <section className="mx-auto w-full max-w-[1000px]">
        <div className={`${style.productContainer} w-full place-items-center`}>
          {productCategories.length > 0 ? (
            productCategories.map((product) => (
              <ProductCard
                key={product.productId}
                id={product.productId.toString()}
                title={product.productName ?? ""}
                description={product.productDescription ?? ""}
                image={product.productImage}
                price={product.productPrice ?? 0}
              />
            ))
          ) : (
            <span className="flex w-full justify-start text-sm font-bold -tracking-wider">
              No se encontraron productos
            </span>
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;

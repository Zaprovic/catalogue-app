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
      productBrand: ProductTable.brand,
      productImage: ProductTable.image,
      productDiscountPercentage: ProductTable.discountPercentage,
      userId: ProductTable.userId,
    })
    .from(ProductCategoryTable)
    .leftJoin(ProductTable, eq(ProductTable.id, ProductCategoryTable.productId))
    .innerJoin(
      CategoryTable,
      eq(CategoryTable.id, ProductCategoryTable.categoryId),
    )
    .where(eq(CategoryTable.id, +id));

  return (
    <div className="flex w-full flex-col">
      <section className="mx-auto w-full">
        <h4 className="my-4 text-xl font-semibold md:my-0 md:mb-5">
          {categories[0].categoryName}
        </h4>
        <div className={`${style.productContainer} w-full place-items-center`}>
          {productCategories.length > 0 ? (
            productCategories.map((product) => (
              <ProductCard
                key={product.productId}
                id={product.productId}
                userId={product.userId ?? ""}
                title={product.productName ?? ""}
                description={product.productDescription ?? ""}
                image={product.productImage}
                price={product.productPrice ?? 0}
                brand={product.productBrand}
                discountPercentage={product.productDiscountPercentage}
              />
            ))
          ) : (
            <span className="flex w-full justify-start text-sm font-semibold -tracking-wider">
              No se encontraron productos
            </span>
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;

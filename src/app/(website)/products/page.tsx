import SearchbarProducts from "@/components/searchbar-products";
import { db } from "@/db/main";
import { CategoryTable, ProductCategoryTable, ProductTable } from "@/db/schema";
import { SelectProductType } from "@/types";
import { asc, eq } from "drizzle-orm";
import ProductListAll from "./(components)/product-list-all";

export const revalidate = 0;

type props = {
  searchParams: { categoryId: string; productName: string };
};

export default async function ProductPage({ searchParams }: props) {
  const { categoryId, productName } = searchParams;

  const products = await db.select().from(ProductTable);

  const categories = await db.select().from(CategoryTable).all();

  const productsByCategory = (
    await db
      .select({
        id: ProductTable.id,
        categoryId: ProductCategoryTable.categoryId,
        title: ProductTable.title,
        price: ProductTable.price,
        discountPercentage: ProductTable.discountPercentage,
        description: ProductTable.description,
        brand: ProductTable.brand,
        userId: ProductTable.userId,
        image: ProductTable.image,
        isAvailable: ProductTable.isAvailable,
      })
      .from(ProductCategoryTable)
      .innerJoin(
        ProductTable,
        eq(ProductTable.id, ProductCategoryTable.productId),
      )
      .orderBy(asc(ProductTable.title))
  )
    .filter((p) => p.categoryId === Number(categoryId))
    .map(({ categoryId, ...rest }) => rest);

  const filterByName = (product: SelectProductType) =>
    !productName ||
    product.title.toLowerCase().includes(productName.toLowerCase());

  const filteredProducts = productsByCategory.filter(filterByName);
  const allFilteredProducts = products.filter(filterByName);

  const productsToShow = categoryId ? filteredProducts : allFilteredProducts;

  return (
    <div className="flex flex-1 gap-10 overflow-y-scroll">
      <section className="mx-auto w-full">
        <ProductListAll
          products={products}
          categories={categories}
          categoryId={Number(categoryId)}
          productName={productName}
        />
      </section>
    </div>
  );
}

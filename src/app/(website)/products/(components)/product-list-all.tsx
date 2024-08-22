import ProductCard from "@/components/product-card";
import { db } from "@/db/main";
import { ProductCategoryTable, ProductTable } from "@/db/schema";
import style from "@/styles.module.css";
import { SelectCategoryType, SelectProductType, SortMethods } from "@/types";
import { asc, eq } from "drizzle-orm";

type props = {
  products: SelectProductType[];
  categories: SelectCategoryType[];
  categoryId: number | undefined | null;
  productName: string | undefined | null;
  sortMethod?: SortMethods;
};

const ProductListAll = async ({
  categoryId,
  productName,
  products,
  categories,
}: props) => {
  // const products = await db.select().from(ProductTable);
  // .orderBy(asc(ProductTable.title));

  // const categories = await db.select().from(CategoryTable).all();

  const category = categories.find((c) => c.id === Number(categoryId));
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
    <>
      <h4 className="my-4 text-balance bg-background text-base font-semibold md:my-0 md:pb-5 md:text-xl">
        {category
          ? `${category.name} (${productsToShow.length} productos)`
          : `TODOS LOS PRODUCTOS (${productsToShow.length} productos)`}
      </h4>
      <div className={`${style.productContainer} w-full place-items-center`}>
        {productsToShow.length === 0 ? (
          <span className="w-full text-sm -tracking-wider">
            No hay coincidencias
          </span>
        ) : (
          productsToShow.map((product) => (
            <ProductCard key={product.id} {...product} isAvailable />
          ))
        )}
      </div>
    </>
  );
};

export default ProductListAll;

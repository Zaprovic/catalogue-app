import ProductCard from "@/components/product-card";
import { db } from "@/db/main";
import { CategoryTable, ProductCategoryTable, ProductTable } from "@/db/schema";
import style from "@/styles.module.css";
import { SelectProductType } from "@/types";
import { asc, eq } from "drizzle-orm";

type props = {
  categoryId: number | undefined | null;
  productName: string | undefined | null;
};

const ProductListAll = async ({ categoryId, productName }: props) => {
  /**
   * 
  // const [products, setProducts] = useState<SelectProductType[]>([]);
  // const [categories, setCategories] = useState<SelectCategoryType[]>([]);
  // const [loading, setLoading] = useState(true);

  // const searchParams = useSearchParams();
  // const categoryID = searchParams.get("categoryId");

  // const category = categories?.find((c) => c.id === Number(categoryID));

  // const categories = categoriesQuery.data as SelectCategoryType[];
  // const products = productsQuery.data as SelectProductType[];

  // useEffect(() => {
  //   const fetchAll = async () => {
  //     try {
  //       const productFetch = categoryID
  //         ? fetch(`/api/products?categoryId=${categoryID}`)
  //         : fetch(`/api/products`);

  //       const categoryFetch = fetch(`/api/categories`);

  //       const [productResponse, categoryResponse] = await Promise.all([
  //         productFetch,
  //         categoryFetch,
  //       ]);

  //       if (!productResponse.ok) {
  //         throw new Error("Failed to fetch products");
  //       }

  //       if (!categoryResponse.ok) {
  //         throw new Error("Failed to fetch categories");
  //       }

  //       const productsData: SelectProductType[] = await productResponse.json();
  //       const categoriesData: SelectCategoryType[] =
  //         await categoryResponse.json();

  //       setProducts(productsData);
  //       setCategories(categoriesData);

  //       console.log(categoriesData);
  //     } catch (error) {
  //       throw new Error("Error fetching data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAll();
  // }, [categoryID]);
   */

  const products = await db
    .select()
    .from(ProductTable)
    .orderBy(asc(ProductTable.title));

  const categories = await db.select().from(CategoryTable).all();
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
        {productsToShow.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </>
  );
};

export default ProductListAll;

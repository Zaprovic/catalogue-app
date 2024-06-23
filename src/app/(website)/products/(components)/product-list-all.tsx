"use client";
import ProductCard from "@/components/product-card";
import { useProducts } from "@/hooks/useProducts";
import style from "@/styles.module.css";
import { SelectCategoryType, SelectProductType } from "@/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type props = {
  categoryId?: number;
};

const ProductListAll = () => {
  // const [products, setProducts] = useState<SelectProductType[]>([]);
  // const [categories, setCategories] = useState<SelectCategoryType[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const categoryID = searchParams.get("categoryId");
  const { categoriesQuery, productsQuery } = useProducts(categoryID);

  const categories = categoriesQuery.data as SelectCategoryType[];
  const products = productsQuery.data as SelectProductType[];

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

  const category = categories?.find((c) => c.id === Number(categoryID));

  return (
    <>
      {productsQuery.isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <h4 className="my-4 bg-background text-xl font-semibold md:my-0 md:pb-5">
            {category ? category.name : "TODOS LOS PRODUCTOS"}
          </h4>
          <div
            className={`${style.productContainer} w-full place-items-center`}
          >
            {products.map((product) => (
              <ProductCard key={product.id + Math.random()} {...product} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ProductListAll;

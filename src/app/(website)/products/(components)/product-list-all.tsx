"use client";
import ProductCard from "@/components/product-card";
import style from "@/styles.module.css";
import { SelectCategoryType, SelectProductType } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type props = {
  categoryId?: number;
};

const ProductListAll = () => {
  // const products = await getProducts();
  const [products, setProducts] = useState<SelectProductType[]>([]);
  const [categories, setCategories] = useState<SelectCategoryType[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const categoryID = searchParams.get("categoryId");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = categoryID
          ? await fetch(`/api/products?categoryId=${categoryID}`)
          : await fetch(`/api/products`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: SelectProductType[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAll = async () => {
      try {
        const productFetch = categoryID
          ? fetch(`/api/products?categoryId=${categoryID}`)
          : fetch(`/api/products`);

        const categoryFetch = fetch(`/api/categories`);

        const [productResponse, categoryResponse] = await Promise.all([
          productFetch,
          categoryFetch,
        ]);

        if (!productResponse.ok) {
          throw new Error("Failed to fetch products");
        }

        if (!categoryResponse.ok) {
          throw new Error("Failed to fetch categories");
        }

        const productsData: SelectProductType[] = await productResponse.json();
        const categoriesData: SelectCategoryType[] =
          await categoryResponse.json();

        setProducts(productsData);
        setCategories(categoriesData);

        console.log(categoriesData);
      } catch (error) {
        throw new Error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [categoryID]);

  const category = categories.find((c) => c.id === Number(categoryID));

  return (
    <>
      {loading ? (
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

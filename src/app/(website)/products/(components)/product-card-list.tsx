"use client";
import ProductCard from "@/components/product-card";
import { useStoreItems } from "@/store/counter";

import style from "@/styles.module.css";
import { SelectProductType } from "@/types";

const ProductCardList = ({ products }: { products: SelectProductType[] }) => {
  const filteredProducts = useStoreItems((state) => state.filteredProducts);

  return (
    <div className={`${style.productContainer} w-full place-items-center`}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductCardList;

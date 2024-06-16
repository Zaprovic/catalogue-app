"use client";
import ProductCard from "@/components/product-card";
import { useStoreItems } from "@/store/counter";

import style from "@/styles.module.css";

const ProductCardList = () => {
  const filteredProducts = useStoreItems((state) => state.filteredProducts);

  return (
    <div className={`${style.productContainer} w-full place-items-center`}>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductCardList;

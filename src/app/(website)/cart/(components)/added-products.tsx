/* eslint-disable @next/next/no-img-element */
"use client";

import ProductCard from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { calculatePriceWithDiscount, cn, formatPricetoCOP } from "@/lib/utils";
import { useStoreItems } from "@/store/counter";
import styles from "@/styles.module.css";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";

const AddedProducts = () => {
  const cartItems = useStoreItems((state) => state.cartItems);
  const removeFromCart = useStoreItems((state) => state.removeFromCart);

  return (
    <>
      <div
        className={cn("flex flex-1 justify-center", {
          "flex-1 justify-start": cartItems.length === 0,
        })}
      >
        {cartItems.length > 0 ? (
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cartItems.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </section>
        ) : (
          <div className="flex flex-col gap-3">
            <p>Aun no tienes productos en el carrito</p>
            <Button asChild className="w-fit text-sm font-bold -tracking-wider">
              <Link href={"/products"}>Agregar productos</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default AddedProducts;

/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatPricetoCOP } from "@/lib/utils";
import { useStoreItems } from "@/store/counter";
import styles from "@/styles.module.css";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";

const AddedProducts = () => {
  const cartItems = useStoreItems((state) => state.cartItems);
  const removeFromCart = useStoreItems((state) => state.removeFromCart);

  return (
    <div
      className={cn("flex flex-1 justify-center", {
        "flex-1 justify-start": cartItems.length === 0,
      })}
    >
      {cartItems.length > 0 ? (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cartItems.map((product) => (
            <Card key={product.id} className="relative h-full max-w-[240px]">
              <CardHeader className="flex items-center justify-between py-5">
                <CardTitle className="text-pretty text-start -tracking-wider">
                  {product.title}
                </CardTitle>
                <Button
                  asChild
                  size={"icon"}
                  className="absolute right-2 top-1 h-4 w-4 p-[0.15rem] hover:cursor-pointer"
                  onClick={() => removeFromCart(product.id)}
                >
                  <IconX width={4} height={4} strokeWidth={4} />
                </Button>
              </CardHeader>
              <CardContent className="w-full flex-1 px-5 pb-2">
                <div className="h-full w-full">
                  <figure className="overflow-hidden rounded-lg">
                    <img
                      src={product.image ?? ""}
                      alt={"Product Image"}
                      width={200}
                      height={200}
                      className="aspect-square h-full w-full overflow-hidden rounded-lg"
                    />
                  </figure>
                  <CardDescription
                    className={`${styles.cardDescription} mt-3 line-clamp-2`}
                  >
                    {product.description}
                  </CardDescription>
                  <h4 className="my-3 text-lg font-bold">
                    {formatPricetoCOP(product.price)}
                  </h4>
                </div>
                {/* <CardFooter className="flex w-full flex-col items-center justify-center gap-3 p-0">
              <AddCartBtn {...product} />
              <Button className="w-full" variant={"link"}>
                Mas informacion
              </Button>
            </CardFooter> */}
              </CardContent>
            </Card>
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
  );
};

export default AddedProducts;

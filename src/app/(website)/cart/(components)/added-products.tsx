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
import { formatPricetoCOP } from "@/lib/utils";
import { useStoreItems } from "@/store/counter";
import styles from "@/styles.module.css";
import { IconX } from "@tabler/icons-react";

const AddedProducts = () => {
  const cartItems = useStoreItems((state) => state.cartItems);
  const removeFromCart = useStoreItems((state) => state.removeFromCart);

  return (
    <div>
      <h2 className="py-4">Productos agregados</h2>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cartItems.map((product) => (
          <Card key={product.id} className="relative h-full max-w-[240px]">
            <CardHeader className="flex items-center justify-between p-5">
              <CardTitle className="text-pretty -tracking-wider">
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
    </div>
  );
};

export default AddedProducts;

/* eslint-disable @next/next/no-img-element */
import { calculatePriceWithDiscount, cn, formatPricetoCOP } from "@/lib/utils";
import styles from "@/styles.module.css";
import { SelectProductType } from "@/types";
import Link from "next/link";
import AddCartBtn from "./add-cart-btn";
import { Button } from "./ui/button";
import {Badge} from "./ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const ProductCard = (product: SelectProductType) => {
  const formattedPrice = formatPricetoCOP(product.price);

  return (
    <Card className="relative h-full max-w-[320px] bg-card/15">
      <CardHeader className="p-5">
        <CardTitle className="line-clamp-1 text-pretty text-sm -tracking-wider">
          {product.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full px-5 pb-2">
        <Link href={`/products/${product.id}`} className="h-full w-full">
          <figure className="bg-card/30">
            <img
              src={product.image ?? ""}
              alt={"Product Image"}
              width={50}
              height={50}
              className="aspect-square h-auto w-full object-contain"
            />
          </figure>
          <h6 className="mt-3 font-bold text-primary opacity-45">
            {product.brand}
          </h6>
          <CardDescription
            className={`${styles.cardDescription} mt-3 line-clamp-2`}
          >
            {product.description}
          </CardDescription>
          <div className="flex items-center gap-4">
            <h4
              className={cn("my-3 text-lg font-bold", {
                "text-sm text-primary line-through":
                  product.discountPercentage !== 0,
              })}
            >
              {formattedPrice}
            </h4>

            {product.discountPercentage !== 0 && (
              <h4 className="my-3 text-lg font-bold">
                {product.discountPercentage &&
                  calculatePriceWithDiscount(
                    product.price,
                    product.discountPercentage,
                  )}
              </h4>
            )}
          </div>
          {product.discountPercentage !== 0 && (
            <Badge className="absolute right-3 hover:bg-secondary-foreground top-12 grid aspect-square place-items-center rounded-xl text-base bg-secondary-foreground p-1">
              
                {product.discountPercentage}%
              
            </Badge>

            

            )}
        </Link>
        <CardFooter className="flex w-full flex-col items-center justify-center gap-3 p-0">
          <AddCartBtn {...product} />
          <Button className="w-full" variant={"link"}>
            <Link href={`/products/${product.id}`}>Mas informacion</Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

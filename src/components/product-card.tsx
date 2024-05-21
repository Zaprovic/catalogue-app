/* eslint-disable @next/next/no-img-element */
import { IconShoppingCart } from "@tabler/icons-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const ProductCard = () => {
  return (
    <Card className="h-auto max-w-[320px]">
      <CardHeader className="p-5">
        <CardTitle>Product Title</CardTitle>
        <CardDescription>Product Description</CardDescription>
      </CardHeader>
      <CardContent className="px-5 pb-2">
        <figure className="overflow-hidden rounded-lg">
          <img
            src={"/images/perfume.jpg"}
            alt={"Product Image"}
            width={200}
            height={200}
            className="w-full"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <h4 className="my-3 text-lg font-bold">$100.00</h4>
        <CardFooter className="flex w-full flex-col items-center justify-center gap-3 p-0">
          <Button className="flex w-full gap-3 py-3">
            <IconShoppingCart />
            <span>Add to cart</span>
          </Button>
          <Button className="w-full" variant={"link"}>
            More information
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

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

type props = {
  title: string;
  description: string | null;
  image: string | null;
  price: number;
};

const ProductCard = ({ description, image, price, title }: props) => {
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    currency: "COP",
    style: "currency",
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <Card className="h-full w-full max-w-[340px] flex-col">
      <CardHeader className="p-5">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="w-full flex-1 px-5 pb-2">
        <figure className="overflow-hidden rounded-lg">
          <img
            src={image ?? ""}
            alt={"Product Image"}
            width={200}
            height={200}
            className="w-full"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <h4 className="my-3 text-lg font-bold">{formattedPrice}</h4>
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

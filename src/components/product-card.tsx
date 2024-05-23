/* eslint-disable @next/next/no-img-element */
import { formatPricetoCOP } from "@/lib/utils";
import Link from "next/link";
import AddCartBtn from "./add-cart-btn";
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
  id: string;
};

const ProductCard = ({ description, image, price, title, id }: props) => {
  const formattedPrice = formatPricetoCOP(price);

  return (
    <Card className="h-full max-w-[320px]">
      <CardHeader className="p-5">
        <CardTitle className="text-pretty -tracking-wider">{title}</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex-1 px-5 pb-2">
        <Link href={`/products/${id}`} className="h-full w-full">
          <figure className="overflow-hidden rounded-lg">
            <img
              src={image ?? ""}
              alt={"Product Image"}
              width={200}
              height={200}
              className="aspect-square h-full w-full overflow-hidden rounded-lg"
            />
          </figure>
          <CardDescription className="mt-3 line-clamp-2">
            {description}
          </CardDescription>
          <h4 className="my-3 text-lg font-bold">{formattedPrice}</h4>
        </Link>
        <CardFooter className="flex w-full flex-col items-center justify-center gap-3 p-0">
          <AddCartBtn />
          <Button className="w-full" variant={"link"}>
            More information
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

import AddCartBtn from "@/components/add-cart-btn";
import { CarouselItem } from "@/components/ui/carousel";
import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { formatPricetoCOP } from "@/lib/utils";
import Image from "next/image";
import CardItems from "./providers/card-items";
import CarouselContainer from "./providers/carousel-container";

const CarouselProducts = async () => {
  const products = await db.select().from(ProductTable).all();
  return (
    <CarouselContainer title="Productos">
      {products.map((product, index) => (
        <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
          <CardItems>
            <figure className="overflow-hidden p-3">
              <Image
                src={product.image ?? ""}
                alt={product.title}
                width={375}
                height={375}
                quality={100}
                className="aspect-square overflow-hidden object-contain"
              />
              <figcaption className="flex flex-col gap-2 p-3">
                <h5 className="line-clamp-2 text-pretty text-sm font-semibold text-primary">
                  {product.title}
                </h5>
                <h5>{formatPricetoCOP(product.price)}</h5>
                <AddCartBtn {...product} />
              </figcaption>
            </figure>
          </CardItems>
        </CarouselItem>
      ))}
    </CarouselContainer>
  );
};

export default CarouselProducts;

import AddCartBtn from "@/components/add-cart-btn";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { formatPricetoCOP } from "@/lib/utils";
import Image from "next/image";

const CarouselProducts = async () => {
  const products = await db.select().from(ProductTable).all();
  return (
    <section className="mx-auto my-2 flex h-full w-full max-w-[1500px] flex-col items-center justify-center md:mt-8">
      <h3 className="mb-0 text-center text-2xl font-semibold">Productos</h3>
      <Carousel
        opts={{
          align: "center",
        }}
        className="mx-auto my-0 h-full w-[70%]"
      >
        <CarouselContent className="">
          {products.map((product, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <Card className="h-full border-none bg-transparent shadow-none">
                  <CardContent className="flex aspect-square h-full items-center justify-center p-0">
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
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default CarouselProducts;

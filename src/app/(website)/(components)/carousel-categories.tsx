import CategoryImage from "@/components/category-image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "@/db/main";
import { CategoryTable } from "@/db/schema";

const CarouselCategories = async () => {
  const categories = await db.select().from(CategoryTable).all();
  return (
    <section className="my-2 flex h-full w-full flex-col items-center justify-center">
      <h3 className="mb-3 text-center text-2xl font-semibold">Categorias</h3>
      <Carousel
        opts={{
          align: "center",
        }}
        className="mx-auto my-0 h-fit w-[65%] max-w-[20rem] sm:hidden"
      >
        <CarouselContent className="">
          {categories.map((category, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="h-fit rounded-none border-none bg-transparent shadow-none">
                  <CardContent className="m-0 flex aspect-square items-center justify-center p-0 ">
                    <CategoryImage
                      key={category.id}
                      {...category}
                      src={`/images/home/mobile/category-0${index + 1}.png`}
                      // src={`/images/home/mobile/default.jpg`}
                    />
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

export default CarouselCategories;

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
    <section>
      <h3 className="mb-3 text-center text-xl font-bold">Categorias</h3>
      <Carousel
        opts={{
          align: "center",
        }}
        className="mx-auto mb-8 w-[65%] max-w-[20rem] sm:hidden"
      >
        <CarouselContent className="">
          {categories.map((category, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="h-fit border-none shadow-none">
                  <CardContent className="m-0 flex aspect-square items-center justify-center p-0 ">
                    <CategoryImage key={category.id} {...category} />
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

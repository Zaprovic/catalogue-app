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
    <Carousel
      opts={{
        align: "center",
      }}
      className="mx-auto mb-8 w-[70%] max-w-[20rem] md:hidden"
    >
      <CarouselContent>
        {categories.map((category, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="m-0 bg-rose-300/40 p-0">
                <CardContent className="m-0 flex aspect-square items-center justify-center p-0">
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
  );
};

export default CarouselCategories;

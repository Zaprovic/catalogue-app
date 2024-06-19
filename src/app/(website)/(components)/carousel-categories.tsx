import CategoryImage from "@/components/category-image";
import { CarouselItem } from "@/components/ui/carousel";
import { db } from "@/db/main";
import { CategoryTable } from "@/db/schema";
import CardItems from "./providers/card-items";
import CarouselContainer from "./providers/carousel-container";

const CarouselCategories = async () => {
  const categories = await db.select().from(CategoryTable).all();
  return (
    <CarouselContainer title="Categorias">
      {categories.map((category, index) => (
        <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3">
          <CardItems>
            <CategoryImage
              key={category.id}
              {...category}
              src="/images/home/mobile/carousel-skincare.jpg"
            />
          </CardItems>
        </CarouselItem>
      ))}
    </CarouselContainer>
  );
};

export default CarouselCategories;

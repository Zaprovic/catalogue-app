import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ReactNode } from "react";

type props = {
  children: ReactNode;
  title: string;
};

const CarouselContainer = async ({ children, title }: props) => {
  return (
    <section className="mx-auto my-2 flex h-full w-full max-w-[1500px] flex-col items-center justify-center md:mt-8">
      <h3 className="text-center text-2xl font-semibold">{title}</h3>
      <Carousel
        opts={{
          align: "center",
        }}
        className="mx-auto my-0 w-[65%]"
      >
        <CarouselContent className="h-fit">{children}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default CarouselContainer;

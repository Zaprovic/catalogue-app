/* eslint-disable @next/next/no-img-element */

import CarouselCategories from "./(components)/carousel-categories";
import CarouselProducts from "./(components)/carousel-products";
import Section01 from "./(components)/section-01";
import Section02 from "./(components)/section-02";

export const revalidate = 0;

export default async function Home() {
  return (
    <main className="mx-auto flex h-full flex-col gap-4">
      <Section01 />

      <CarouselCategories />

      <Section02 />

      <CarouselProducts />
    </main>
  );
}

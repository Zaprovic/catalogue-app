/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import CarouselCategories from "./(components)/carousel-categories";
import CarouselProducts from "./(components)/carousel-products";

export const revalidate = 0;

export default function Home() {
  return (
    <main className="flex h-full flex-col gap-4">
      {/* <nav className="flex items-center justify-center pt-16 sm:hidden">
        <ul className="flex flex-col items-center justify-center gap-6 text-2xl font-semibold text-primary/40">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/products">Productos</Link>
          </li>
          <li>
            <Link href="/about">Contacto</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav> */}

      <section>
        <figure className="relative flex items-center justify-center bg-black">
          <Image
            src={"/images/home/mobile/mobile-01.png"}
            alt="Mobile image 01"
            width={333}
            height={720}
            quality={100}
            className="h-full w-full object-cover opacity-40"
          />
          <figcaption className="absolute bottom-9 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <h6 className=" text-2xl font-bold leading-tight text-white">
              Desbloquea tu brillo natural
            </h6>

            <p className="text-pretty text-center text-xs text-white">
              Cuidar tu piel es un acto de amor propio que se refleja en tu
              belleza exterior e interior
            </p>
          </figcaption>
        </figure>
      </section>

      <CarouselCategories />

      <section>
        <figure className="relative flex items-center justify-center bg-black">
          <Image
            src={"/images/home/mobile/mobile-02.jpg"}
            alt="Mobile image 01"
            width={333}
            height={720}
            quality={100}
            className="h-full w-full object-cover opacity-40"
          />
          <figcaption className="absolute bottom-9 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <h6 className="text-3xl font-bold text-white">
              Explora tu belleza interior
            </h6>

            <p className="text-pretty text-center text-sm text-white">
              La belleza está en la salud de tu piel, no en la perfección
            </p>

            <Button className="rounded-none border-2 bg-transparent px-4 py-2 text-white hover:bg-transparent">
              <Link href={"/products"}>Ver productos</Link>
            </Button>
          </figcaption>
        </figure>
      </section>

      <CarouselProducts />
    </main>
  );
}

/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import CarouselCategories from "./(components)/carousel-categories";

export const revalidate = 0;

export default function Home() {
  return (
    <main className="flex h-full flex-col gap-16">
      <nav className="flex items-center justify-center pt-16 sm:hidden">
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
      </nav>

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
          <figcaption className="absolute bottom-9 flex flex-col items-center justify-center gap-6">
            <h6 className="text-2xl font-bold text-white">
              Unlock your natural glow
            </h6>

            <Button className="rounded-none border-2 bg-transparent px-4 py-2 text-white hover:bg-transparent">
              Know more
            </Button>
          </figcaption>
        </figure>
      </section>

      <CarouselCategories />
    </main>
  );
}

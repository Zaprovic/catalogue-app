/* eslint-disable @next/next/no-img-element */

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

      <CarouselCategories />
    </main>
  );
}

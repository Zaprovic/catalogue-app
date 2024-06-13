/* eslint-disable @next/next/no-img-element */

import CategoryImage from "@/components/category-image";
import { db } from "@/db/main";
import { CategoryTable } from "@/db/schema";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
  const categories = await db.select().from(CategoryTable).all();

  return (
    <main className="flex h-full flex-col gap-16">
      {/* <HomeMobile /> */}

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

      <section className="mb-8 flex w-full max-w-[1000px] grid-cols-2 flex-col justify-center gap-5 px-6 sm:my-8 sm:grid md:grid-cols-3">
        {categories.map((category) => (
          <CategoryImage
            key={category.id}
            {...category}
            src={`/images/pink.jpg`}
          />
        ))}
      </section>
    </main>
  );
}

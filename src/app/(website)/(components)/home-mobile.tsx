import CategoryImage from "@/components/category-image";
import { Button } from "@/components/ui/button";
import { db } from "@/db/main";
import { CategoryTable } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";

const HomeMobile = async () => {
  const categories = await db.select().from(CategoryTable).all();

  return (
    <>
      <nav className="flex items-center justify-center sm:hidden">
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

      <section className="w-full sm:hidden">
        <figure className="relative w-full">
          <Image
            src={"/images/categories/proteccion-solar.jpg"}
            alt="New collection"
            width={384}
            height={175}
            quality={100}
            className="h-full w-full"
          />

          <figcaption className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-4 text-center text-white sm:-translate-x-full">
            <h4 className="text-xl font-bold uppercase text-black sm:text-3xl">
              New collection
            </h4>
            <p className="text-sm text-black">
              We know how large objects will act, but things on a small scale.
            </p>

            <Button>
              <Link href="/products">Comprar ya</Link>
            </Button>
          </figcaption>
        </figure>
      </section>

      <section className="mb-8 flex w-full grid-cols-2 flex-col justify-center gap-6 px-6 sm:grid">
        {categories.map((category) => (
          <CategoryImage
            key={category.id}
            {...category}
            src={`/images/pink.jpg`}
          />
        ))}
      </section>
    </>
  );
};

export default HomeMobile;

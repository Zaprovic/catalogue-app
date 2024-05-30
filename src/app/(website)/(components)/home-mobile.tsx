import CategoryImage from "@/components/category-image";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const HomeMobile = () => {
  return (
    <>
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

      <section className="w-full sm:hidden">
        <figure className="relative w-full">
          <Image
            src={"/images/perfume.jpg"}
            alt="New collection"
            width={800}
            height={600}
            quality={100}
            className="h-full w-full"
          />

          <figcaption className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-4 text-center text-white sm:-translate-x-full">
            <span>Summer 2024</span>
            <h4 className="text-xl font-bold uppercase sm:text-3xl">
              New collection
            </h4>
            <p className="text-sm">
              We know how large objects will act, but things on a small scale.
            </p>

            <Button>
              <Link href="/products">Shop now</Link>
            </Button>
          </figcaption>
        </figure>
      </section>

      <section className="mb-8 flex w-full flex-col justify-center gap-6 px-6 sm:hidden">
        <CategoryImage
          src="/images/img-1.png"
          alt="img-1"
          categoryName="Dermatologia"
        />
        <CategoryImage
          src="/images/img-2.png"
          alt="img-2"
          categoryName="Proteccion solar"
        />
        <CategoryImage
          src="/images/img-3.png"
          alt="img-3"
          categoryName="Cuidado de la piel"
        />
        <CategoryImage
          src="/images/img-4.png"
          alt="img-4"
          categoryName="Cuidado del cabello"
        />
      </section>
    </>
  );
};

export default HomeMobile;

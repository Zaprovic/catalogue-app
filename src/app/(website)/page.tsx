/* eslint-disable @next/next/no-img-element */
import { auth } from "@/auth";
import CategoryImage from "@/components/category-image";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex h-full flex-col gap-20">
      <h1 className="px-6 pt-6 text-3xl font-semibold -tracking-wider">
        {session ? `Bienvenido, ${session.user?.name}` : "Inicio"}
      </h1>

      {/* <div className="flex flex-1 items-center justify-center gap-2">
        {session ? <SignOut /> : <SignIn />}

        {session && <span>{session.user?.name}</span>}
      </div> */}

      <nav className="flex items-center justify-center sm:hidden">
        <ul className="flex flex-col items-center justify-center gap-5 text-2xl font-semibold text-primary/40">
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

      <section className="w-full">
        <figure className="relative w-full">
          <Image
            src={"/images/new-collection.jpg"}
            alt="New collection"
            width={412}
            height={753}
            className="h-auto w-full"
          />

          <figcaption className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-6 text-center text-white">
            <span>Summer 2024</span>
            <h4 className="text-4xl font-bold uppercase">New collection</h4>
            <p>
              We know how large objects will act, but things on a small scale.
            </p>

            <Button>
              <Link href="/products">Shop now</Link>
            </Button>
          </figcaption>
        </figure>
      </section>

      <section className="mb-8 flex w-full flex-col justify-center gap-6 px-6 sm:hidden">
        <CategoryImage src="/images/img-1.png" alt="img-1" />
        <CategoryImage src="/images/img-2.png" alt="img-2" />
        <CategoryImage src="/images/img-3.png" alt="img-3" />
        <CategoryImage src="/images/img-4.png" alt="img-4" />
      </section>
    </main>
  );
}

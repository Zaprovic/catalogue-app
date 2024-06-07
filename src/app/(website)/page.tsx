/* eslint-disable @next/next/no-img-element */
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import HomeMobile from "./(components)/home-mobile";

export const revalidate = 0;

export default async function Home() {
  const session = await auth();
  const products = await db.select().from(ProductTable).all();

  return (
    <main className="flex h-full flex-col gap-20">
      {/* <div className="flex flex-1 items-center justify-center gap-2">
        {session ? <SignOut /> : <SignIn />}

        {session && <span>{session.user?.name}</span>}
      </div> */}

      <HomeMobile />

      <section className="hidden sm:inline-block">
        <figure className="relative w-full">
          <Image
            src="https://st1.uvnimg.com/dims4/default/4d597f3/2147483647/thumbnail/1024x576%3E/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fassets%2Fvixes%2Fp%2Fproductos-basicos-para-tu-rutina-de-skincare.jpg"
            alt="Shop Hero Desktop"
            width={1000}
            height={563}
            quality={100}
            className="h-auto max-h-[600px] w-full object-contain"
          />
          <figcaption className="absolute left-0 top-0 flex max-w-full flex-col gap-4 p-8 text-white">
            <div className="bg-black/70 p-4">
              <h4 className="text-4xl font-bold uppercase">New collection</h4>
              <p className="max-w-[320px]">
                We know how large objects will act, but things on a small scale.
              </p>
            </div>
            <Button className="w-fit">
              <Link href="/products" className="font-bold text-white">
                Comprar ya
              </Link>
            </Button>
          </figcaption>
        </figure>
      </section>
    </main>
  );
}

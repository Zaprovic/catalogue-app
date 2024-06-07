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
            src={"/images/home-img.jpg"}
            alt="Shop Hero Desktop"
            width={384}
            height={175}
            quality={100}
            className="h-auto max-h-[600px] w-full object-cover"
          />
          <figcaption className="absolute left-0 top-0 flex flex-col gap-4 px-8 py-12 text-white">
            <h4 className="text-4xl font-bold uppercase text-black">
              New collection
            </h4>
            <p className="max-w-[320px] text-black">
              We know how large objects will act, but things on a small scale.
            </p>

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

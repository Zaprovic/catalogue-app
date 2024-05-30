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
        <figure className="relative w-full lg:my-8">
          <Image
            src={"/images/perfume.jpg"}
            alt="Shop Hero Desktop"
            width={1440}
            height={716}
            className="h-auto max-h-[600px] w-full object-contain"
          />
          <figcaption className="absolute left-1/2 top-1/2 flex -translate-x-72 -translate-y-1/2 flex-col gap-3 text-white md:-translate-x-full">
            <span>Summer 2024</span>
            <h4 className="text-4xl font-bold uppercase">New collection</h4>
            <p className="max-w-[320px]">
              We know how large objects will act, but things on a small scale.
            </p>

            <Button className="w-fit">
              <Link href="/products">Shop now</Link>
            </Button>
          </figcaption>
        </figure>
      </section>
    </main>
  );
}

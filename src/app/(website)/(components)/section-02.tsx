import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Section02 = () => {
  return (
    <section>
      <figure className="relative flex items-center justify-center bg-black sm:hidden">
        <Image
          src={"/images/home/mobile/mobile-03.jpg"}
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

      <div className="mx-10 flex max-w-[1200px] gap-3 lg:mx-auto">
        <figure className="relative hidden items-center justify-center rounded-xl bg-black sm:flex">
          <Image
            src={"/images/home/desktop/desktop-03.jpg"}
            alt="Mobile image 01"
            width={1440}
            height={629}
            quality={100}
            className="rounded-xl object-cover opacity-45"
          />
          <figcaption className="absolute bottom-9 flex w-[75%] min-w-[500px] flex-col items-center justify-center gap-1 text-center">
            <h6 className=" text-2xl font-semibold leading-tight text-white lg:text-3xl xl:text-4xl">
              Cuidar tu piel
            </h6>

            <p className="text-pretty text-center text-xs font-light text-white lg:px-20 lg:text-sm">
              Es un acto de amor propio que se refleja en tu belleza exterior e
              interior
            </p>
          </figcaption>
        </figure>
        <figure className="relative mx-auto hidden max-w-[1200px] items-center justify-center rounded-xl bg-black sm:flex">
          <Image
            src={"/images/home/desktop/desktop-04.jpg"}
            alt="Mobile image 01"
            width={1440}
            height={629}
            quality={100}
            className="rounded-xl object-cover opacity-45"
          />
          <figcaption className="absolute bottom-9 flex w-[75%] min-w-[500px] flex-col items-center justify-center gap-1 text-center">
            <h6 className=" text-2xl font-semibold leading-tight text-white lg:text-3xl xl:text-4xl">
              Cuidar tu piel
            </h6>

            <p className="text-pretty text-center text-xs font-light text-white lg:px-20 lg:text-sm">
              Es un acto de amor propio que se refleja en tu belleza exterior e
              interior
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Section02;

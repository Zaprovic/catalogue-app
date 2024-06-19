import Image from "next/image";

const Section01 = () => {
  return (
    <section>
      <figure className="relative flex items-center justify-center bg-black sm:hidden">
        <Image
          src={"/images/home/mobile/mobile-04.jpg"}
          alt="Mobile image 01"
          width={333}
          height={720}
          quality={100}
          className="h-full w-full object-cover opacity-45"
        />
        <figcaption className="absolute bottom-9 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <h6 className=" text-3xl font-bold leading-tight text-white">
            Cuidar tu piel
          </h6>

          <p className="text-pretty text-center text-sm text-white">
            Es un acto de amor propio que se refleja en tu belleza exterior e
            interior
          </p>
        </figcaption>
      </figure>
      <figure className="relative hidden items-center justify-center bg-black sm:flex">
        <Image
          src={"/images/home/desktop/desktop-01.png"}
          alt="Mobile image 01"
          width={1440}
          height={629}
          quality={100}
          className="h-full max-h-[520px] w-full object-cover opacity-40"
        />
        <figcaption className="absolute bottom-9 flex w-full max-w-[440px] flex-col items-center justify-center gap-1 text-center">
          <h6 className=" text-4xl font-semibold leading-tight text-white lg:text-5xl">
            Cuidar tu piel
          </h6>

          <p className="text-pretty text-center text-base font-light text-white lg:text-xl">
            Es un acto de amor propio que se refleja en tu belleza exterior e
            interior
          </p>
        </figcaption>
      </figure>
    </section>
  );
};

export default Section01;

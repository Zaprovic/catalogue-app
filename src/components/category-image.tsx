import { SelectCategoryType } from "@/types";
import Image from "next/image";
import Link from "next/link";

type props = {
  src: string;
  alt: string;
  categoryName: string;
};

const CategoryImage = ({ id, name }: SelectCategoryType) => {
  return (
    <figure className="relative w-full">
      <Image
        src="/images/img-1.png"
        alt={name}
        width={437}
        height={395}
        quality={100}
        className="h-auto w-full object-cover object-center"
      />
      <figcaption className="absolute left-4 top-4">
        <span className="font-semibold text-emerald-500">5 items</span>
        <h5 className="text-xl font-bold uppercase">{name}</h5>
        <Link
          href={`/products/categories/${id}`}
          className="text-sm font-medium hover:underline"
        >
          Leer mas
        </Link>
      </figcaption>
    </figure>
  );
};

export default CategoryImage;

/* eslint-disable @next/next/no-img-element */
import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { formatPricetoCOP } from "@/lib/utils";
import { eq } from "drizzle-orm";

const Page = async ({ params }: { params: { id: string } }) => {
  const product = (
    await db.select().from(ProductTable).where(eq(ProductTable.id, +params.id))
  )[0];

  return (
    <>
      <div
        className={`mx-auto grid max-w-[900px] grid-cols-1 place-content-center gap-6 rounded-lg p-5 xl:grid-cols-2`}
      >
        <section className="sie-full">
          <figure className="grid size-full place-items-center overflow-hidden rounded-lg">
            <img
              src={product.image ?? ""}
              width={100}
              height={100}
              loading="lazy"
              decoding="async"
              className="aspect-auto size-full max-h-[400px] max-w-[400px] overflow-hidden rounded-lg object-contain"
              alt={product.description ?? ""}
            />
          </figure>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold -tracking-wider">
            {product.title}
          </h2>

          <h5 className="text-sm font-bold text-primary/50">{product.brand}</h5>
          <p className="text-sm -tracking-wider font-normal text-pretty">{product.description}</p>
          <h3 className="text-xl font-bold">
            {formatPricetoCOP(product.price)}
          </h3>
        </section>
      </div>
    </>
  );
};

export default Page;

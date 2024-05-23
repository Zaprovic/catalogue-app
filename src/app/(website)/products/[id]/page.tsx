/* eslint-disable @next/next/no-img-element */
import DeleteProductBtn from "@/components/delete-product-btn";
import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { formatPricetoCOP } from "@/lib/utils";
import { eq } from "drizzle-orm";

const Page = async ({ params }: { params: { id: string } }) => {
  const product = (
    await db.select().from(ProductTable).where(eq(ProductTable.id, +params.id))
  )[0];

  return (
    <div>
      <div
        className={` mx-auto grid max-w-[900px] grid-cols-1 gap-6 rounded-lg p-5 xl:grid-cols-2`}
      >
        <section>
          <figure className="grid size-full place-items-center overflow-hidden rounded-lg">
            <img
              src={product.image ?? ""}
              width={100}
              height={100}
              loading="lazy"
              decoding="async"
              className="aspect-auto size-full max-w-[400px] overflow-hidden rounded-lg object-contain"
              alt={product.description ?? ""}
            />
          </figure>
        </section>

        <section className="flex h-full flex-col gap-3">
          <h2 className="text-2xl font-bold -tracking-wider">
            {product.title}
          </h2>
          <p className=" text-pretty -tracking-wide">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
            iusto natus doloremque atque corrupti cum veritatis. Alias ex sed
            earum nisi, temporibus dicta ut, atque facilis pariatur omnis, nihil
            ratione molestias? Labore aliquam quaerat temporibus dolor
            praesentium minus excepturi rem sed accusamus? Vitae, voluptates
            temporibus. Dolorem aliquid mollitia eius dignissimos assumenda
            repellendus fuga sint consequuntur voluptatum quis nobis,
            necessitatibus voluptatibus repudiandae?
          </p>
          <h3 className="text-xl font-bold">
            {formatPricetoCOP(product.price)}
          </h3>
          <div className="hidden w-fit xl:block">
            <DeleteProductBtn />
          </div>
        </section>

        <div className="w-full sm:w-fit xl:hidden">
          <DeleteProductBtn />
        </div>
      </div>
    </div>
  );
};

export default Page;

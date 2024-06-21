/* eslint-disable @next/next/no-img-element */
import AddCartBtn from "@/components/add-cart-btn";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { calculatePriceWithDiscount, cn, formatPricetoCOP } from "@/lib/utils";
import { eq } from "drizzle-orm";

export const revalidate = 0;

const Page = async ({ params }: { params: { id: string } }) => {
  const product = (
    await db.select().from(ProductTable).where(eq(ProductTable.id, +params.id))
  )[0];

  return (
    <>
      <div
        className={`mx-auto grid max-w-[1100px] grid-cols-1 place-content-center gap-6 rounded-lg p-5 xl:grid-cols-2`}
      >
        <section className="size-full">
          <figure className="relative grid size-full place-items-center overflow-hidden rounded-lg">
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
          <p className="text-pretty text-sm font-normal -tracking-wider">
            {product.description}
          </p>
          <div
            className={cn("flex items-center gap-5", {
              "mb-4 inline-block": product.discountPercentage !== 0,
            })}
          >
            <div
              className={cn(" flex items-center gap-4", {
                "mb-4": product.discountPercentage !== 0,
              })}
            >
              <h3
                className={cn("text-xl font-bold", {
                  "text-lg line-through": product.discountPercentage !== 0,
                })}
              >
                {formatPricetoCOP(product.price)}
              </h3>
              {product.discountPercentage &&
              product.discountPercentage !== 0 ? (
                <>
                  <h2 className="text-xl font-bold">
                    {calculatePriceWithDiscount(
                      product.price,
                      product.discountPercentage,
                    )}
                  </h2>
                  <Badge className="bg-secondary-foreground hover:bg-secondary-foreground">
                    {product.discountPercentage}%
                  </Badge>
                </>
              ) : null}
            </div>

            <div>
              <AddCartBtn {...product} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;

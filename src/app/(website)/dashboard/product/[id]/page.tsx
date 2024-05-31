import ProductUpdateForm from "@/app/(website)/products/(components)/product-update-form";
import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const revalidate = 0;

const Page = async ({ params }: { params: { id: string } }) => {
  const product = (
    await db.select().from(ProductTable).where(eq(ProductTable.id, +params.id))
  )[0];
  return (
    <main className="p-6">
      <section className="w-full max-w-5xl">
        <ProductUpdateForm {...product} />
      </section>
    </main>
  );
};

export default Page;

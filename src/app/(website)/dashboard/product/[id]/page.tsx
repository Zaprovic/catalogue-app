import ProductCategoryUpdateForm from "@/components/forms/product-category-update-form";
import ProductUpdateForm from "@/components/forms/products/product-update-form";
import { db } from "@/db/main";
import { CategoryTable, ProductCategoryTable, ProductTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const revalidate = 0;

const Page = async ({ params }: { params: { id: string } }) => {
  const singleProduct = await db.query.ProductTable.findFirst({
    where: eq(ProductTable.id, +params.id),
  });
  const categories = await db.select().from(CategoryTable).all();
  const productCategories = await db.select().from(ProductCategoryTable).all();

  return (
    <main className="p-6">
      <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <ProductUpdateForm {...singleProduct} />
        <ProductCategoryUpdateForm
          categories={categories}
          productCategories={productCategories}
        />
      </section>
    </main>
  );
};

export default Page;

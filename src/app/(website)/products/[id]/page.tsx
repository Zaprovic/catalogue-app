import { eq } from "drizzle-orm";
import { db } from "../../../../db";
import { ProductTable } from "../../../../db/schema";

const Page = async ({ params }: { params: { id: string } }) => {
  const product = await db
    .select()
    .from(ProductTable)
    .where(eq(ProductTable.id, +params.id));

  return (
    <div className="p-6">
      <main>
        <h1 className="text-3xl font-bold">{product[0].title}</h1>
      </main>
    </div>
  );
};

export default Page;

import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";

const Page = async () => {
  const products = await db.select().from(ProductTable).all();

  return (
    <div>
      <h1 className="text-3xl font-semibold -tracking-wider">
        Carrito de compras
      </h1>
    </div>
  );
};

export default Page;

import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import AddedProducts from "./(components)/added-products";

const Page = async () => {
  const products = await db.select().from(ProductTable).all();

  return (
    <div className="p-5">
      <h1 className="text-3xl font-semibold -tracking-wider">
        Carrito de compras
      </h1>

      <div className="flex flex-col md:flex-row">
        <AddedProducts />

        {/* <section>
          <h2>Checkout</h2>
        </section> */}
      </div>
    </div>
  );
};

export default Page;

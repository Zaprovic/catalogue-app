import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import styles from "@/styles.module.css";
import { SelectProductType } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import MyProduct from "./(components)/my-product";

const Page = async () => {
  const { userId } = auth();

  let myProducts: SelectProductType[] = [];

  if (userId) {
    myProducts = await db
      .select()
      .from(ProductTable)
      .where(eq(ProductTable.userId, userId));
  }

  return (
    <div>
      <h1 className="mb-5 text-3xl font-semibold -tracking-wider">Dashboard</h1>

      <section>
        <h2 className="mb-5 text-2xl font-semibold -tracking-wider">
          Mis productos
        </h2>

        <div className={`${styles.myProductContainer} mx-auto max-w-[1200px]`}>
          {myProducts.map((product) => (
            <MyProduct key={product.id} {...product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;

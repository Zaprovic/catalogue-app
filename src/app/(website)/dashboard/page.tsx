import { auth } from "@/auth";
import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import styles from "@/styles.module.css";
import { SelectProductType } from "@/types";
import { eq } from "drizzle-orm";
import MyProduct from "./(components)/my-product";

export const revalidate = 0;

const Page = async () => {
  const session = await auth();

  let myProducts: SelectProductType[] = [];

  if (session && session.user) {
    myProducts = await db
      .select()
      .from(ProductTable)
      .where(eq(ProductTable.userId, session.user.id ?? ""));
  }

  return (
    <div className="p-6">
      <h1 className="mb-5 text-3xl font-semibold -tracking-wider">Dashboard</h1>

      <section>
        <h2 className="mb-5 text-2xl font-semibold -tracking-wider">
          Mis productos
        </h2>

        <div className={`${styles.myProductContainer} max-w-3xl`}>
          {myProducts.map((product) => (
            <MyProduct key={product.id} {...product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;

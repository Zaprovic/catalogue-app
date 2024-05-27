import { revalidateProducts } from "@/actions/revalidate-actions";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import styles from "@/styles.module.css";
import { SelectProductType } from "@/types";
import { IconRefresh } from "@tabler/icons-react";
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
    <div>
      <h1 className="mb-5 text-3xl font-semibold -tracking-wider">Dashboard</h1>

      <section>
        <h2 className="mb-5 text-2xl font-semibold -tracking-wider">
          Mis productos
        </h2>

        <form action={revalidateProducts} className="my-5">
          <Button className="flex gap-2">
            <span>Refresh</span>
            <IconRefresh />
          </Button>
        </form>

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

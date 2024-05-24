// todo: add skeleton as the loading UI

import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import styles from "@/styles.module.css";

const Loading = async () => {
  const products = await db.select().from(ProductTable).all();
  return (
    <div className="flex-1">
      <div
        className={`${styles.productContainer} mx-auto w-full place-items-center`}
      >
        {products.map((product) => (
          <Skeleton
            className="aspect-square h-full w-full overflow-hidden rounded-lg"
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;

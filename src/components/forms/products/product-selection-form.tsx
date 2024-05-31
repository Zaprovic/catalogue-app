import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";

const ProductSelectionForm = async () => {
  const products = await db.select().from(ProductTable).all();
  return (
    <ul>
      {products.map((product) => {
        return <li key={product.id}>{product.title}</li>;
      })}
    </ul>
  );
};

export default ProductSelectionForm;

import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db/main";
import { CategoryTable, ProductTable } from "@/db/schema";
import CategoryOptionsForm from "./category-options-form";

const CategoryOptionsCard = async () => {
  const categories = await db.select().from(CategoryTable).all();
  const products = await db.select().from(ProductTable).all();
  const session = await auth();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos & Categorias</CardTitle>
      </CardHeader>
      <CardContent>
        <CategoryOptionsForm
          categories={categories}
          products={products}
          session={session}
        />
      </CardContent>
    </Card>
  );
};

export default CategoryOptionsCard;

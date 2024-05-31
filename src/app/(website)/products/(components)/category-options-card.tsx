import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db/main";
import { CategoryTable } from "@/db/schema";
import CategoryOptionsForm from "./category-options-form";

const CategoryOptionsCard = async () => {
  const categories = await db.select().from(CategoryTable).all();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Selecciona una categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <CategoryOptionsForm categories={categories} />
      </CardContent>
    </Card>
  );
};

export default CategoryOptionsCard;

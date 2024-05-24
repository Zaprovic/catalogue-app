import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryOptionsForm from "./category-options-form";

const CategoryOptionsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Selecciona una categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <CategoryOptionsForm />
      </CardContent>
    </Card>
  );
};

export default CategoryOptionsCard;

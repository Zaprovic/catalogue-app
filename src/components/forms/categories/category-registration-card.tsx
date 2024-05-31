import { auth } from "@/auth";
import CategoryCreationForm from "@/components/forms/categories/category-creation-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

//todo: there is prop drilling in the session

const CategoryRegistrationCard = async () => {
  const session = await auth();
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Crea tus categorias</CardTitle>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-3">
        <CategoryCreationForm session={session} />
      </CardContent>
    </Card>
  );
};

export default CategoryRegistrationCard;

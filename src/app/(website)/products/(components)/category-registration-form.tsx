import CategoryCreationForm from "@/components/forms/category-creation-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Session } from "next-auth";

//todo: there is prop drilling in the session

const CategoryRegistrationForm = ({ session }: { session: Session | null }) => {
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

export default CategoryRegistrationForm;

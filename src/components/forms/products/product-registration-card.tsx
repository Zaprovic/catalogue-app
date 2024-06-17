import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductRegistrationForm from "./product-registration-form";

const ProductRegistrationCard = async () => {
  const session = await auth();
  return (
    <Card className="w-full bg-card/5">
      <CardHeader>
        <CardTitle>Crea tu producto</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductRegistrationForm session={session} />
      </CardContent>
    </Card>
  );
};

export default ProductRegistrationCard;

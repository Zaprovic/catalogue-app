"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryOptionsForm from "./category-options-form";

const CategoryOptions = () => {
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

export default CategoryOptions;

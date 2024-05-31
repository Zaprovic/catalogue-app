"use client";
import { insertCategoryAction } from "@/actions/category-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InsertCategorySchema } from "@/schemas/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const categorySchema = InsertCategorySchema.omit({
  userId: true,
});

type InsertCategoryType = z.infer<typeof categorySchema>;

const CategoryRegistrationForm = ({ session }: { session: Session | null }) => {
  const form = useForm<InsertCategoryType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onsubmit = async (data: InsertCategoryType) => {
    const newData = {
      ...data,
      userId: session?.user?.id ?? "",
    };

    const response = await insertCategoryAction(newData);

    if ("error" in response) {
      toast.error(response.error);
      return;
    }

    toast.success(`Se ha creado la categoria '${data.name}' exitosamente`);
    form.reset();
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Crea tus categorias (1)</CardTitle>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="flex w-full flex-col gap-2 "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la categoria</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="font-semibold" />
                </FormItem>
              )}
            />
            <Button
              disabled={isSubmitting}
              className="disabled:pointer-events-none disabled:opacity-50"
            >
              {isSubmitting ? (
                <IconLoader2 className="animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>

        {/* <CategoryOptions /> */}
      </CardContent>
    </Card>
  );
};

export default CategoryRegistrationForm;

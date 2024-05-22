"use client";
import { selectAllCategoriesAction } from "@/actions/category";
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
import { InsertCategoryType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CategoryRegistrationForm = () => {
  const form = useForm<InsertCategoryType>({
    resolver: zodResolver(InsertCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onsubmit = async (data: InsertCategoryType) => {
    const formData = new FormData();

    for (let key in data) {
      formData.append(key, data[key as keyof InsertCategoryType] as string);
    }

    try {
      await selectAllCategoriesAction(formData);
      toast.success(`La categoria '${data.name}' se ha creado exitosamente`);
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.log(error.message);
        return;
      }
    }
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
      </CardContent>
    </Card>
  );
};

export default CategoryRegistrationForm;

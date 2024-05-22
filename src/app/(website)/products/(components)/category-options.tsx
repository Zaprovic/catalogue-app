"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// todo: type safety is lost in the fetch call

const CategoryFormSchema = z.object({
  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "Debes seleccionar al menos una categoria",
    }),
});

const CategoryOptions = () => {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    [],
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories", {
          next: {
            tags: ["categories"],
            revalidate: 0,
          },
        });
        const allCategories: { id: string; name: string }[] =
          await response.json();

        setCategories(allCategories);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };

    fetchCategories();
  }, []);

  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      categories: [],
    },
  });

  const onsubmit = async (data: z.infer<typeof CategoryFormSchema>) => {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Selecciona una categoria</CardTitle>
      </CardHeader>
      <CardContent>
        {categories.length > 0 ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="categories"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Categorias</FormLabel>
                      <FormDescription>
                        Selecciona como minimo una categoria
                      </FormDescription>
                    </div>
                    {categories.length > 0 &&
                      categories.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="categories"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        ) : (
          <span className="text-sm font-light">No categories to show</span>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryOptions;

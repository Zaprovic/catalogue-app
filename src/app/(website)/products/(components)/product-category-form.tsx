"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/db/main";
import { CategoryTable, ProductCategoryTable, ProductTable } from "@/db/schema";
import { SelectCategoryType, SelectProductType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ProductCategorySchema = z.object({
  product: z.string({
    message: "Escoge tu producto",
  }),
  category: z.string({
    message: "Escoge la categoria del producto",
  }),
});

type ProductCategoryType = z.infer<typeof ProductCategorySchema>;

const ProductCategoryForm = () => {
  const form = useForm<ProductCategoryType>({
    resolver: zodResolver(ProductCategorySchema),
  });

  const [products, setProducts] = useState<SelectProductType[]>([]);
  const [categories, setCategories] = useState<SelectCategoryType[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [products, categories] = await Promise.all([
          db.select().from(ProductTable).all(),
          db.select().from(CategoryTable).all(),
        ]);

        setProducts(products);
        setCategories(categories);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        return;
      }
    };

    fetchAll();
  }, []);

  const onsubmit = async (data: ProductCategoryType) => {
    const category = await db
      .selectDistinct()
      .from(CategoryTable)
      .where(eq(CategoryTable.name, data.category));

    const newData = {
      productId: +data.product,
      categoryId: category[0].id,
    };

    try {
      await db.insert(ProductCategoryTable).values(newData);
      toast.success(`Se ha registrado el producto y su categoria con exito`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      return;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registra las categorias y sus productos</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="flex w-full flex-col gap-3"
          >
            <div className="grid w-full grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Producto</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu producto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem
                            key={product.id}
                            value={product.id.toString()}
                          >
                            <span className="font-semibold">
                              {product.id} &nbsp; - &nbsp;
                            </span>
                            <span className="font-semibold">
                              {product.title}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona la categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            <span className="font-semibold">
                              {category.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button>Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductCategoryForm;

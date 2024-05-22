"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InsertProductSchema } from "@/schemas/product";
import { type InsertProductType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { db } from "../../../../db";
import { ProductTable } from "../../../../db/schema";

const ProductRegistrationForm = () => {
  const form = useForm<InsertProductType>({
    resolver: zodResolver(InsertProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      image: "",
    },
  });

  const onsubmit = async (data: InsertProductType) => {
    try {
      await db.insert(ProductTable).values(data);
      toast.success(`El producto '${data.title}' se ha añadido exitosamente`);
      form.reset();
      return;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      return;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Crea tu producto (1)</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      className="resize-none"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormDescription>
                    Asegurate de colocar la URL de la imagen
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especificacion del producto</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca del producto</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <Separator orientation="horizontal" className="my-4" />
            <CategoryOptions />
            <Separator orientation="horizontal" className="my-4" /> */}

            <Button className="font-semibold">Registrar producto</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductRegistrationForm;

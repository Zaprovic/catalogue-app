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
import { UpdateProductSchema } from "@/schemas/product";
import { type UpdateProductType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ProductUpdateForm = (product: UpdateProductType) => {
  const form = useForm<UpdateProductType>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      brand: product.brand,
    },
  });

  const onsubmit = async (data: UpdateProductType) => {
    console.log(data);

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        next: {
          revalidate: 0,
        },
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }

      await response.json();
    } catch (error) {
      toast.error("Error al actualizar el producto");
      return;
    }

    toast.success("Producto actualizado correctamente");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Actualizar producto</CardTitle>
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

            <Button
              disabled={form.formState.isSubmitting}
              className="font-semibold disabled:pointer-events-none disabled:opacity-50"
              type="submit"
            >
              {form.formState.isSubmitting ? (
                <IconLoader2 className="animate-spin" />
              ) : (
                "Actualizar producto"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductUpdateForm;

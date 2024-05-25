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
import { useFormAction } from "@/hooks/useFormAction";
import { InsertProductSchema } from "@/schemas/product";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { toast } from "sonner";
import { z } from "zod";

const productSchema = InsertProductSchema.omit({
  userId: true,
});

const ProductRegistrationForm = () => {
  const { user } = useUser();
  const form = useFormAction<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      image: "",
    },
  });

  const onsubmit = async (data: z.infer<typeof productSchema>) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          userId: user?.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast.success(`El producto '${data.title}' se ha añadido exitosamente`);
        form.reset();
      } else {
        const errorData = await response.json(); // Get error details from the response
        if (errorData.errors) {
          // If validation errors are returned, display them
          for (const error of errorData.errors) {
            toast.error(error.message);
          }
        } else {
          // Display a general error message
          toast.error(
            errorData.message || "Hubo un error al registrar el producto",
          );
        }
      }
    } catch (error) {
      toast.error("Ha ocurrido un error, intentalo mas tarde");
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

            <Button
              disabled={form.formState.isSubmitting}
              className="font-semibold disabled:pointer-events-none disabled:opacity-50"
              type="submit"
            >
              {form.formState.isSubmitting ? (
                <IconLoader2 className="animate-spin" />
              ) : (
                "Registrar producto"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductRegistrationForm;

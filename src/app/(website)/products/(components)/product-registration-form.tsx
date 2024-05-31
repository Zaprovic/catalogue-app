"use client";

import { insertProductAction } from "@/actions/product-actions";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { Session } from "next-auth";
import { toast } from "sonner";
import { z } from "zod";

const productSchema = InsertProductSchema.omit({
  userId: true,
});

const ProductRegistrationForm = ({ session }: { session: Session | null }) => {
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
    const newData = {
      ...data,
      userId: session?.user?.id ?? "",
    };

    const response = await insertProductAction(newData);

    if ("error" in response) {
      toast.error(response.error);
      return;
    }

    toast.success(`El producto se ha añadido exitosamente`);
    form.reset();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Crea tu producto</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            method="POST"
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

            <div className="flex w-full flex-col gap-3 md:grid md:grid-cols-2">
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
            </div>

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

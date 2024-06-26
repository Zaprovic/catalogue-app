"use client";

import { updateProductAction } from "@/actions/product-actions";
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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UpdateProductSchema } from "@/schemas/product";
import { type UpdateProductType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectItem } from "@radix-ui/react-select";
import { IconLoader2 } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ProductUpdateForm = (product: UpdateProductType) => {
  const pathname = usePathname();
  const id = pathname.split("/").at(-1);

  const form = useForm<UpdateProductType>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      discountPercentage: product.discountPercentage,
      image: product.image,
      brand: product.brand,
    },
  });

  const onsubmit = async (data: UpdateProductType) => {
    const response = await updateProductAction(+id!, data);

    if ("error" in response) {
      toast.error(response.error);
      return;
    }
    toast.success(`El producto se ha actualizado exitosamente`);
  };

  return (
    <Card className="w-full bg-background">
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

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                name="discountPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descuento</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? 0} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Porcentaje de descuento (En caso de aplicar)
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
              <FormField
                control={form.control}
                name="isAvailable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disponibilidad del producto</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={"1"}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Disponibilidad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"1"}>
                          <span>Disponible</span>
                        </SelectItem>
                        <SelectItem value={"0"}>
                          <span>No disponible</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>

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

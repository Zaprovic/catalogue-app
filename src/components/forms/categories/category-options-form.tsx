"use client";
import { insertProductCategoryAction } from "@/actions/product-category-actions";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectCategoryType, SelectProductType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// todo: type safety is lost in the fetch call

const FormSchema = z.object({
  product: z.string().optional(),
  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "Selecciona al menos una categoria",
    }),
});

const CategoryOptionsForm = ({
  categories,
  products,
  session,
}: {
  categories: SelectCategoryType[];
  products: SelectProductType[];
  session: Session | null;
}) => {
  const newCategories = categories.map(({ id, name }) => ({
    id: id.toString(),
    name,
  }));

  const userCategories = categories
    .filter((item) => item.userId === session?.user?.id)
    .map(({ id, name, userId }) => ({
      id: id.toString(),
      name,
      userId,
    }));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categories: [],
      product: undefined,
    },
  });

  const userProducts = products.filter(
    (item) => item.userId === session?.user?.id,
  );

  const onsubmit = async (data: z.infer<typeof FormSchema>) => {
    const { categories, product: productId } = data;

    if (!productId || !userCategories) {
      return;
    }
    const categoriesId = categories?.map(Number);

    const insertionArray = categoriesId.map((item) => ({
      productId: +productId,
      categoryId: item,
    }));

    const response = await insertProductCategoryAction(insertionArray);

    if ("error" in response) {
      toast.error(
        "El producto ya tiene alguna de las categorias que seleccionaste",
      );
      return;
    }

    toast.success(`Categorias asignadas correctamente`);
    form.reset();

    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
        <FormField
          name="product"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selecciona un producto</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger disabled={userProducts.length === 0}>
                    <SelectValue
                      placeholder={
                        userProducts.length === 0
                          ? "No tienes aun ningun producto"
                          : "Selecciona un producto"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {userProducts.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.id} - {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Selecciona el producto para el cual quieres asignarles la
                categorias
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="categories"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Categorias</FormLabel>
                  <FormDescription>
                    {newCategories.length === 0
                      ? "No tienes aun ninguna categoria"
                      : "Selecciona las categorias para el producto"}
                  </FormDescription>
                </div>

                {newCategories.map((item) => (
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
                                  ? field.onChange([...field.value, item.id])
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
        </div>
        <Button type="submit">Asignar categorias</Button>
      </form>
    </Form>
  );
};

export default CategoryOptionsForm;

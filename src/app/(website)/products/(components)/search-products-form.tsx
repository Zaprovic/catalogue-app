"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStoreItems } from "@/store/counter";
import { SelectProductType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SearchProduct = z.object({
  productName: z.string(),
});

const SearchProductsForm = ({
  products,
}: {
  products: SelectProductType[];
}) => {
  const filteredProducts = useStoreItems((state) => state.filterSearch);
  const setFilteredSearch = useStoreItems((state) => state.setFilteredSearch);
  const setFilteredProducts = useStoreItems(
    (state) => state.setFilteredProducts,
  );

  const form = useForm<z.infer<typeof SearchProduct>>({
    resolver: zodResolver(SearchProduct),
    defaultValues: {
      productName: "",
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilteredSearch(searchTerm);

    const filter =
      searchTerm === ""
        ? products
        : products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm),
          );

    setFilteredProducts(filter);
  };

  return (
    <Form {...form}>
      <form action="" className="mb-4">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buscar productos</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange(e);
                  }}
                  placeholder="Buscar productos"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SearchProductsForm;

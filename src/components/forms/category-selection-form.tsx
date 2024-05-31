import { db } from "@/db/main";
import { CategoryTable } from "@/db/schema";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";

type props = {
  form: UseFormReturn<{ categories: string[] }, any, undefined>;
};

const CategorySelectionForm = async ({ form }: props) => {
  const categories = await db.select().from(CategoryTable).all();
  return categories.map((item) => (
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
                checked={field.value?.includes(`${item.id}`)}
                onCheckedChange={(checked) => {
                  return checked
                    ? field.onChange([...field.value, item.id])
                    : field.onChange(
                        field.value?.filter((value) => value !== `${item.id}`),
                      );
                }}
              />
            </FormControl>
            <FormLabel className="text-sm font-normal">{item.name}</FormLabel>
          </FormItem>
        );
      }}
    />
  ));
};

export default CategorySelectionForm;

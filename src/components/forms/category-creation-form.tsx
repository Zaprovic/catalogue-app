"use client";

import { insertCategoryAction } from "@/actions/category-actions";
import { InsertCategorySchema } from "@/schemas/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const categorySchema = InsertCategorySchema.omit({
  userId: true,
});

type InsertCategoryType = z.infer<typeof categorySchema>;

const CategoryCreationForm = ({ session }: { session: Session | null }) => {
  const form = useForm<InsertCategoryType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  const onsubmit = async (data: InsertCategoryType) => {
    const newData = {
      ...data,
      userId: session?.user?.id ?? "",
    };

    const response = await insertCategoryAction(newData);

    if ("error" in response) {
      toast.error(response.error);
      return;
    }

    toast.success(`Se ha creado la categoria '${data.name}' exitosamente`);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="flex w-full flex-col gap-2 "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la categoria</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="font-semibold" />
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmitting}
          className="disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? <IconLoader2 className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryCreationForm;

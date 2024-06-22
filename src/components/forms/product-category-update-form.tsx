// "use client";
// import { SelectCategoryType, SelectProductCategoryType } from "@/types";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Checkbox } from "../ui/checkbox";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";

// type props = {
//   categories: SelectCategoryType[];
//   productCategories: SelectProductCategoryType[];
// };

// const FormSchema = z.object({
//   categories: z
//     .array(z.string())
//     .refine((value) => value.some((item) => item), {
//       message: "Selecciona al menos una categoria",
//     }),
// });

// const ProductCategoryUpdateForm = ({
//   categories,
//   productCategories,
// }: props) => {
//   const newCategories = categories.map(({ id, name }) => ({
//     id: id.toString(),
//     name,
//   }));
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       categories: [],
//     },
//   });

//   console.log(productCategories);
//   return (
//     <Form {...form}>
//       <form action="">
//         <FormField
//           control={form.control}
//           name="categories"
//           render={() => (
//             <FormItem>
//               <div className="mb-4">
//                 <FormLabel className="text-base">Categorias</FormLabel>
//                 <FormDescription>
//                   {newCategories.length === 0
//                     ? "No tienes aun ninguna categoria"
//                     : "Selecciona las categorias para el producto"}
//                 </FormDescription>
//               </div>

//               {newCategories.map((item) => (
//                 <FormField
//                   key={item.id}
//                   control={form.control}
//                   name="categories"
//                   render={({ field }) => {
//                     return (
//                       <FormItem
//                         key={item.id}
//                         className="flex flex-row items-start space-x-3 space-y-0"
//                       >
//                         <FormControl>
//                           <Checkbox
//                             checked={field.value?.includes(item.id)}
//                             onCheckedChange={(checked) => {
//                               return checked
//                                 ? field.onChange([...field.value, item.id])
//                                 : field.onChange(
//                                     field.value?.filter(
//                                       (value) => value !== item.id,
//                                     ),
//                                   );
//                             }}
//                           />
//                         </FormControl>
//                         <FormLabel className="text-sm font-normal">
//                           {item.name}
//                         </FormLabel>
//                       </FormItem>
//                     );
//                   }}
//                 />
//               ))}
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </form>
//     </Form>
//   );
// };

// export default ProductCategoryUpdateForm;

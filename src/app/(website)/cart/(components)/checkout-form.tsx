"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { calculateTotalPrice, formatPricetoCOP } from "@/lib/utils";
import { SelectProductSchema } from "@/schemas/product";
import { useStoreItems } from "@/store/counter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Tu nombre no debe ser vacio",
  }),
  phone: z.coerce
    .number()
    .int()
    .refine(
      (value) => {
        const phoneString = value.toString(); // Convert to string for length and regex checks
        return (
          phoneString.length === 10 && /^(3\d{9}|601\d{7})$/.test(phoneString) // Regex for Colombian numbers
        );
      },
      {
        message: "Por favor ingresa un numero de celular valido",
      },
    ),
  paymentMethod: z.enum(["Efectivo", "Transferencia Bancaria"]),
  delivery: z.enum(["A domicilio", "Recogida en Tienda"]),
  cartItems: z.array(SelectProductSchema),
});

const CheckoutForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone: 0,
      cartItems: [],
    },
  });

  const cartItems = useStoreItems((state) => state.cartItems);

  const onsubmit = async (data: z.infer<typeof FormSchema>) => {
    const info = {
      ...data,
      cartItems,
    };

    const message = `Nuevo pedido:\nNombre: ${info.name}\nCelular: ${info.phone}\nEntrega: ${info.delivery}\nMetodo de pago: ${info.paymentMethod}\n\nProductos:\n${info.cartItems.map((item) => `- ${item.title} (${formatPricetoCOP(item.price)})\n`).join("")}\nMetodo de pago: ${info.paymentMethod}\nTotal: ${formatPricetoCOP(calculateTotalPrice(cartItems))}`;

    // Construct the WhatsApp URL (corrected)
    const whatsappURL = `https://wa.me/573002103171?text=${encodeURIComponent(message)}`; // Use wa.me

    // Redirect to WhatsApp in a new tab
    window.open(whatsappURL, "_blank");

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="mt-5 flex w-full flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa tu nombre aca" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Celular</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa tu numero de celular" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Metodo de pago</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar metodo de pago" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {FormSchema.shape.paymentMethod.options.map(
                    (product, idx) => (
                      <SelectItem key={idx} value={product}>
                        <span className="font-medium">{product}</span>
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="delivery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entrega del producto</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar metodo de recogida" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {FormSchema.shape.delivery.options.map((product, idx) => (
                    <SelectItem key={idx} value={product}>
                      <span className="font-medium">{product}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button>Enviar pedido</Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;

"use client";

import { calculateTotalPrice, cn, formatPricetoCOP } from "@/lib/utils";
import { useStoreItems } from "@/store/counter";
import CheckoutForm from "./checkout-form";

const CheckoutCard = () => {
  const cartItems = useStoreItems((state) => state.cartItems);

  const totalPrice = formatPricetoCOP(calculateTotalPrice(cartItems));

  return (
    <section
      className={cn("flex-1", {
        hidden: cartItems.length === 0,
      })}
    >
      <h2 className="text-3xl font-medium -tracking-wider">Checkout</h2>

      <p>El total de tu pedido es de {totalPrice} COP</p>

      <CheckoutForm />
    </section>
  );
};

export default CheckoutCard;

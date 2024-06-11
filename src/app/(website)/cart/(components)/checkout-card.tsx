"use client";

import { cn, formatPricetoCOP } from "@/lib/utils";
import { useStoreItems } from "@/store/counter";

const CheckoutCard = () => {
  const cartItems = useStoreItems((state) => state.cartItems);

  const totalPrice = formatPricetoCOP(
    cartItems.map((item) => item.price).reduce((acc, price) => acc + price, 0),
  );

  return (
    <section
      className={cn("flex-1", {
        hidden: cartItems.length === 0,
      })}
    >
      <h2 className="text-3xl font-medium -tracking-wider">Checkout</h2>

      <p>El total de tu pedido es de {totalPrice} COP</p>
    </section>
  );
};

export default CheckoutCard;

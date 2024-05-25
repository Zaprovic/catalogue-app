// AddCartBtn.tsx
"use client";

import { cn } from "@/lib/utils";
import { useStoreItems } from "@/store/counter";
import { SelectProductType } from "@/types";
import { IconCircleCheck, IconShoppingCart } from "@tabler/icons-react";
import { Button } from "./ui/button";

const AddCartBtn = (product: SelectProductType) => {
  const isPressed = useStoreItems(
    (state) => state.pressedProducts[product.id] || false,
  );
  const toggleProductInCart = useStoreItems(
    (state) => state.toggleProductInCart,
  );

  return (
    <>
      <Button
        onClick={() => toggleProductInCart(product.id)}
        className={cn(
          "flex w-full gap-2 font-semibold hover:bg-secondary-foreground",
          {
            "bg-emerald-500": isPressed,
          },
        )}
      >
        {isPressed ? (
          <div className="flex w-full items-center justify-center gap-2">
            <IconCircleCheck />
            <span>Producto añadido!</span>
          </div>
        ) : (
          <>
            <IconShoppingCart />
            <span>Añadir al carrito</span>
          </>
        )}
      </Button>
    </>
  );
};

export default AddCartBtn;

// "use client";

// import { useStoreItems } from "@/store/counter";
// import { IconCircleCheck, IconShoppingCart } from "@tabler/icons-react";
// import { useState } from "react";
// import { Button } from "./ui/button";
// import { Toggle } from "./ui/toggle";

// const AddCartBtn = ({ productId }: { productId: number }) => {
//   const [text, setText] = useState("Añadir al carrito");
//   const [isPressed, setIsPressed] = useState(false);

//   /** Global state
//    * ?: Here is where we can use the global state variables to add or remove items from the cart
//    */
//   const increaseItems = useStoreItems((state) => state.increaseItems);
//   const decreaseItems = useStoreItems((state) => state.decreaseItems);

//   const handleOnPressedChange = () => {
//     setIsPressed(!isPressed);
//     setText(isPressed ? "Añadir al carrito" : "Producto añadido!");
//     isPressed ? decreaseItems() : increaseItems();
//   };

//   return (
//     <Button asChild>
//       <Toggle
//         aria-label="Toggle add to cart"
//         className="flex w-full gap-2 hover:text-primary-foreground data-[state=on]:bg-emerald-500 data-[state=on]:text-primary-foreground"
//         variant={"outline"}
//         onPressedChange={handleOnPressedChange}
//       >
//         {!isPressed ? <IconShoppingCart /> : <IconCircleCheck />}
//         <span>{text}</span>
//       </Toggle>
//     </Button>
//   );
// };

// export default AddCartBtn;

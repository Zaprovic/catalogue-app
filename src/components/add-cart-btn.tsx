// AddCartBtn.tsx
"use client";

import { useStoreItems } from "@/store/counter";
import { IconCircleCheck, IconShoppingCart } from "@tabler/icons-react";
import { Button } from "./ui/button";

const AddCartBtn = ({ productId }: { productId: number }) => {
  const isPressed = useStoreItems(
    (state) => state.pressedProducts[productId] || false,
  );
  const toggleProductInCart = useStoreItems(
    (state) => state.toggleProductInCart,
  );

  return (
    <>
      <Button
        onClick={() => toggleProductInCart(productId)}
        className={"flex w-full gap-2"}
      >
        {isPressed ? (
          <>
            <IconCircleCheck className="text-emerald-500" />
            <span className="text-emerald-500">Producto añadido!</span>
          </>
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

"use client";

import { IconCircleCheck, IconShoppingCart } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";

const AddCartBtn = () => {
  const [text, setText] = useState("Añadir al carrito");
  const [isPressed, setIsPressed] = useState(false);

  const handleOnPressedChange = () => {
    setIsPressed(!isPressed);
    setText(isPressed ? "Añadir al carrito" : "Producto añadido!");
  };

  return (
    <Button asChild>
      <Toggle
        aria-label="Toggle add to cart"
        className="flex w-full gap-2 hover:text-primary-foreground data-[state=on]:bg-emerald-500 data-[state=on]:text-primary-foreground"
        variant={"outline"}
        onPressedChange={handleOnPressedChange}
      >
        {!isPressed ? <IconShoppingCart /> : <IconCircleCheck />}
        <span>{text}</span>
      </Toggle>
    </Button>
  );
};

export default AddCartBtn;

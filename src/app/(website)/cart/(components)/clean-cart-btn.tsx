"use client";

import { Button } from "@/components/ui/button";
import { useStoreItems } from "@/store/counter";

const CleanCartBtn = () => {
  const removeAll = useStoreItems((state) => state.removeAllItems);

  return (
    <Button className="mt-5" onClick={() => removeAll()}>
      Limpiar el carrito
    </Button>
  );
};

export default CleanCartBtn;

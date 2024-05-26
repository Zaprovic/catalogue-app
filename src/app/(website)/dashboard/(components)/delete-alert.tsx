"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { SelectProductType } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

const DeleteAlert = ({ id }: { id: SelectProductType["id"] }) => {
  const [product, setProduct] = useState<SelectProductType[]>([]);

  const handleClick = async (id: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        next: {
          tags: ["dashboard-products"],
        },
      });

      if (!response.ok) {
        const text = response.statusText;
        toast.error(text);
        return;
      }
      const productToDelete = await response.json();
      console.log(productToDelete);
      toast.success("Producto eliminado");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("EOOREOREOEOEROERER");
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" variant={"destructive"}>
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de eliminar este producto?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-4">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild onClick={() => handleClick(id)}>
            <Button>Si, estoy seguro</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;

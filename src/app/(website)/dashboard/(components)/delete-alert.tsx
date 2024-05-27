// "use client";
import { deleteProductAction } from "@/actions/product-actions";
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
import { toast } from "sonner";

const DeleteAlert = ({ id }: { id: SelectProductType["id"] }) => {
  // const [product, setProduct] = useState<SelectProductType[]>([]);
  // const formData = new FormData();
  // formData.append("id", `${id}`);

  const handleClick = async (id: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        next: { tags: ["delete-product"] },
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
          <form action={deleteProductAction.bind(null, id)}>
            <AlertDialogAction asChild>
              <Button type="submit" variant={"destructive"}>
                Si, estoy seguro
              </Button>
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;

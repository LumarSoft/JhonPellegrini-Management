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
import { updateData } from "@/services/mysql/functions";
import { IClient } from "@/shared/types/IClient";
import { RefreshCcw } from "lucide-react";

export const ToggleStatus = ({
  data,
  onDataUpdate,
}: {
  data: IClient;
  onDataUpdate: (updateItem: IClient) => void;
}) => {
  const handleChange = async () => {
    const result = await updateData("empresas/change-state", data.dni, {
      estado: data.estado === "Activo" ? "Inactivo" : "Activo",
    });

    if (result !== undefined && result !== null) {
      onDataUpdate({
        ...data,
        estado: data.estado === "Activo" ? "Inactivo" : "Activo",
      });
    } else {
      console.error("Failed to update status");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex gap-2 bg-red-600 hover:bg-red-700">
          Estado <RefreshCcw />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Estas seguro de cambiar el estado?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esto cambiara el estado de la empresa {data.nya_razonsocial} a{" "}
            {data.estado === "Activo" ? "Inactivo" : "Activo"} dentro del
            sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleChange}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

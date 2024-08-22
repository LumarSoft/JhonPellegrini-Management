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
import { updateData } from "@/services/request";
import { ICliente } from "@/shared/types/IClient";
import { RefreshCcw } from "lucide-react";
import { toast } from "react-toastify";

export const ToggleStatus = ({
  data,
  onDataUpdate,
}: {
  data: ICliente;
  onDataUpdate: (updateItem: ICliente) => void;
}) => {


  const handleChange = async () => {
    const formData = new FormData();
    formData.append(
      "newState",
      data.estado === "activo" ? "inactivo" : "activo"
    );

    const response = await updateData(
      `clientes/changeState/${data.dni}`,
      formData
    );

    if (response.message === "Datos actualizados") {
      onDataUpdate({
        ...data,
        estado: data.estado === "activo" ? "inactivo" : "activo",
      });
      toast.success("Datos actualizados");
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

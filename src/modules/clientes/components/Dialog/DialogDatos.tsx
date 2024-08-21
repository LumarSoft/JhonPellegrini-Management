import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateData } from "@/services/request";
import { ICliente } from "@/shared/types/IClient";
import { Label } from "@radix-ui/react-label";
import { Eye } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const DialogDatos = ({
  data,
  onDataUpdate,
}: {
  data: ICliente;
  onDataUpdate: (updatedItem: ICliente) => void;
}) => {
  const [nombre, setNombre] = useState(data.nya_razonsocial);
  const [celular, setCelular] = useState(data.celular);
  const [email, setEmail] = useState(data.email);
  const [direccion, setDireccion] = useState(data.direccion);
  const [agenda, setAgenda] = useState(data.agenda);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nya_razonsocial", nombre);
    formData.append("celular", celular);
    formData.append("email", email);
    formData.append("direccion", direccion);
    formData.append("agenda", agenda);

    try {
      const response = await updateData(
        `clientes/updateClient/${data.dni}`,
        formData
      );

      onDataUpdate({
        ...data,
        nya_razonsocial: nombre,
        celular,
        email,
        direccion,
        agenda,
      });


      if (response.message === "Datos actualizados") {
        return toast.success("Datos actualizados");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          Ver <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form className="w-full" onSubmit={handleUpdate}>
          <div>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-semibold">
                Datos
              </DialogTitle>
            </DialogHeader>
            <div>
              <Label>
                Nombre
                <Input
                  defaultValue={data.nya_razonsocial}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Label>
              <Label>
                Cuit
                <Input defaultValue={data.cuit} disabled />
              </Label>
              <Label>
                DNI
                <Input defaultValue={data.dni} disabled />
              </Label>
              <Label>
                Celular
                <Input
                  defaultValue={data.celular}
                  onChange={(e) => setCelular(e.target.value)}
                />
              </Label>
              <Label>
                Email
                <Input
                  defaultValue={data.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Label>
              <Label>
                Direccion
                <Input
                  defaultValue={data.direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </Label>
              <Label>
                Agenda
                <Textarea
                  defaultValue={data.agenda}
                  onChange={(e) => setAgenda(e.target.value)}
                />
              </Label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose type="submit" className="w-full mt-4">
              Guardar cambios
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

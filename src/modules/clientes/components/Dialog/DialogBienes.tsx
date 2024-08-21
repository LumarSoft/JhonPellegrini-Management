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
import { deleteData, postData, updateData } from "@/services/request";
import { ICliente } from "@/shared/types/IClient";
import { Label } from "@radix-ui/react-label";
import { Car } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IBien } from "@/shared/types/IBien";

const DialogBienes = ({ clienteData }: { clienteData: ICliente }) => {
  const [bienes, setBienes] = useState<IBien[]>([]);
  const [bienSeleccionado, setBienSeleccionado] = useState<IBien>();

  const [idBien, setIdBien] = useState(0);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState(0);
  const [cobertura, setCobertura] = useState("");
  const [monto, setMonto] = useState(0);
  const [accesorios, setAccesorios] = useState("");
  const [adicionales, setAdicionales] = useState("");
  const [patente, setPatente] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/bienes/getBienes/${clienteData.dni}`
        );
        const data = await response.json();
        setBienes(data);
        setBienSeleccionado(data[0]);
      } catch (error) {
        toast.error("Error al cargar los datos");
      }
    };
    if (clienteData.dni) {
      fetchData();
    }
  }, [clienteData.dni]);

  useEffect(() => {
    if (bienSeleccionado) {
      setIdBien(bienSeleccionado.id_bien);
      setMarca(bienSeleccionado.marca);
      setModelo(bienSeleccionado.modelo);
      setAnio(bienSeleccionado.anio);
      setCobertura(bienSeleccionado.cobertura);
      setMonto(bienSeleccionado.monto);
      setAccesorios(bienSeleccionado.accesorios);
      setAdicionales(bienSeleccionado.adicionales);
      if (bienSeleccionado.patente) {
        setPatente(bienSeleccionado.patente);
      }
    }
  }, [bienSeleccionado]);

  const changeSeleccionado = (value: string) => {
    if (value !== "Agregar nuevo bien") {
      const bien = bienes.find((bien) => bien.modelo === value);
      setBienSeleccionado(bien);
    } else {
      setBienSeleccionado({
        id_bien: 0,
        marca: "",
        modelo: "",
        patente: "",
        anio: 0,
        cobertura: "",
        monto: 0,
        accesorios: "",
        adicionales: "",
      });
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bienSeleccionado) return;

    const formData = new FormData();
    formData.append("dni_cliente", clienteData.dni);
    formData.append("marca", marca);
    formData.append("modelo", modelo);
    formData.append("patente", patente);
    formData.append("anio", String(anio));
    formData.append("cobertura", cobertura);
    formData.append("monto", String(monto));
    formData.append("accesorios", accesorios);
    formData.append("adicionales", adicionales);

    if (idBien === 0) {
      try {
        const result = await postData("bienes/addBien", formData);
        if (result.message === "Bien agregado") {
          setBienes((prevBienes) => [...prevBienes, bienSeleccionado!]);
          return toast.success("Bien agregado correctamente");
        }
      } catch (error) {
        return toast.error("Error al agregar el bien");
      }
    } else {
      try {
        const result = await updateData(
          `bienes/updateBien/${idBien}`,
          formData
        );
        if (result.message === "Datos actualizados") {
          setBienes((prevBienes) =>
            prevBienes.map((bien) => {
              if (bien.id_bien === idBien) {
                return {
                  ...bien,
                  marca,
                  modelo,
                  patente,
                  anio,
                  cobertura,
                  monto,
                  accesorios,
                  adicionales,
                };
              }
              return bien;
            })
          );
          return toast.success("Datos actualizados correctamente");
        }
      } catch (error) {
        return toast.error("Error al actualizar el bien");
      }
    }
  };

  const handleDelete = async () => {
    if (!bienSeleccionado) return;

    try {
      const result = await deleteData(
        `bienes/deleteBien`,
        bienSeleccionado.id_bien
      );
      if (result.message === "Bien eliminado") {
        setBienes((prevBienes) =>
          prevBienes.filter((bien) => bien.id_bien !== bienSeleccionado.id_bien)
        );
        setBienSeleccionado(bienes[0]);
        return toast.success("Bien eliminado correctamente");
      }
    } catch (error) {
      return toast.error("Error al eliminar el bien");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2 bg-green-500 hover:bg-green-600">
          Bienes <Car />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form className="w-full" onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-semibold">
              Bienes
            </DialogTitle>
          </DialogHeader>
          {bienes.length > 0 ? (
            <div>
              <Select
                value={bienSeleccionado?.modelo}
                onValueChange={changeSeleccionado}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bienes.map((bien: IBien) => (
                    <SelectItem key={bien.id_bien} value={bien.modelo}>
                      {bien.modelo}
                    </SelectItem>
                  ))}
                  <SelectItem value="Agregar nuevo bien">
                    Agregar nuevo bien
                  </SelectItem>
                </SelectContent>
              </Select>
              <Label>
                Marca
                <Input
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                />
              </Label>
              <Label>
                Modelo
                <Input
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                />
              </Label>
              <Label>
                Patente
                <Input
                  value={patente}
                  onChange={(e) => setPatente(e.target.value)}
                />
              </Label>
              <Label>
                Año
                <Input
                  value={anio}
                  onChange={(e) => setAnio(Number(e.target.value))}
                />
              </Label>
              <Label>
                Cobertura
                <Input
                  value={cobertura}
                  onChange={(e) => setCobertura(e.target.value)}
                />
              </Label>
              <Label>
                Monto
                <Input
                  value={monto}
                  type="number"
                  onChange={(e) => setMonto(Number(e.target.value))}
                />
              </Label>
              <Label>
                Accesorios
                <Input
                  value={accesorios}
                  onChange={(e) => setAccesorios(e.target.value)}
                />
              </Label>
              <Label>
                Adicionales
                <Input
                  value={adicionales}
                  onChange={(e) => setAdicionales(e.target.value)}
                />
              </Label>
            </div>
          ) : (
            <span>No hay bienes registrados</span>
          )}
          <DialogFooter className="mt-4">
            <DialogClose className="w-full" asChild>
              <Button variant={"destructive"} onClick={handleDelete}>
                Eliminar bien
              </Button>
            </DialogClose>
            <DialogClose className="w-full" asChild>
              <Button variant={"default"} type="submit">
                Guardar cambios
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBienes;

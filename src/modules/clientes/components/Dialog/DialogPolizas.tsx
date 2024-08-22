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
import { ICliente } from "@/shared/types/IClient";
import { IPoliza } from "@/shared/types/IPoliza";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const DialogPolizas = ({ clienteData }: { clienteData: ICliente }) => {
  const [polizas, setpolizas] = useState<IPoliza[]>([]);
  const [polizaSeleccionada, setPolizaSeleccionada] = useState<IPoliza>();

  const [certificado, setCertificado] = useState("");
  const [articulo, setArticulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [rama, setRama] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/polizas/getPolizas/${clienteData.dni}`
        );
        const data = await response.json();
        setpolizas(data);
        setPolizaSeleccionada(data[0]);
      } catch (error) {
        toast.error("Error al cargar los datos");
      }
    };
    if (clienteData.dni) {
      fetchData();
    }
  }, [clienteData.dni]);

  useEffect(() => {
    if (polizaSeleccionada) {
      setCertificado(polizaSeleccionada.certificado);
      setArticulo(polizaSeleccionada.articulo);
      setDescripcion(polizaSeleccionada.descripcion);
      setRama(polizaSeleccionada.rama);
    }
  }, [polizaSeleccionada]);

  const changeSeleccionado = (value: string) => {
    if (value !== "Agregar nueva poliza") {
      const poliza = polizas.find((p) => p.certificado === value);
      setPolizaSeleccionada(poliza);
    } else {
      setPolizaSeleccionada({
        certificado: "",
        articulo: "",
        descripcion: "",
        rama: "",
      });
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleDelete = async () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Polizas</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-semibold">
              Polizas
            </DialogTitle>
          </DialogHeader>
          {polizas.length > 0 ? (
            <div>
              <Select
                value={polizaSeleccionada?.certificado || ""}
                onValueChange={changeSeleccionado}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {polizas.map((poliza: IPoliza) => (
                    <SelectItem
                      key={poliza.certificado}
                      value={poliza.certificado}
                    >
                      {poliza.certificado}
                    </SelectItem>
                  ))}
               
                </SelectContent>
              </Select>
              <Label>
                Certificado
                <Input value={certificado} disabled />
              </Label>
              <Label>
                Articulo
                <Input
                  value={articulo}
                  onChange={(e) => setArticulo(e.target.value)}
                />
              </Label>
              <Label>
                Descripcion
                <Input
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </Label>
              <Label>
                Rama
                <Input value={rama} onChange={(e) => setRama(e.target.value)} />
              </Label>
            </div>
          ) : (
            <span>No hay polizas registradas</span>
          )}
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button className="w-full">Cerrar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

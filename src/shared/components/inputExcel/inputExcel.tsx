"use client";
import * as XLSX from "xlsx";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export const InputExcel = ({ URLPost }: { URLPost: string }) => {
  const [items, setItems] = useState<any[]>([]);

  const readExcel = (file: File) => {
    if (!file) return;

    const promise = new Promise<any[]>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        if (!e.target) return;

        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const dataRange = XLSX.utils.decode_range("A4:Z1000");

        const data = XLSX.utils.sheet_to_json(ws, { range: dataRange });

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  const sendExcel = async () => {
    if (items.length === 0) {
      toast.error("No hay datos para enviar");
      return;
    }

    try {
      const response = await axios.post(
        `http://25.0.120.26:3008/${URLPost}`,
        items,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Manejar la respuesta del servidor según sea necesario
      console.log("Respuesta del servidor:", response.data);
      toast.success("Datos enviados exitosamente");
    } catch (error) {
      // Manejar errores en la solicitud
      console.error("Error al enviar los datos:", error);
      toast.error("Error al enviar los datos");
    }
  };

  return (
    <div className="w-96 border px-4 py-4 rounded flex flex-col gap-4 text-white">
      <Label className="text-start">Inserte Excel aquí</Label>
      <Input
        type="file"
        accept=".xlsx, .xls"
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          readExcel(file as File);
        }}
      />
      <Button onClick={sendExcel}>Enviar</Button>
      <ToastContainer />
    </div>
  );
};

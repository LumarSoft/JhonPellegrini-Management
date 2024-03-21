"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import * as XLSX from "xlsx";

export const DashboardModule = () => {
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
        const data = XLSX.utils.sheet_to_json(ws);

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

  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="w-96 border px-4 py-10 rounded">
        <Label>Inserte Excel aquí</Label>
        <Input
          type="file"
          accept=".xlsx"
          onChange={(e) => {
            const file = e.target.files && e.target.files[0];
            readExcel(file as File); // Añade la aserción de tipo aquí si es necesario
          }}
        />
        <Button>Enviar</Button>
      </div>
    </main>
  );
};

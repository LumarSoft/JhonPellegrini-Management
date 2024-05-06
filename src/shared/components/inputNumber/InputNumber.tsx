"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";

export const InputNumber = () => {
  const [number, setNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://john-api.com:3008/blacklist",
        { number: number },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className="flex flex-col justify-center gap-4"
      onSubmit={handleSubmit}
    >
      <div>
        <Label>Escriba el numero del cliente</Label>
        <Input type="number" onChange={(e) => setNumber(e.target.value)} />
      </div>
      <Button type="submit">Enviar</Button>
      <p>
        <span className="text-red-600 font-bold">RECORDATORIO:</span> Es necesario poner el numero completo. ej: +5493415690470
      </p>
    </form>
  );
};

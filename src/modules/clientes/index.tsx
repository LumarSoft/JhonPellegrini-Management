"use client";
import { useState } from "react";
import { DataTable } from "./components/Table/Data-Table";
import { createColumns } from "./components/Table/Columns";
import { ICliente } from "@/shared/types/IClient";

export const ClientesModule = ({ data }: { data: ICliente[] }) => {
  const [clientes, setClientes] = useState(data);

  // const handleAdd = (newItem: ICliente) => {
  //   setClientes([...clientes, newItem]);
  // };

  const handleUpdate = (updateItem: ICliente) => {
    const newData = clientes.map((item) =>
      item.dni === updateItem.dni ? updateItem : item
    );
    setClientes(newData);
  };

  const columns = createColumns(handleUpdate);

  return (
    <div className="flex w-full h-full flex-col items-center py-10 px-10">
      <h1 className="text-4xl font-semibold">Clientes</h1>
      <DataTable columns={columns} data={clientes} />
    </div>
  );
};

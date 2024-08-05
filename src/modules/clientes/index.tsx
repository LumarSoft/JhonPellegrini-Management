"use client";
import { useState } from "react";
import { DataTable } from "./components/Table/Data-Table";
import { createColumns } from "./components/Table/Columns";
import { IClient } from "@/shared/types/IClient";

export const ClientesModule = ({ data }: { data: IClient[] }) => {
  const [clientes, setClientes] = useState(data);

  const handleUpdate = (updateItem: IClient) => {
    const newData = clientes.map((item) =>
      item.dni === updateItem.dni ? updateItem : item
    );
    setClientes(newData);
  };

  const handleDelete = (deleteItem: IClient) => {
    const newData = clientes.filter((item) => item.dni !== deleteItem.dni);
    setClientes(newData);
  };

  const handleAdd = (newItem: IClient) => {
    setClientes([...clientes, newItem]);
  };

  const columns = createColumns(handleUpdate, handleDelete);

  return (
    <div className="flex w-full h-full flex-col items-center py-10 px-10">
      <h1 className="text-4xl font-semibold">Clientes</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

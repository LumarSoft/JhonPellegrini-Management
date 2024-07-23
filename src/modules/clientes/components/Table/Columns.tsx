"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { ToggleStatus } from "../AlertDialogs/ToggleStatus";
import { Delete } from "../AlertDialogs/Delete";
import { Button } from "@/components/ui/button";
import { DialogComponent } from "../Dialog/Dialog";
import { ICliente } from "@/shared/types/ICliente";

export const createColumns = (
  onDataUpdate: (updatedItem: ICliente) => void,
  onDataDelete: (deleteItem: ICliente) => void,
  onDataAdd: (newItem: ICliente) => void
): ColumnDef<ICliente>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "documento",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Documento
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <DialogComponent data={row.original} />
          <ToggleStatus data={row.original} onDataUpdate={onDataUpdate} />
          <Delete data={row.original} />
        </div>
      );
    },
  },
];

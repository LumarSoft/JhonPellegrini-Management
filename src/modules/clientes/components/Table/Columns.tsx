"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { ToggleStatus } from "../AlertDialogs/ToggleStatus";
import { Button } from "@/components/ui/button";
import { DialogComponent } from "../Dialog/Dialog";
import { IClient } from "@/shared/types/IClient";

export const createColumns = (
  onDataUpdate: (updatedItem: IClient) => void,
  onDataAdd: (newItem: IClient) => void
): ColumnDef<IClient>[] => [
  {
    accessorKey: "dni",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DNI
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "nya_razonsocial",
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
    accessorKey: "cuit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cuit
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
        </div>
      );
    },
  },
];

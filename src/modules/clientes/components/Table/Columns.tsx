import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { ToggleStatus } from "../AlertDialogs/ToggleStatus";
import { Button } from "@/components/ui/button";
import { DialogDatos } from "../Dialog/DialogDatos";
import { ICliente } from "@/shared/types/IClient";
import DialogBienes from "../Dialog/DialogBienes";
import { DialogPolizas } from "../Dialog/DialogPolizas";

export const createColumns = (
  onDataUpdate: (updatedItem: ICliente) => void
): ColumnDef<ICliente>[] => [
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
    accessorKey: "estado",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
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
          <DialogPolizas clienteData={row.original} />
          <DialogBienes clienteData={row.original} />
          <DialogDatos data={row.original} onDataUpdate={onDataUpdate} />
          <ToggleStatus data={row.original} onDataUpdate={onDataUpdate} />
        </div>
      );
    },
  },
];

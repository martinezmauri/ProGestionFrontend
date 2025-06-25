import { IService } from "@interfaces/IService";
import { Button } from "@ui/button";
import { Skeleton } from "@ui/skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableFooter,
  TableCaption,
} from "@ui/table";
import { Pencil } from "lucide-react";
import React from "react";

interface Props {
  services: IService[];
  loading?: boolean;
  onEdit?: (service: IService) => void;
}

export const ServicesTable = ({ services, loading, onEdit }: Props) => {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full rounded-md" />
        ))}
      </div>
    );
  }
  if (services.length === 0) {
    return (
      <div className="text-center py-10">No hay servicios registrados aún.</div>
    );
  }
  return (
    <Table className="w-full text-sm border border-border rounded-md overflow-hidden ">
      <TableHeader>
        <TableRow className="bg-muted/50 text-muted-foreground">
          <TableHead>Nombre</TableHead>
          <TableHead>Duracion</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {services.map((s, index) => {
          return (
            <TableRow
              key={index}
              className="odd:bg-muted/40 hover:bg-muted transition-colors"
            >
              <TableCell className="font-medium flex items-center gap-2">
                {s.name}
              </TableCell>
              <TableCell>{s.duration} minutos</TableCell>
              <TableCell>${s.price}</TableCell>
              <TableCell className="max-w-[150px] truncate">
                {s.description}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {onEdit && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(s)}
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  )}
                  <Button size="sm" variant="destructive">
                    Eliminar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total de servicios</TableCell>
          <TableCell className="text-right">{services.length}</TableCell>
        </TableRow>
      </TableFooter>

      <TableCaption>Listado de servicios registrados.</TableCaption>
    </Table>
  );
};

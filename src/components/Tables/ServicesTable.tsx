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
import { Pencil, Users, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  services: IService[];
  loading?: boolean;
  onEdit?: (service: IService) => void;
  onDelete?: (service: IService) => void;
}

export const ServicesTable = ({ services = [], loading, onEdit, onDelete }: Props) => {
  // Ensure services is always an array to prevent crashes
  const safeServices = Array.isArray(services) ? services : [];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = safeServices.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = safeServices.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full rounded-md" />
        ))}
      </div>
    );
  }
  if (safeServices.length === 0) {
    return (
      <div className="text-center py-10">No hay servicios registrados aún.</div>
    );
  }
  return (
    <Table className="w-full text-sm border border-border rounded-md overflow-hidden ">
      <TableHeader>
        <TableRow className="bg-muted/50 text-muted-foreground">
          <TableHead>Nombre</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Duración</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Empleados Asig.</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {currentItems.map((s, index) => {
          return (
            <TableRow
              key={index}
              className="odd:bg-muted/40 hover:bg-muted transition-colors"
            >
              <TableCell className="font-medium flex items-center gap-2">
                {s.name}
              </TableCell>
              <TableCell>
                {s.category ? (
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-md text-xs font-medium">
                    {s.category}
                  </span>
                ) : (
                  <span className="text-gray-400 italic text-xs">Sin categoría</span>
                )}
              </TableCell>
              <TableCell>{s.duration} minutos</TableCell>
              <TableCell>${s.price}</TableCell>
              <TableCell>
                {s.isActive !== false ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    Activo
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                    Inactivo
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors w-fit px-2.5 py-1 rounded-full text-xs font-semibold">
                  <Users className="w-3.5 h-3.5" />
                  {s.employeeIds?.length || 0}
                </div>
              </TableCell>
              <TableCell className="max-w-[150px] truncate text-slate-600" title={s.description}>
                {s.description || "Sin descripción"}
              </TableCell>
              <TableCell className="text-right flex justify-end">
                <div className="flex gap-2">
                  {onEdit && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-slate-600 hover:text-orange-600 hover:border-orange-200"
                      onClick={() => onEdit(s)}
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-red-50 hover:bg-red-100 text-red-600 border-0 shadow-none"
                      onClick={() => onDelete(s)}
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>

      <TableFooter>
        <TableRow className="bg-slate-50 border-t">
          <TableCell colSpan={8}>
            <div className="flex items-center justify-between w-full">
              <span className="text-sm text-slate-600">
                Mostrando {startIndex + 1} - {Math.min(startIndex + itemsPerPage, totalItems)} de {totalItems} servicios
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="h-8 px-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-slate-600 font-medium">
                  {currentPage} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 px-2"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

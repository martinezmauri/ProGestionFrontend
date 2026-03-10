import {
  IEmployee,
  IEmployeeEditResponse,
  IEmployeeResponse,
} from "@interfaces/IEmployee";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Skeleton } from "@ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/table";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
interface Props {
  employees: IEmployeeResponse[];
  loading?: boolean;
  onEdit?: (employee: IEmployeeResponse) => void;
}

export const PersonalTable = ({ employees = [], loading, onEdit }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Ensure employees is always an array to prevent crashes
  const safeEmployees = Array.isArray(employees) ? employees : [];

  // Pagination logic
  const totalPages = Math.ceil(safeEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = safeEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (safeEmployees.length === 0) {
    return (
      <div className="text-center py-10">No hay empleados registrados aún.</div>
    );
  }
  return (
    <Table className="w-full text-sm border border-border rounded-md overflow-hidden ">
      <TableHeader>
        <TableRow className="bg-muted/50 text-muted-foreground">
          <TableHead>Empleado</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead>Servicios</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {currentItems.map((t, index) => {
          return (
            <TableRow
              key={t.id || index}
              className="odd:bg-muted/40 hover:bg-muted transition-colors"
            >
              <TableCell className="font-medium flex items-center gap-2">
                <img
                  src={t?.profile_picture || "/default-avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />

                {t.name}
              </TableCell>
              <TableCell>{t.role ?? "No tiene rol"}</TableCell>
              <TableCell>
                {t.services && t.services.length > 0
                  ? t.services.map((s) => s.name).join(", ")
                  : "Sin servicios asignados"}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {onEdit && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(t)}
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
          <TableCell colSpan={4}>
            <div className="flex items-center justify-between w-full">
              <span className="text-sm text-slate-500">
                Mostrando {Math.min(startIndex + 1, safeEmployees.length)} -{" "}
                {Math.min(startIndex + itemsPerPage, safeEmployees.length)} de{" "}
                {safeEmployees.length} empleados
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium px-2">
                  Página {currentPage} de {Math.max(totalPages, 1)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>

      <TableCaption>Listado de empleados registrados.</TableCaption>
    </Table>
  );
};

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
import { Pencil } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
interface Props {
  employees: IEmployeeResponse[];
  loading?: boolean;
  onEdit?: (employee: IEmployeeResponse) => void;
}

export const PersonalTable = ({ employees, loading, onEdit }: Props) => {
  console.log(employees);

  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (employees.length === 0) {
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
        {employees.map((t, index) => {
          return (
            <TableRow
              key={index}
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
              <TableCell>{t.rol ?? "No tiene rol"}</TableCell>
              <TableCell>
                {t.services.length > 0
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
          <TableCell colSpan={3}>Total de empleados</TableCell>
          <TableCell className="text-right">{employees.length}</TableCell>
        </TableRow>
      </TableFooter>

      <TableCaption>Listado de empleados registrados.</TableCaption>
    </Table>
  );
};

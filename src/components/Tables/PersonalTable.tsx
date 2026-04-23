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

const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const AVATAR_COLORS = [
  "bg-orange-400", "bg-sky-500", "bg-emerald-500",
  "bg-violet-500", "bg-rose-400", "bg-amber-500", "bg-teal-500",
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

function getAvatarColor(name: string): string {
  const idx = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

function formatTime(t: string | null): string {
  if (!t) return "";
  return t.substring(0, 5);
}

function isNowInRange(start: string | null, end: string | null): boolean {
  if (!start || !end) return false;
  const now = new Date();
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const nowMins = now.getHours() * 60 + now.getMinutes();
  return nowMins >= sh * 60 + sm && nowMins < eh * 60 + em;
}

function getTodayInfo(hours: IWorkSchedule[]) {
  const today = new Date().getDay();
  const schedule = hours.find((h) => h.dayOfWeek === today) ?? null;
  if (!schedule || !schedule.isWorkingDay) return { status: "libre" as const, label: DAYS[today], blocks: null };

  const inMorning = isNowInRange(schedule.morningStart, schedule.morningEnd);
  const inAfternoon = isNowInRange(schedule.afternoonStart, schedule.afternoonEnd);
  const status = inMorning || inAfternoon ? "disponible" as const : "fuera" as const;

  const blocks = [
    schedule.morningStart && schedule.morningEnd
      ? `${formatTime(schedule.morningStart)} - ${formatTime(schedule.morningEnd)}`
      : null,
    schedule.afternoonStart && schedule.afternoonEnd
      ? `${formatTime(schedule.afternoonStart)} - ${formatTime(schedule.afternoonEnd)}`
      : null,
  ].filter(Boolean).join(" · ");

  return { status, label: DAYS[today], blocks };
}

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
          <TableHead className="w-12"></TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead>Servicios</TableHead>
          <TableHead>Horario hoy</TableHead>
          <TableHead>Estado</TableHead>
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
              <TableCell className="w-12 pr-0">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${getAvatarColor(t.name)}`}>
                  {getInitials(t.name)}
                </div>
              </TableCell>
              <TableCell className="font-medium">{t.name}</TableCell>
              <TableCell>{t.role ?? "No tiene rol"}</TableCell>
              <TableCell>
                {t.services && t.services.length > 0
                  ? t.services.map((s) => s.name).join(", ")
                  : "Sin servicios asignados"}
              </TableCell>
              {(() => {
                const { status, label, blocks } = getTodayInfo(t.employeeHours ?? []);
                return (
                  <>
                    <TableCell className="text-sm text-slate-600">
                      {status === "libre" ? (
                        <span className="text-slate-400 italic">Día libre</span>
                      ) : (
                        <span>{blocks}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {status === "disponible" && (
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
                          Disponible
                        </Badge>
                      )}
                      {status === "fuera" && (
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100">
                          Fuera de horario
                        </Badge>
                      )}
                      {status === "libre" && (
                        <Badge className="bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-100">
                          Día libre
                        </Badge>
                      )}
                    </TableCell>
                  </>
                );
              })()}
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
          <TableCell colSpan={7}>
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

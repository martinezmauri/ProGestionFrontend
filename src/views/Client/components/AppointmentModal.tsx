import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@ui/dialog";
import { Button } from "@ui/button";
import { Label } from "@ui/label";
import { Input } from "@ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import {
  CalendarDays,
  Clock,
  User,
  Briefcase,
  Loader2,
  Trash2,
  Save,
  Plus,
} from "lucide-react";
import type { IAppointment, IGridEmployee } from "@interfaces/IAppointment";
import type { IService } from "@interfaces/IService";
import { cn } from "@lib/utils";

export type ModalMode = "create" | "edit";

interface AppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: ModalMode;
  // Pre-filled data (from slot click or existing appointment)
  initialData?: {
    date?: string;
    time?: string;
    employeeId?: number;
    appointment?: IAppointment;
  };
  employees: IGridEmployee[];
  services: IService[];
  onSave: (data: {
    appointmentDate: string;
    startTime: string;
    employeeId: number;
    serviceId: number;
    clientName?: string;
    clientEmail?: string;
    clientPhone?: string;
  }) => Promise<boolean>;
  onUpdate?: (
    id: number,
    data: {
      appointmentDate?: string;
      startTime?: string;
      employeeId?: number;
      serviceId?: number;
      clientName?: string;
      clientEmail?: string;
      clientPhone?: string;
    }
  ) => Promise<boolean>;
  onDelete?: (id: number) => Promise<void>;
  actionLoading: boolean;
}

export const AppointmentModal = ({
  open,
  onOpenChange,
  mode,
  initialData,
  employees,
  services,
  onSave,
  onUpdate,
  onDelete,
  actionLoading,
}: AppointmentModalProps) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [serviceId, setServiceId] = useState<string>("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [saving, setSaving] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialData?.appointment) {
        const a = initialData.appointment;
        setDate(a.appointmentDate);
        setTime(a.startTime);
        setEmployeeId(String(a.employeeId));
        setServiceId(String(a.serviceId));
        setClientName(a.clientName || "");
        setClientEmail(a.clientEmail || "");
        setClientPhone(a.clientPhone || "");
      } else {
        setDate(initialData?.date || "");
        setTime(initialData?.time || "");
        setEmployeeId(initialData?.employeeId ? String(initialData.employeeId) : "");
        setServiceId(services.length > 0 ? String(services[0].id) : "");
        setClientName("");
        setClientEmail("");
        setClientPhone("");
      }
    }
  }, [open, mode, initialData, services]);

  const isValid = date && time && employeeId && serviceId;

  const handleSubmit = async () => {
    if (!isValid) return;
    setSaving(true);
    try {
      if (mode === "create") {
        const success = await onSave({
          appointmentDate: date,
          startTime: time,
          employeeId: Number(employeeId),
          serviceId: Number(serviceId),
          clientName: clientName || undefined,
          clientEmail: clientEmail || undefined,
          clientPhone: clientPhone || undefined,
        });
        if (success) onOpenChange(false);
      } else if (mode === "edit" && initialData?.appointment && onUpdate) {
        const success = await onUpdate(initialData.appointment.id, {
          appointmentDate: date,
          startTime: time,
          employeeId: Number(employeeId),
          serviceId: Number(serviceId),
          clientName: clientName || undefined,
          clientEmail: clientEmail || undefined,
          clientPhone: clientPhone || undefined,
        });
        if (success) onOpenChange(false);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (mode === "edit" && initialData?.appointment && onDelete) {
      await onDelete(initialData.appointment.id);
      onOpenChange(false);
    }
  };

  const selectedService = services.find((s) => String(s.id) === serviceId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-2xl p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  mode === "create"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-orange-500/20 text-orange-400"
                )}
              >
                {mode === "create" ? (
                  <Plus className="w-5 h-5" />
                ) : (
                  <CalendarDays className="w-5 h-5" />
                )}
              </div>
              <div>
                <DialogTitle className="text-white text-lg font-bold">
                  {mode === "create" ? "Nuevo Turno" : "Editar Turno"}
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-xs mt-0.5">
                  {mode === "create"
                    ? "Completa los datos para agendar un turno"
                    : `Turno #${initialData?.appointment?.id} — ${initialData?.appointment?.clientName || initialData?.appointment?.customerName || "Cliente"}`
                  }
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-5">
          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" /> Fecha
              </Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-10 rounded-xl border-slate-200 focus:border-orange-400 focus:ring-orange-400/20"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Hora
              </Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-10 rounded-xl border-slate-200 focus:border-orange-400 focus:ring-orange-400/20"
              />
            </div>
          </div>

          {/* Professional */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Profesional
            </Label>
            <Select value={employeeId} onValueChange={setEmployeeId}>
              <SelectTrigger className="h-10 rounded-xl border-slate-200">
                <SelectValue placeholder="Seleccionar profesional" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((emp) => (
                  <SelectItem key={emp.id} value={String(emp.id)}>
                    {emp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Service */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> Servicio
            </Label>
            <Select value={serviceId} onValueChange={setServiceId}>
              {/* ... trigger and content ... */}
              <SelectTrigger className="h-10 rounded-xl border-slate-200">
                <SelectValue placeholder="Seleccionar servicio" />
              </SelectTrigger>
              <SelectContent>
                {services.map((svc) => (
                  <SelectItem key={svc.id} value={String(svc.id)}>
                    <span className="flex items-center justify-between w-full gap-3">
                      <span>{svc.name}</span>
                      <span className="text-xs text-slate-400">{svc.duration}min — ${svc.price}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Guest Info (Optional for Admin) */}
          <div className="pt-2 border-t border-slate-100 mt-2 space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Datos del Cliente (Opcional)</p>
            
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-600">Nombre Completo</Label>
              <Input
                placeholder="Ej: Juan Pérez"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="h-10 rounded-xl border-slate-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-600">Email</Label>
                <Input
                  type="email"
                  placeholder="juan@ejemplo.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="h-10 rounded-xl border-slate-200"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-600">Teléfono</Label>
                <Input
                  placeholder="11 2345-6789"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="h-10 rounded-xl border-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Service preview info */}
          {selectedService && (
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-700 text-sm">{selectedService.name}</p>
                <p className="text-xs text-slate-500">{selectedService.duration} minutos</p>
              </div>
              <p className="font-extrabold text-emerald-600 text-lg">${selectedService.price}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
          {mode === "edit" && onDelete && (
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={saving || actionLoading}
              className="text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 rounded-xl h-10 font-semibold"
            >
              <Trash2 className="w-4 h-4 mr-1.5" />
              Cancelar Turno
            </Button>
          )}
          <div className="flex-1" />
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl h-10 font-semibold"
          >
            Cerrar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid || saving || actionLoading}
            className={cn(
              "rounded-xl h-10 font-bold shadow-md",
              mode === "create"
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            )}
          >
            {saving ? (
              <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
            ) : mode === "create" ? (
              <Plus className="w-4 h-4 mr-1.5" />
            ) : (
              <Save className="w-4 h-4 mr-1.5" />
            )}
            {mode === "create" ? "Crear Turno" : "Guardar Cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

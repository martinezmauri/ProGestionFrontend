import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  RefreshCw,
  Calendar,
  CalendarDays,
} from "lucide-react";
import {
  TimeColumn,
  ResourceHeader,
  AppointmentBlock,
  GridCell,
  CurrentTimeIndicator,
} from "./components/GridComponents";
import { PendingPanel } from "./components/PendingPanel";
import { AppointmentModal, ModalMode } from "./components/AppointmentModal";
import { WeeklyGrid } from "./components/WeeklyGrid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Card, CardContent, CardHeader } from "@ui/card";
import { BusinessHoursForm } from "@components/Forms/BusinessHoursForm";
import { AppHeader } from "@components/Header/AppHeader";
import { FooterSimple } from "@components/Footer/FooterSimple";
import { IWorkSchedule } from "@interfaces/IWorkSchedule";
import { IAppointment } from "@interfaces/IAppointment";
import { IService } from "@interfaces/IService";
import { useAuth } from "@context/AuthContext";
import { useBusinessHours } from "@hooks/useBusinessHours";
import { useWeeklyGrid } from "@hooks/useWeeklyGrid";
import { useAppointmentGrid } from "@hooks/useAppointmentGrid";
import { getServiceByBusinessId } from "@api/getServices";
import { MOCK_BUSINESS_HOURS_CONFIG } from "../../mocks/mockData";
import { toast } from "sonner";
import { format, endOfWeek } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@lib/utils";

export const AppointmentGrid = () => {
  const { session, userProfile } = useAuth();
  const isAuthenticated = !!session;
  const businessId: number | null = userProfile?.businessId ?? null;
  const authUserId: number | null = userProfile?.id ?? null;
  const [services, setServices] = useState<IService[]>([]);
  const [setupHours, setSetupHours] = useState<IWorkSchedule[]>([]);

  const {
    gridData: hookGridData,
    loading,
    error,
    selectedDate,
    setSelectedDate,
    selectedServiceId,
    setSelectedServiceId,
    refreshGrid,
  } = useAppointmentGrid();

  // Business hours check (first-time setup)
  const {
    hasHours,
    loading: hoursLoading,
    fetchBusinessHours,
    saveBusinessHours,
  } = useBusinessHours(businessId);

  useEffect(() => {
    if (businessId && isAuthenticated) {
      fetchBusinessHours();
    }
  }, [businessId, isAuthenticated]);

  // Weekly grid hook
  const grid = useWeeklyGrid(businessId != null ? String(businessId) : null);

  // Services
  useEffect(() => {
    const fetchServices = async () => {
      if (!businessId || !isAuthenticated || !hasHours) return;
      try {
        const data = await getServiceByBusinessId(String(businessId));
        const safeData = Array.isArray(data) ? data : [];
        setServices(safeData);
        if (safeData.length > 0 && !selectedServiceId) {
          setSelectedServiceId(Number(safeData[0].id));
        }
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    if (isAuthenticated && (hasHours || import.meta.env.DEV)) {
      fetchServices();
    }
  }, [businessId, isAuthenticated, hasHours]);

  // All unique time slots across the week (Dynamic based on BusinessHours)
  const allTimeSlots = useMemo(() => {
    const bhToUse = grid.businessHours.length > 0 ? grid.businessHours : MOCK_BUSINESS_HOURS_CONFIG;
    const slots = new Set<string>();
    bhToUse.forEach((day) => {
      if (!day.isWorkingDay) return;
      const addRange = (start: string | null, end: string | null) => {
        if (!start || !end) return;
        const [sh, sm] = start.split(":").map(Number);
        const [eh, em] = end.split(":").map(Number);
        let curr = sh * 60 + sm;
        let endM = eh * 60 + em;

        // Si el final es 00:00, lo tratamos como el final del día (1440 min)
        if (endM === 0 || endM <= curr) {
          endM = 1440;
        }

        while (curr < endM) {
          const h = Math.floor(curr / 60);
          const m = curr % 60;
          slots.add(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
          curr += 30;
        }
      };
      addRange(day.morningStart, day.morningEnd);
      addRange(day.afternoonStart, day.afternoonEnd);
    });

    // Si por alguna razón está vacío, mostramos un rango estándar
    if (slots.size === 0) return Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`).sort();

    return Array.from(slots).sort();
  }, [grid.businessHours]);

  // ─── Modal State ───────────────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [modalInitial, setModalInitial] = useState<{
    date?: string;
    time?: string;
    employeeId?: number;
    appointment?: IAppointment;
  }>({});

  const handleSlotClick = (date: Date, employeeId: number, time: string) => {
    setModalMode("create");
    setModalInitial({
      date: format(date, "yyyy-MM-dd"),
      time,
      employeeId,
    });
    setModalOpen(true);
  };

  const handleAppointmentClick = (appointment: IAppointment) => {
    setModalMode("edit");
    setModalInitial({ appointment });
    setModalOpen(true);
  };

  const handleCellClick = async (_employeeId: number, _startTime: string) => {
    if (!businessId || !isAuthenticated || !authUserId) return;
  };

  const handleUpdate = async (
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
  ) => {
    const success = await grid.handleUpdate(id, data);
    if (success) {
      toast.success("Turno actualizado");
    } else {
      toast.error("Error al actualizar el turno");
    }
    return success;
  };

  const handleDeleteFromModal = async (id: number) => {
    await grid.handleDelete(id);
    toast.success("Turno cancelado");
  };

  const handleApprove = async (id: number) => {
    await grid.handleApprove(id);
    toast.success("Turno aprobado");
  };

  const handleReject = async (id: number) => {
    await grid.handleReject(id);
    toast.success("Turno rechazado");
  };

  const handleSave = async (data: {
    appointmentDate: string;
    startTime: string;
    employeeId: number;
    serviceId: number;
    clientName?: string;
    clientEmail?: string;
    clientPhone?: string;
  }): Promise<boolean> => {
    try {
      const success = await grid.handleCreate({
        ...data,
        businessId: businessId!,
        userId: authUserId ?? undefined,
      });
      if (success) toast.success("Turno creado exitosamente");
      else toast.error("Error al crear el turno");
      return !!success;
    } catch {
      toast.error("Error al crear el turno");
      return false;
    }
  };

  const handleNewTurno = () => {
    setModalMode("create");
    setModalInitial({});
    setModalOpen(true);
  };

  const handleSaveHours = async () => {
    const activeHours = setupHours.filter((h) => h.isWorkingDay);
    if (activeHours.length === 0) {
      toast.error("Debes configurar al menos un día de atención.");
      return;
    }
    try {
      await saveBusinessHours(setupHours);
      toast.success("¡Horarios configurados exitosamente!", {
        description: "Tu grilla de turnos está lista para usar.",
      });
    } catch {
      toast.error("Error al guardar los horarios.");
    }
  };

  // ─── Render: First-time setup ──────────────────────────────────────────────
  if (hasHours === false && !import.meta.env.DEV) {
    return (
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 p-6 md:p-10 space-y-6 max-w-4xl mx-auto w-full overflow-y-auto">
          <AppHeader title="Grilla de Turnos" />
          <Card className="border-0 shadow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl" />
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-10 relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <CalendarDays className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
                  ¡Bienvenido al Gestor de Turnos!
                </h2>
              </div>
              <p className="text-orange-50 text-lg max-w-2xl leading-relaxed">
                Para empezar a gestionar turnos, necesitamos saber los horarios de atención de tu negocio.
              </p>
            </CardHeader>
          </Card>
          <BusinessHoursForm
            businessHours={setupHours}
            setBusinessHours={setSetupHours}
            handleFinalSubmit={handleSaveHours}
            title="Configura tus Horarios de Atención"
            showSubmitButton={true}
          />
        </div>
        <FooterSimple />
      </div>
    );
  }

  // ─── Render: Loading hours ─────────────────────────────────────────────────
  if ((hasHours === null || hoursLoading) && !import.meta.env.DEV) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <RefreshCw className="w-8 h-8 text-orange-500 animate-spin mb-3" />
        <p className="text-gray-600 font-medium ml-3">Cargando configuración...</p>
      </div>
    );
  }

  // Week label
  const weekLabel = `${format(grid.currentWeekStart, "d MMM", { locale: es })} — ${format(
    endOfWeek(grid.currentWeekStart, { weekStartsOn: 1 }),
    "d MMM yyyy",
    { locale: es }
  )}`;

  // ─── Render: Main Grid ─────────────────────────────────────────────────────
  return (
    <div className="flex h-full flex-col md:flex-row bg-slate-50 relative overflow-hidden">
      {/* ═══ Main Content ═══ */}
      <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 shrink-0">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              Grilla de Turnos
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Gestiona la agenda semanal de tu equipo
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Week Nav */}
            <div className="flex items-center bg-white rounded-xl p-1 shadow-sm border border-slate-200">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg text-slate-500 hover:text-slate-700"
                onClick={() => grid.navigateWeek(-1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-semibold text-sm px-3 text-slate-700 min-w-[160px] text-center capitalize">
                {weekLabel}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg text-slate-500 hover:text-slate-700"
                onClick={() => grid.navigateWeek(1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              className="bg-white hover:bg-slate-50 rounded-xl h-9 text-sm font-semibold"
              onClick={grid.goToCurrentWeek}
            >
              <Calendar className="h-4 w-4 mr-1.5" />
              Hoy
            </Button>

            <Button
              variant="outline"
              className="bg-white hover:bg-slate-50 rounded-xl h-9 text-sm"
              onClick={grid.refreshAll}
              disabled={grid.loading}
            >
              <RefreshCw className={cn("h-4 w-4 mr-1.5", grid.loading && "animate-spin")} />
              Refrescar
            </Button>

            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-9 text-sm font-bold shadow-md"
              onClick={handleNewTurno}
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Nuevo Turno
            </Button>
          </div>
        </div>

        {/* Error */}
        {grid.error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-center justify-between shrink-0">
            <span>{grid.error}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={grid.refreshAll}
              className="text-red-600 hover:text-red-700"
            >
              Reintentar
            </Button>
          </div>
        )}

        {/* Grid (hidden on mobile) */}
        <div className="flex-1 overflow-hidden hidden md:flex">
          <WeeklyGrid
            weekDays={grid.weekDays}
            employees={grid.employees}
            appointments={grid.appointments}
            businessHours={grid.businessHours}
            allTimeSlots={allTimeSlots}
            isDayClosed={grid.isDayClosed}
            getAppointmentsForSlot={grid.getAppointmentsForSlot}
            onSlotClick={handleSlotClick}
            onAppointmentClick={handleAppointmentClick}
            loading={grid.loading}
          />
        </div>

        {/* Mobile: Pending list only */}
        <div className="flex-1 overflow-hidden flex md:hidden">
          <PendingPanel
            appointments={grid.pendingAppointments}
            onApprove={handleApprove}
            onReject={handleReject}
            actionLoading={grid.actionLoading}
            className="w-full h-full border-l-0 border-t border-slate-200"
          />
        </div>
      </div>

      {/* ═══ Pending Panel (desktop sidebar) ═══ */}
      <div className="hidden md:flex w-80 h-full shrink-0">
        <PendingPanel
          appointments={grid.pendingAppointments}
          onApprove={handleApprove}
          onReject={handleReject}
          actionLoading={grid.actionLoading}
          className="w-full h-full"
        />
      </div>

      {/* ═══ Appointment Modal ═══ */}
      <AppointmentModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        initialData={modalInitial}
        employees={grid.employees}
        services={services}
        onSave={handleSave}
        onUpdate={handleUpdate}
        onDelete={handleDeleteFromModal}
        actionLoading={grid.actionLoading}
      />

      {/* Mobile FAB */}
      <Button
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-xl z-30"
        onClick={handleNewTurno}
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

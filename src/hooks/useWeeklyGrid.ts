import { useState, useEffect, useCallback } from "react";
import { format, startOfWeek, endOfWeek, addWeeks, eachDayOfInterval, isToday } from "date-fns";
import { es } from "date-fns/locale";
import api from "@api/axiosInstance";
import {
  getAppointments,
  approveAppointment as apiApprove,
  rejectAppointment as apiReject,
  deleteAppointment as apiDelete,
  createAppointment,
  updateAppointment as apiUpdate,
} from "@api/getAppointments";
import type { IAppointment, IBusinessDayConfig, IGridEmployee } from "@interfaces/IAppointment";
import {
  MOCK_WEEKLY_APPOINTMENTS,
  MOCK_BUSINESS_HOURS_CONFIG,
  MOCK_EMPLOYEES_GRID,
} from "../mocks/mockData";

export interface WeeklyGridState {
  // Data
  appointments: IAppointment[];
  pendingAppointments: IAppointment[];
  businessHours: IBusinessDayConfig[];
  employees: IGridEmployee[];
  weekDays: Date[];

  // Navigation
  currentWeekStart: Date;
  navigateWeek: (direction: -1 | 1) => void;
  goToCurrentWeek: () => void;

  // Loading / Error
  loading: boolean;
  actionLoading: boolean;
  error: string | null;

  // Actions
  handleApprove: (id: number) => Promise<void>;
  handleReject: (id: number) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  handleCreate: (data: {
    appointmentDate: string;
    startTime: string;
    businessId: number;
    employeeId: number;
    serviceId: number;
    userId?: number;
    clientName?: string;
    clientEmail?: string;
    clientPhone?: string;
  }) => Promise<boolean>;
  handleUpdate: (
    id: number,
    data: Partial<{
      appointmentDate: string;
      startTime: string;
      employeeId: number;
      serviceId: number;
      clientName: string;
      clientEmail: string;
      clientPhone: string;
    }>
  ) => Promise<boolean>;
  refreshAll: () => void;

  // Helpers
  getAppointmentsForSlot: (dateStr: string, employeeId: number, time: string) => IAppointment[];
  isDayClosed: (dayOfWeek: number) => boolean;
  getBusinessHoursForDay: (dayOfWeek: number) => IBusinessDayConfig | undefined;
  generateTimeSlots: (dayOfWeek: number) => string[];
}

/**
 * Genera los slots de tiempo basados en los horarios del negocio para un día.
 * Si no hay config para ese día, retorna un array vacío.
 */
const generateTimeSlotsForDay = (
  dayConfig: IBusinessDayConfig | undefined,
  slotDuration: number = 30
): string[] => {
  if (!dayConfig || !dayConfig.isWorkingDay) return [];

  const slots: string[] = [];

  const addSlotsForRange = (start: string | null, end: string | null) => {
    if (!start || !end) return;
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);
    let currentMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    while (currentMinutes < endMinutes) {
      const h = Math.floor(currentMinutes / 60);
      const m = currentMinutes % 60;
      slots.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
      currentMinutes += slotDuration;
    }
  };

  addSlotsForRange(dayConfig.morningStart, dayConfig.morningEnd);
  addSlotsForRange(dayConfig.afternoonStart, dayConfig.afternoonEnd);

  return slots;
};

/**
 * Genera TODOS los slots posibles de la semana (unión de todos los días)
 * para poder hacer filas consistentes en la grilla
 */
const generateAllTimeSlots = (
  businessHours: IBusinessDayConfig[],
  slotDuration: number = 30
): string[] => {
  const allSlots = new Set<string>();
  businessHours.forEach((day) => {
    const daySlots = generateTimeSlotsForDay(day, slotDuration);
    daySlots.forEach((s) => allSlots.add(s));
  });
  return Array.from(allSlots).sort();
};

export const useWeeklyGrid = (businessId?: string | null): WeeklyGridState => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [pendingAppointments, setPendingAppointments] = useState<IAppointment[]>([]);
  const [businessHours, setBusinessHours] = useState<IBusinessDayConfig[]>([]);
  const [employees, setEmployees] = useState<IGridEmployee[]>([]);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const weekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: currentWeekStart, end: weekEnd });

  // — Fetch business hours
  const fetchBusinessHours = useCallback(async () => {
    if (!businessId) {
      if (import.meta.env.DEV) setBusinessHours(MOCK_BUSINESS_HOURS_CONFIG);
      return;
    }
    try {
      const response = await api.get(`/business/${businessId}/hours`);
      const data: IBusinessDayConfig[] = response.data;
      setBusinessHours(data.length > 0 ? data : import.meta.env.DEV ? MOCK_BUSINESS_HOURS_CONFIG : []);
    } catch {
      if (import.meta.env.DEV) setBusinessHours(MOCK_BUSINESS_HOURS_CONFIG);
    }
  }, [businessId]);

  // — Fetch employees
  const fetchEmployees = useCallback(async () => {
    if (!businessId) {
      if (import.meta.env.DEV) setEmployees(MOCK_EMPLOYEES_GRID);
      return;
    }
    try {
      const response = await api.get(`/employee/findAll?businessId=${businessId}`);
      const data = Array.isArray(response.data) ? response.data : response.data?.content || [];
      setEmployees(
        data.map((e: any) => ({ id: Number(e.id), name: e.name, profilePicture: e.profile_picture }))
      );
    } catch {
      if (import.meta.env.DEV) setEmployees(MOCK_EMPLOYEES_GRID);
    }
  }, [businessId]);

  // — Fetch weekly appointments
  const fetchWeeklyAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    const startDate = format(currentWeekStart, "yyyy-MM-dd");
    const endDate = format(weekEnd, "yyyy-MM-dd");

    try {
      const result = await getAppointments({ startDate, endDate, size: 200 });
      if (result) {
        const list: IAppointment[] = result.content || result || [];
        setAppointments(list.filter((a) => a.status === "APPROVED"));
        setPendingAppointments(list.filter((a) => a.status === "PENDING"));
      } else {
        throw new Error("No data");
      }
    } catch {
      setError("Error al cargar los turnos de la semana.");
      if (import.meta.env.DEV) {
        setAppointments(MOCK_WEEKLY_APPOINTMENTS.filter((a) => a.status === "APPROVED"));
        setPendingAppointments(MOCK_WEEKLY_APPOINTMENTS.filter((a) => a.status === "PENDING"));
      }
    } finally {
      setLoading(false);
    }
  }, [currentWeekStart]);

  // — Effects
  useEffect(() => {
    fetchBusinessHours();
    fetchEmployees();
  }, [fetchBusinessHours, fetchEmployees]);

  useEffect(() => {
    fetchWeeklyAppointments();
  }, [fetchWeeklyAppointments]);

  // — Navigation
  const navigateWeek = (direction: -1 | 1) => {
    setCurrentWeekStart((prev) => addWeeks(prev, direction));
  };

  const goToCurrentWeek = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  // — CRUD Actions
  const refreshAll = () => {
    fetchWeeklyAppointments();
  };

  const handleApprove = async (id: number) => {
    setActionLoading(true);
    try {
      await apiApprove(id);
      refreshAll();
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (id: number) => {
    setActionLoading(true);
    try {
      await apiReject(id);
      refreshAll();
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setActionLoading(true);
    try {
      await apiDelete(id);
      refreshAll();
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreate = async (data: {
    appointmentDate: string;
    startTime: string;
    businessId: number;
    employeeId: number;
    serviceId: number;
    userId?: number;
    clientName?: string;
    clientEmail?: string;
    clientPhone?: string;
  }): Promise<boolean> => {
    setActionLoading(true);
    try {
      const result = await createAppointment(data);
      if (result) {
        refreshAll();
        return true;
      }
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (
    id: number,
    data: Partial<{
      appointmentDate: string;
      startTime: string;
      employeeId: number;
      serviceId: number;
      clientName: string;
      clientEmail: string;
      clientPhone: string;
    }>
  ): Promise<boolean> => {
    setActionLoading(true);
    try {
      await apiUpdate(id, data as any);
      refreshAll();
      return true;
    } catch {
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // — Helpers
  const getAppointmentsForSlot = (dateStr: string, employeeId: number, time: string): IAppointment[] => {
    return appointments.filter(
      (a) => a.appointmentDate === dateStr && a.employeeId === employeeId && a.startTime === time
    );
  };

  const isDayClosed = (dayOfWeek: number): boolean => {
    const config = businessHours.find((h) => h.dayOfWeek === dayOfWeek);
    return !config || !config.isWorkingDay;
  };

  const getBusinessHoursForDay = (dayOfWeek: number): IBusinessDayConfig | undefined => {
    return businessHours.find((h) => h.dayOfWeek === dayOfWeek);
  };

  const generateTimeSlots = (dayOfWeek: number): string[] => {
    const config = getBusinessHoursForDay(dayOfWeek);
    return generateTimeSlotsForDay(config);
  };

  return {
    appointments,
    pendingAppointments,
    businessHours,
    employees,
    weekDays,
    currentWeekStart,
    navigateWeek,
    goToCurrentWeek,
    loading,
    actionLoading,
    error,
    handleApprove,
    handleReject,
    handleDelete,
    handleCreate,
    handleUpdate,
    refreshAll,
    getAppointmentsForSlot,
    isDayClosed,
    getBusinessHoursForDay,
    generateTimeSlots,
  };
};

import { useState, useEffect } from "react";
import api from "@api/axiosInstance";
import { format } from "date-fns";
import { MOCK_GRID_DATA } from "../mocks/mockData";

export interface ITimeSlot {
  startTime: string; // e.g., "09:00:00"
  endTime: string;
  available: boolean;
  appointmentId?: number;
}

export interface IEmployeeSchedule {
  employeeId: number;
  employeeName: string;
  timeSlots: ITimeSlot[];
}

export interface IAppointmentGrid {
  serviceName: string;
  serviceDuration: number;
  timeSlots: ITimeSlot[];
  employeeAvailabilities: IEmployeeSchedule[];
}

export const useAppointmentGrid = (
  initialServiceId?: number,
  initialDate?: Date,
) => {
  const [gridData, setGridData] = useState<IAppointmentGrid | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Wizard State
  const [currentStep, setCurrentStep] = useState<number>(1); // 1: Service, 2: Employee, 3: DateTime, 4: Confirm
  const [selectedServiceId, setSelectedServiceId] = useState<number | undefined>(initialServiceId);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null | undefined>(undefined); // null means "Cualquier profesional"
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate || new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const fetchGridData = async (serviceId: number, date: Date) => {
    setLoading(true);
    setError(null);
    try {
      const dateIso = format(date, "yyyy-MM-dd");
      const baseURL =
        import.meta.env.VITE_API_URL || "http://localhost:3000/api";
      const response = await api.get(`${baseURL}/appointments/grid`, {
        params: {
          serviceId,
          date: dateIso,
        },
      });

      if (response.status === 200) {
        setGridData(response.data);
      } else {
        throw new Error("Error status: " + response.status);
      }
    } catch (err: any) {
      console.error("fetchGridData error:", err);
      setError("Error al cargar la grilla.");

      if (import.meta.env.DEV) {
        setGridData(MOCK_GRID_DATA);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedServiceId && (selectedDate || initialDate) && currentStep >= 3) {
      fetchGridData(
        selectedServiceId,
        selectedDate || initialDate || new Date(),
      );
    }
  }, [selectedServiceId, selectedDate, initialDate, currentStep]);

  const resetWizard = () => {
    setCurrentStep(1);
    setSelectedServiceId(undefined);
    setSelectedEmployeeId(undefined);
    setSelectedTimeSlot(null);
    setSelectedDate(new Date());
    setGridData(null);
  }

  return {
    gridData,
    loading,
    error,
    currentStep,
    setCurrentStep,
    selectedDate,
    setSelectedDate,
    selectedServiceId,
    setSelectedServiceId,
    selectedEmployeeId,
    setSelectedEmployeeId,
    selectedTimeSlot,
    setSelectedTimeSlot,
    resetWizard,
    refreshGrid: () => {
      if (selectedServiceId && selectedDate) {
        fetchGridData(selectedServiceId, selectedDate);
      }
    },
  };
};

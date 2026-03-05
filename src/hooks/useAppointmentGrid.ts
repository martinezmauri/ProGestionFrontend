import { useState, useEffect } from "react";
import api from "@api/axiosInstance";
import { format } from "date-fns";

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

export const useAppointmentGrid = (initialServiceId?: number, initialDate?: Date) => {
    const [gridData, setGridData] = useState<IAppointmentGrid | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(initialDate || new Date());
    const [selectedServiceId, setSelectedServiceId] = useState<number | undefined>(initialServiceId);

    const fetchGridData = async (serviceId: number, date: Date) => {
        setLoading(true);
        setError(null);
        try {
            const dateIso = format(date, "yyyy-MM-dd");
            const response = await api.get(
                `${import.meta.env.VITE_API_URL}/appointments/grid`,
                {
                    params: {
                        serviceId,
                        date: dateIso
                    }
                }
            );

            if (response.status === 200) {
                setGridData(response.data);
            } else {
                setError("Error al cargar la grilla de turnos.");
            }
        } catch (err: any) {
            console.error("fetchGridData error:", err);
            setError(err.response?.data?.message || "Ocurrió un error al consultar los turnos.");
            setGridData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedServiceId && selectedDate) {
            fetchGridData(selectedServiceId, selectedDate);
        }
    }, [selectedServiceId, selectedDate]);

    return {
        gridData,
        loading,
        error,
        selectedDate,
        setSelectedDate,
        selectedServiceId,
        setSelectedServiceId,
        refreshGrid: () => {
            if (selectedServiceId && selectedDate) {
                fetchGridData(selectedServiceId, selectedDate);
            }
        }
    };
};

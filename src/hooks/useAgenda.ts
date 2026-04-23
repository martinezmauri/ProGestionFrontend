import { useState, useEffect, useCallback } from "react";
import { getEmployeesByBusinessId } from "@api/getEmployees";
import { 
    getAppointmentsByDateRange, 
    approveAppointment as approveApi, 
    rejectAppointment as rejectApi,
    deleteAppointment as deleteApi
} from "@api/getAppointments";
import { useBusinessHours } from "./useBusinessHours";
import { IEmployeeResponse } from "../interfaces/IEmployee";
import { IAppointment } from "../interfaces/IAppointment";
import { format, startOfWeek, endOfWeek } from "date-fns";

export const useAgenda = (businessId: number) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [employees, setEmployees] = useState<IEmployeeResponse[]>([]);
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<{
        startTime: string;
        appointmentDate: string;
        employeeId: number;
        employeeName: string;
    } | null>(null);

    const businessIdStr = businessId.toString();
    const { businessHours } = useBusinessHours(businessIdStr);

    const fetchData = useCallback(async () => {
        if (!businessId) return;
        setLoading(true);
        setError(null);
        try {
            // Fetch the whole week containing the selectedDate
            const start = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Monday
            const end = endOfWeek(selectedDate, { weekStartsOn: 1 }); // Sunday
            
            const startDateStr = format(start, "yyyy-MM-dd");
            const endDateStr = format(end, "yyyy-MM-dd");

            const [emps, appts] = await Promise.all([
                getEmployeesByBusinessId(businessIdStr),
                getAppointmentsByDateRange(businessId, startDateStr, endDateStr)
            ]);

            if (emps) setEmployees(emps);
            if (appts) setAppointments(appts);
        } catch (err) {
            console.error("Error fetching agenda data:", err);
            setError("Error al cargar los datos de la agenda.");
        } finally {
            setLoading(false);
        }
    }, [businessId, businessIdStr, selectedDate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSlotClick = (startTime: string, employeeId: number, employeeName: string, date: Date) => {
        setSelectedSlot({ 
            startTime, 
            employeeId, 
            employeeName, 
            appointmentDate: format(date, "yyyy-MM-dd") 
        });
        setIsModalOpen(true);
    };

    const approveAppointment = async (id: number) => {
        const success = await approveApi(id);
        if (success) fetchData();
        return success;
    };

    const rejectAppointment = async (id: number) => {
        const success = await rejectApi(id);
        if (success) fetchData();
        return success;
    };

    const deleteAppointment = async (id: number) => {
        const success = await deleteApi(id);
        if (success) fetchData();
        return success;
    };

    return {
        selectedDate,
        setSelectedDate,
        employees,
        appointments,
        businessHours,
        loading,
        error,
        isModalOpen,
        setIsModalOpen,
        selectedSlot,
        handleSlotClick,
        approveAppointment,
        rejectAppointment,
        deleteAppointment,
        refreshAgenda: fetchData
    };
};

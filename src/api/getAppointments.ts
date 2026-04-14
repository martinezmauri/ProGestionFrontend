import api from "./axiosInstance";
import { format } from "date-fns";

export interface IAppointmentCreate {
    appointmentDate: string; // ISO date format like YYYY-MM-DD
    startTime: string; // HH:mm
    businessId: number;
    employeeId: number;
    serviceId: number;
    userId: number;
}

export const createAppointment = async (payload: IAppointmentCreate) => {
    const response = await api.post(
        `${import.meta.env.VITE_API_URL}/appointment/request`,
        payload
    );
    return response.data;
};

export const getAppointmentsByDateRange = async (businessId: number, startDate: string, endDate: string) => {
    try {
        const response = await api.get(
            `${import.meta.env.VITE_API_URL}/appointment/findByDateRange`,
            {
                params: { businessId, startDate, endDate }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching appointments by range:", error);
        return [];
    }
};

export const createManualAppointment = async (payload: any) => {
    const response = await api.post(
        `${import.meta.env.VITE_API_URL}/appointment/request`,
        payload
    );
    return response.data;
};

export const approveAppointment = async (id: number) => {
    try {
        const response = await api.put(`${import.meta.env.VITE_API_URL}/appointment/${id}/approve`);
        return response.status === 200;
    } catch (error) {
        console.error("Error approving appointment:", error);
        return false;
    }
};

export const rejectAppointment = async (id: number) => {
    try {
        const response = await api.put(`${import.meta.env.VITE_API_URL}/appointment/${id}/reject`);
        return response.status === 200;
    } catch (error) {
        console.error("Error rejecting appointment:", error);
        return false;
    }
};

export const deleteAppointment = async (id: number) => {
    try {
        const response = await api.delete(`${import.meta.env.VITE_API_URL}/appointment/delete/${id}`);
        return response.status === 200;
    } catch (error) {
        console.error("Error deleting appointment:", error);
        return false;
    }
};

export const updateAppointment = async (id: number, payload: Partial<IAppointmentCreate>) => {
    try {
        const response = await api.put(`${import.meta.env.VITE_API_URL}/appointment/update/${id}`, payload);
        return response.status === 200;
    } catch (error) {
        console.error("Error updating appointment:", error);
        return false;
    }
};

export const getOccupiedSlots = async (employeeId: number, date: string): Promise<string[]> => {
    try {
        const response = await api.get(
            `${import.meta.env.VITE_API_URL}/appointment/public/occupied?employeeId=${employeeId}&date=${date}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching occupied slots:", error);
        return [];
    }
};

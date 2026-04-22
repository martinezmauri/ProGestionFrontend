import api from "./axiosInstance";
import { format } from "date-fns";

export interface IAppointmentCreate {
  appointmentDate: string; // ISO date format like YYYY-MM-DD
  startTime: string; // HH:mm
  businessId: number;
  employeeId: number;
  serviceId: number;
  userId?: number;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
}

export const createAppointment = async (payload: IAppointmentCreate) => {
    try {
        const response = await api.post(
            `/appointment/request`, 
            payload
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const approveAppointment = async (id: number) => {
    try {
        const response = await api.put(`/appointment/${id}/approve`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const rejectAppointment = async (id: number) => {
    try {
        const response = await api.put(`/appointment/${id}/reject`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteAppointment = async (id: number) => {
    try {
        await api.delete(`/appointment/delete/${id}`);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const updateAppointment = async (id: number, payload: Partial<IAppointmentCreate>) => {
    try {
        const response = await api.put(`/appointment/update/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAppointments = async (params: { 
    status?: string, 
    startDate?: string, 
    endDate?: string,
    page?: number,
    size?: number
}) => {
    try {
        const response = await api.get(`/appointment/findAll`, { params });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

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
    try {
        const response = await api.post(
            `${import.meta.env.VITE_API_URL}/appointments/request`, // New Endpoint
            payload
        );

        if (response.status !== 201) {
            throw new Error("Error al crear el turno.");
        }
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

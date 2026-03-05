import api from "./axiosInstance";
import { format } from "date-fns";

export interface IAppointmentCreate {
    date: string; // ISO date string
    status: string;
    businessId: number;
    employeeId: number;
    serviceId: number;
    userId: number;
}

export const createAppointment = async (payload: IAppointmentCreate) => {
    try {
        const response = await api.post(
            `${import.meta.env.VITE_API_URL}/appointment/save`,
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

import api from "./axiosInstance";
import { IWorkSchedule } from "../interfaces/IWorkSchedule";

export const getBusinessHours = async (businessId: string | number): Promise<any[]> => {
    try {
        const response = await api.get(
            `${import.meta.env.VITE_API_URL}/business/${businessId}/hours`
        );
        return response.data;
    } catch (error) {
        console.error(`Error al obtener horarios del negocio ${businessId}:`, error);
        return [];
    }
};

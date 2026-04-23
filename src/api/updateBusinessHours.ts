import api from "./axiosInstance";
import { IWorkSchedule } from "../interfaces/IWorkSchedule";
import { mapToBackendSchedule } from "../utils/scheduleMapper";

export const updateBusinessHours = async (businessId: number | string, schedules: IWorkSchedule[]) => {
    try {
        const mappedSchedules = mapToBackendSchedule(schedules);
        const response = await api.post(
            `${import.meta.env.VITE_API_URL}/business/${businessId}/hours`,
            mappedSchedules
        );
        return response.data;
    } catch (error) {
        console.error("Error updating business hours:", error);
        throw error;
    }
};

import api from "./axiosInstance";
import { IWorkSchedule } from "../interfaces/IWorkSchedule";

export const updateEmployeeHours = async (
    employeeId: number, 
    schedules: IWorkSchedule[]
): Promise<IWorkSchedule[]> => {
    try {
        const sanitizedSchedules = schedules.map(s => ({
            ...s,
            morningStart: s.morningStart || null,
            morningEnd: s.morningEnd || null,
            afternoonStart: s.afternoonStart || null,
            afternoonEnd: s.afternoonEnd || null,
        }));
        
        const response = await api.post(
            `${import.meta.env.VITE_API_URL}/employees/${employeeId}/hours`,
            sanitizedSchedules
        );
        return response.data;
    } catch (error) {
        console.error("Error updating employee hours:", error);
        throw error;
    }
};

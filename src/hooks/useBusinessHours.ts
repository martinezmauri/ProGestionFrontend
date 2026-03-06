import { useState, useCallback } from "react";
import api from "@api/axiosInstance";
import { IWorkSchedule } from "@interfaces/IWorkSchedule";

export interface IBusinessHoursResponse {
    dayOfWeek: string;
    openingMorningTime: string;
    closingMorningTime: string;
    openingEveningTime: string | null;
    closingEveningTime: string | null;
}

export const useBusinessHours = (businessId?: string | null) => {
    const [businessHours, setBusinessHours] = useState<IBusinessHoursResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasHours, setHasHours] = useState<boolean | null>(null); // null = not checked yet

    const fetchBusinessHours = useCallback(async () => {
        if (!businessId) return;
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(
                `${import.meta.env.VITE_API_URL}/business/${businessId}/hours`
            );
            const data: IBusinessHoursResponse[] = response.data;
            setBusinessHours(data);
            setHasHours(data.length > 0);
        } catch (err) {
            console.error("Error fetching business hours:", err);
            setError("Error al obtener los horarios del negocio.");
            setHasHours(false);
        } finally {
            setLoading(false);
        }
    }, [businessId]);

    const saveBusinessHours = async (hours: IWorkSchedule[]) => {
        if (!businessId) return;
        setLoading(true);
        setError(null);
        try {
            const payload = hours
                .filter((h) => h.active)
                .map((h) => ({
                    dayOfWeek: h.day_of_week.toUpperCase(),
                    openingMorningTime: h.opening_morning_time,
                    closingMorningTime: h.closing_morning_time,
                    openingEveningTime: h.opening_evening_time || null,
                    closingEveningTime: h.closing_evening_time || null,
                }));

            const response = await api.post(
                `${import.meta.env.VITE_API_URL}/business/${businessId}/hours`,
                payload
            );
            setBusinessHours(response.data);
            setHasHours(true);
            return response.data;
        } catch (err) {
            console.error("Error saving business hours:", err);
            setError("Error al guardar los horarios del negocio.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        businessHours,
        loading,
        error,
        hasHours,
        fetchBusinessHours,
        saveBusinessHours,
    };
};

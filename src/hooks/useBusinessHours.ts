import { useState, useCallback } from "react";
import api from "@api/axiosInstance";
import { IWorkSchedule } from "@interfaces/IWorkSchedule";
import { mapBackendSchedule } from "@utils/scheduleMapper";

export const useBusinessHours = (businessId?: string | number | null) => {
    const [businessHours, setBusinessHours] = useState<IWorkSchedule[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasHours, setHasHours] = useState<boolean | null>(null); // null = not checked yet

    const fetchBusinessHours = useCallback(async () => {
        if (!businessId) return;
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(
                `/business/${businessId}/hours/public`
            );
            const data: IWorkSchedule[] = mapBackendSchedule(response.data);
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
                .filter((h) => h.isWorkingDay)
                .map((h) => ({
                    dayOfWeek: h.dayOfWeek,
                    isWorkingDay: h.isWorkingDay,
                    morningStart: h.morningStart,
                    morningEnd: h.morningEnd,
                    afternoonStart: h.afternoonStart || null,
                    afternoonEnd: h.afternoonEnd || null,
                }));

            const response = await api.post(
                `/business/${businessId}/hours`,
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

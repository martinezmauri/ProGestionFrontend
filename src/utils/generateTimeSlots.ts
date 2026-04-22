import { IWorkSchedule } from "../interfaces/IWorkSchedule";

/**
 * Convierte un string "HH:mm" a los minutos totales transcurridos desde las 00:00.
 * Retorna null en payloads vacíos de forma segura.
 */
const timeToMinutes = (time: string | null): number | null => {
    if (!time || time.trim() === "") return null;
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

/**
 * Pasa de minutos absolutos al string de la interfaz (ej. 540 -> "09:00")
 */
const minutesToTime = (minutes: number): string => {
    const h = Math.floor(minutes / 60).toString().padStart(2, '0');
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
};

/**
 * Trocea los horarios en bloques de `serviceDuration` para mostrarlos disponibles en la web.
 */
export const generateTimeSlots = (
    schedule: IWorkSchedule,
    serviceDuration: number
): string[] => {
    if (!schedule.isWorkingDay || serviceDuration <= 0) return [];

    const slots: string[] = [];

    // Función recursiva que añade turnos durante un rango específico
    const fillSlotsInRange = (startStr: string | null, endStr: string | null) => {
        if (!startStr || !endStr) return;

        let currentMin = timeToMinutes(startStr);
        const endMin = timeToMinutes(endStr);

        // Si la lectura falló por estar mal formado, salimos
        if (currentMin === null || endMin === null) return;

        // Mientras el inicio del turno más su duración no exceda la hora de cierre del local
        while (currentMin + serviceDuration <= endMin) {
            slots.push(minutesToTime(currentMin));
            currentMin += serviceDuration;
        }
    };

    fillSlotsInRange(schedule.morningStart, schedule.morningEnd);
    fillSlotsInRange(schedule.afternoonStart, schedule.afternoonEnd);

    return slots;
};

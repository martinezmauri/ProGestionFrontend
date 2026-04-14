import { IWorkSchedule } from "../interfaces/IWorkSchedule";

const dayMap: Record<string, number> = {
  "lunes": 1,
  "martes": 2,
  "miércoles": 3,
  "miercoles": 3,
  "jueves": 4,
  "viernes": 5,
  "sábado": 6,
  "sabado": 6,
  "domingo": 7,
};

/**
 * Mapea los horarios del backend (snake_case) al formato estandarizado del frontend (camelCase).
 */
export const mapBackendSchedule = (backendHours: any[]): IWorkSchedule[] => {
  if (!Array.isArray(backendHours)) return [];

  return backendHours.map((h) => {
    const dayStr = h.day_of_week?.toLowerCase() || "";
    // Si day_of_week ya es un número en el JSON, Jackson lo enviará como tal.
    // Pero si es el nombre lo buscamos en el mapa.
    let dayIdx = dayMap[dayStr];
    
    // Fallback al campo numérico si el mapeo por string falló
    if (dayIdx === undefined && h.dayOfWeek !== undefined) {
      dayIdx = h.dayOfWeek;
    }

    return {
      dayOfWeek: dayIdx ?? -1,
      isWorkingDay: !!(h.opening_morning_time || h.opening_evening_time || h.morningStart || h.afternoonStart || h.isWorkingDay),
      morningStart: h.opening_morning_time || h.morningStart || null,
      morningEnd: h.closing_morning_time || h.morningEnd || null,
      afternoonStart: h.opening_evening_time || h.afternoonStart || null,
      afternoonEnd: h.closing_evening_time || h.afternoonEnd || null,
    };
  });
};

export const mapToBackendSchedule = (schedules: IWorkSchedule[]) => {
  return schedules.map(s => ({
    dayOfWeek: s.dayOfWeek,
    isWorkingDay: s.isWorkingDay,
    opening_morning_time: s.morningStart || null,
    closing_morning_time: s.morningEnd || null,
    opening_evening_time: s.afternoonStart || null,
    closing_evening_time: s.afternoonEnd || null
  }));
};

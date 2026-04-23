/**
 * Convierte una cadena de texto "HH:mm" a minutos totales del día.
 */
const timeToMinutes = (time: string | null | undefined): number | null => {
  if (!time || typeof time !== "string" || time.trim() === "") return null;
  const parts = time.split(":");
  if (parts.length < 2) return null;
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  if (isNaN(hours) || isNaN(minutes)) return null;
  return hours * 60 + minutes;
};

/**
 * Convierte minutos totales del día a formato "HH:mm".
 */
const minutesToTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60).toString().padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
};

/**
 * Calcula la intersección de dos rangos horarios.
 */
const getIntersection = (
  startA: number,
  endA: number,
  startB: number,
  endB: number
): [number, number] | null => {
  const start = Math.max(startA, startB);
  const end = Math.min(endA, endB);
  return start < end ? [start, end] : null;
};

/**
 * Genera slots disponibles basados en la intersección estricta entre 
 * los horarios del negocio y los horarios del profesional asignado.
 */
export const generateAvailableSlots = (
  businessHours: {
    isWorkingDay: boolean;
    morningStart?: string | null;
    morningEnd?: string | null;
    afternoonStart?: string | null;
    afternoonEnd?: string | null;
  },
  professionalHours: {
    isWorkingDay: boolean;
    morningStart?: string | null;
    morningEnd?: string | null;
    afternoonStart?: string | null;
    afternoonEnd?: string | null;
  },
  serviceDuration: number
): string[] => {
  // Validaciones iniciales
  if (!businessHours?.isWorkingDay || !professionalHours?.isWorkingDay || serviceDuration <= 0) {
    return [];
  }

  const slots: string[] = [];

  // Definimos los bloques útiles (solo aquellos que tienen inicio y fin válidos)
  const bBlocks = [
    { s: timeToMinutes(businessHours.morningStart), e: timeToMinutes(businessHours.morningEnd) },
    { s: timeToMinutes(businessHours.afternoonStart), e: timeToMinutes(businessHours.afternoonEnd) }
  ].filter(b => b.s !== null && b.e !== null) as { s: number; e: number }[];

  const pBlocks = [
    { s: timeToMinutes(professionalHours.morningStart), e: timeToMinutes(professionalHours.morningEnd) },
    { s: timeToMinutes(professionalHours.afternoonStart), e: timeToMinutes(professionalHours.afternoonEnd) }
  ].filter(p => p.s !== null && p.e !== null) as { s: number; e: number }[];

  // Intersección N x M de bloques
  for (const b of bBlocks) {
    for (const p of pBlocks) {
      const intersection = getIntersection(b.s, b.e, p.s, p.e);
      if (intersection) {
        let [current, end] = intersection;
        // Generar cada slot de duración exacta
        while (current + serviceDuration <= end) {
          slots.push(minutesToTime(current));
          current += serviceDuration;
        }
      }
    }
  }

  // Ordenar y limpiar duplicados
  return Array.from(new Set(slots)).sort();
};

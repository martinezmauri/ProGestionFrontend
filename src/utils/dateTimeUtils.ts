import { formatInTimeZone, toDate } from 'date-fns-tz';
import { format, parseISO } from 'date-fns';

const ARG_TIMEZONE = 'America/Argentina/Buenos_Aires';

/**
 * Normaliza una fecha a string ISO 8601 (formato que espera Java)
 */
export const toISOString = (date: Date | string): string => {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return d.toISOString();
};

/**
 * Convierte una fecha/hora UTC a la zona horaria de Argentina para mostrar en UI
 */
export const formatToLocalTime = (date: Date | string, pattern: string = 'HH:mm'): string => {
    return formatInTimeZone(date, ARG_TIMEZONE, pattern);
};

/**
 * Convierte una fecha UTC a fecha local Argentina (formato YYYY-MM-DD)
 */
export const formatToLocalDate = (date: Date | string): string => {
    return formatInTimeZone(date, ARG_TIMEZONE, 'yyyy-MM-dd');
};

/**
 * Normaliza un objeto LocalTime (HH:mm) para enviar al backend
 */
export const normalizeTime = (time: string): string => {
    if (!time) return '';
    // Asegura formato HH:mm sin segundos
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

/**
 * Mapeo de días de la semana (ISO-8601: 1=Lunes, 7=Domingo)
 * JavaScript usa 0=Domingo, 1=Lunes...
 */
export const mapDayToISO = (jsDay: number): number => {
    return jsDay === 0 ? 7 : jsDay;
};

export const mapISOToDay = (isoDay: number): number => {
    return isoDay === 7 ? 0 : isoDay;
};

import { format, parseISO } from 'date-fns';

const ARG_TIMEZONE = 'America/Argentina/Buenos_Aires';

export const toISOString = (date: Date | string): string => {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return d.toISOString();
};

export const formatToLocalTime = (date: Date | string, pattern: string = 'HH:mm'): string => {
    const d = typeof date === 'string' ? parseISO(date) : date;
    // Use Intl to get Argentina local time
    const options: Intl.DateTimeFormatOptions = { timeZone: ARG_TIMEZONE, hour: '2-digit', minute: '2-digit', hour12: false };
    if (pattern === 'HH:mm') {
        return new Intl.DateTimeFormat('es-AR', options).format(d);
    }
    return format(d, pattern);
};

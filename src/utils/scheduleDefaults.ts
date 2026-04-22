import { IWorkSchedule } from "../interfaces/IWorkSchedule";

export const generateInitialWeeklySchedule = (): IWorkSchedule[] => {
    // Ordenamos para la UI de Lunes a Domingo (1 a 0)
    const orderedDays = [1, 2, 3, 4, 5, 6, 0];

    return orderedDays.map(day => ({
        dayOfWeek: day,
        // Por defecto marcamos Sábado (6) y Domingo (0) como no laborables
        isWorkingDay: day >= 1 && day <= 5,
        // Usamos cadenas estables en vez de objetos Date, 
        // y si no es laborable se setea como null en lugar de undefined.
        morningStart: day >= 1 && day <= 5 ? "09:00" : null,
        morningEnd: day >= 1 && day <= 5 ? "13:00" : null,
        afternoonStart: day >= 1 && day <= 5 ? "14:00" : null,
        afternoonEnd: day >= 1 && day <= 5 ? "18:00" : null
    }));
};

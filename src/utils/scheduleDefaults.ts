import { IWorkSchedule } from "../interfaces/IWorkSchedule";

export const generateInitialWeeklySchedule = (): IWorkSchedule[] => {
    // Estandarizado a ISO-8601: 1=Lunes, 7=Domingo
    const orderedDays = [1, 2, 3, 4, 5, 6, 7];

    return orderedDays.map(day => ({
        dayOfWeek: day,
        // Por defecto: Lunes (1) a Viernes (5) laborables
        isWorkingDay: day >= 1 && day <= 5,
        morningStart: day >= 1 && day <= 5 ? "09:00" : null,
        morningEnd: day >= 1 && day <= 5 ? "13:00" : null,
        afternoonStart: day >= 1 && day <= 5 ? "14:00" : null,
        afternoonEnd: day >= 1 && day <= 5 ? "18:00" : null
    }));
};

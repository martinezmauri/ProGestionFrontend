import { WeekDays } from "../enum/WeekDays";

export interface EmployeeWorkSchedule {
  dayOfWeek: WeekDays;
  openingMorningTime: string;
  closingMorningTime: string;
  openingEveningTime: string;
  closingEveningTime: string;
}

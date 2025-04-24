import { WeekDays } from "../enum/WeekDays";

export interface IWorkSchedule {
  dayOfWeek: WeekDays;
  openingMorningTime: string;
  closingMorningTime: string;
  openingEveningTime: string;
  closingEveningTime: string;
}

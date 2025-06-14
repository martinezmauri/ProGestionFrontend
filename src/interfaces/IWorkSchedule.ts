import { WeekDays } from "../enum/WeekDays";

export interface IWorkSchedule {
  day_of_week: WeekDays;
  opening_morning_time: string;
  closing_morning_time: string;
  opening_evening_time: string;
  closing_evening_time: string;
  active: boolean;
}

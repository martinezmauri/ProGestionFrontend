import { WeekDays } from "../enum/WeekDays";

export interface IBusiness {
  name: string;
  description: string;
  phone_number: string;
  opening_hours: { open: string; close: string }; // {open:"09:00",close: "18:00"};
  work_days: WeekDays[]; // ["Monday", "Tuesday", "Wednesday"]
  logo: string;
}

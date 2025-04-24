import { WeekDays } from "../enum/WeekDays";

export interface IBusiness {
  name: string;
  description: string;
  phone_number: string;
  work_days: WeekDays[]; // ["Monday", "Tuesday", "Wednesday"]
  logo: string;
}

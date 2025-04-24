import { IAddress } from "./IAddress";
import { IWorkSchedule } from "./IWorkSchedule";

export interface IBusinessSearch {
  id: number;
  name: string;
  description: string;
  phoneNumber: string;
  logo: string;
  address: IAddress;
  businessHours: IWorkSchedule[];
}

import { IAddress } from "./IAddress";
import { IBusiness } from "./IBusiness";
import { IWorkSchedule } from "./IWorkSchedule";

export interface IRegisterBusiness {
  name: string;
  description: string;
  phone_number: string;
  logo: string;
  userId: string;
  categoryId: string;
  address: IAddress;
  businessHours: IWorkSchedule[];
}

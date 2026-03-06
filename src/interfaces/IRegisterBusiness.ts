import { IAddress } from "./IAddress";

export interface IRegisterBusiness {
  name: string;
  description: string;
  phone_number: string;
  logo: string;
  userId: string;
  categoryId: string;
  address: IAddress;
}

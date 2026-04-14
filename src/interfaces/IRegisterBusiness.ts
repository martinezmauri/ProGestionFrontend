import { IAddress } from "./IAddress";

export interface IRegisterBusiness {
  name: string;
  description: string;
  phoneNumber: string;
  logo: string;
  userId: string;
  categoryId: string;
  address: IAddress;
}

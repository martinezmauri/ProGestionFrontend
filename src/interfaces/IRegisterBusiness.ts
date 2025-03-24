import { IAddress } from "./IAddress";
import { IBusiness } from "./IBusiness";
import { ICategory } from "./ICategory";

export interface IRegisterBusiness {
  business: IBusiness;
  address: IAddress;
  category: ICategory;
}

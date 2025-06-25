export interface IService {
  id?: number;
  name: string;
  duration: number;
  description: string;
  price: number;
  employee?: { id: string; name: string }[];
  businessId?: string;
}

export interface IServiceUpdate {
  name?: string;
  duration?: number;
  description?: string;
  price?: number;
}

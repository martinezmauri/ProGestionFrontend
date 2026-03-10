export interface IService {
  id?: string;
  name: string;
  duration: number;
  description: string;
  price: number;
  category?: string;
  isActive?: boolean;
  employeeIds?: number[];
  businessId?: string;
}

export interface IServiceUpdate {
  name?: string;
  duration?: number;
  description?: string;
  price?: number;
  category?: string;
  isActive?: boolean;
  employeeIds?: number[];
}

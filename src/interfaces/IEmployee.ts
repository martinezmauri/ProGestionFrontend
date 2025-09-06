import { EmployeeRol } from "@enum/EmployeeRol";
import { IWorkSchedule } from "./IWorkSchedule";

export interface IEmployee {
  id?: number | null;
  name: string;
  email: string;
  role: EmployeeRol;
  profile_picture?: string;
  businessId?: string | null;
  servicesIds: number[];
  employeeHours: IWorkSchedule[];
}

export interface IEmployeeResponse {
  id?: string | null;
  name: string;
  profile_picture?: string;
  email: string;
  services: {
    id: string;
    name: string;
  }[];
  businessId: string;
  role: EmployeeRol;
  employeeHours: IWorkSchedule[];
}

export interface IEmployeeEditResponse {
  id?: string;
  name: string;
  email: string;
  profile_picture?: string;
  servicesIds: string[];
  role: EmployeeRol;
  employeeHours: IWorkSchedule[];
}

export interface IEmployeeCreate {
  name: string;
  email: string;
  role: EmployeeRol;
  businessId: string;
  servicesIds: string[];
  employeeHours: IWorkSchedule[];
}

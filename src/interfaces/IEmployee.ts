import { EmployeeRol } from "@enum/EmployeeRol";

export interface IEmployee {
  id?: string | null;
  name: string;
  profile_picture?: string;
  email: string;
  serviceIds: string[];
  businessId: string;
  rol: EmployeeRol;
  employeeHours: {
    day_of_week: string;
    opening_morning_time: string;
    closing_morning_time: string;
    opening_evening_time: string;
    closing_evening_time: string;
  }[];
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
  rol: EmployeeRol;
  employeeHours: {
    day_of_week: string;
    opening_morning_time: string;
    closing_morning_time: string;
    opening_evening_time: string;
    closing_evening_time: string;
  }[];
}

export interface IEmployeeEditResponse {
  id?: string;
  name: string;
  email: string;
  profile_picture?: string;
  services: string[];
  rol: EmployeeRol;
  employeeHours: {
    day_of_week: string;
    opening_morning_time: string;
    closing_morning_time: string;
    opening_evening_time: string;
    closing_evening_time: string;
  }[];
}

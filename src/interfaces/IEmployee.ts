import { EmployeeRol } from "@enum/EmployeeRol";
import { Rol } from "../enum/UserRol";

export interface IEmployee {
  id?: string | null;
  name: string;
  profile_picture: string;
  email: string;
  serviceIds: string[];
  businessId: string | null;
  rol: EmployeeRol;
}
/* Interfaz que debe corresponder con el DTO del endpoint consultado. */
export interface IEmployeeTableResponse {
  id: string;
  name: string;
  profile_picture: string;
  service: {
    id: string;
    name: string;
  };
  rol: EmployeeRol;
}

export interface IEmployeeEditResponse {
  id: string;
  name: string;
  profile_picture: string;
  services: { id: string; name: string }[];
  rol: EmployeeRol | null;
  employeeHours: {
    day_of_week: string;
    opening_morning_time: string;
    closing_morning_time: string;
    opening_evening_time: string;
    closing_evening_time: string;
  }[];
}

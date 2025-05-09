import { Rol } from "../enum/UserRol";

export interface IEmployee {
  id: string | null;
  name: string;
  profilePicture: string;
  serviceIds: string[];
  businessId: string | null;
  rol: Rol;
}
/* Interfaz que debe corresponder con el DTO del endpoint consultado. */
export interface IEmployeeTableResponse {
  id: string;
  name: string;
  profilePicture: string;
  service: {
    id: string;
    name: string;
  } /* agregar [] */;
  rol: Rol;
}

export interface IEmployeeEditResponse {
  id: string;
  name: string;
  profilePicture: string;
  services: { id: string; name: string }[];
  rol: Rol | null;
  workSchedule: {
    dayOfWeek: string;
    openingMorningTime: string;
    closingMorningTime: string;
    openingEveningTime: string;
    closingEveningTime: string;
  }[];
}

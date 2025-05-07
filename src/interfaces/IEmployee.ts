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
export interface IEmployeeResponse {
  id: string;
  name: string;
  profilePicture: string;
  service: {
    id: string;
    name: string;
    price: number;
  };
  businessId: string;
  rol: Rol;
}

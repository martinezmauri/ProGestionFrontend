import { Rol } from "../enum/UserRol";

export interface IEmployee {
  id: string;
  name: string;
  profilePicture: string;
  service: string;
  rol: Rol;
}

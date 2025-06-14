import axios from "axios";
import { IService } from "../interfaces/IService";

export const getService = async (): Promise<IService[]> => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v0/service/findAll"
    );
    if (response.status !== 200) {
      throw new Error("Error al obtener los servicios.");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getServiceByUserId = async (
  userId: number
): Promise<IService[]> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/service/user/${userId}`
    );
    if (response.status !== 200) {
      throw new Error("Error al obtener los servicios.");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

import axios from "axios";
import { IService } from "../interfaces/IService";

const getService = async (): Promise<IService[]> => {
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

export default getService;

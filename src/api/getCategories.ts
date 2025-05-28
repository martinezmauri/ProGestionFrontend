import { ICategory } from "@interfaces/ICategory";
import axios from "axios";

const getCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v0/category/findAll"
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

export default getCategories;

import { ICategory } from "@interfaces/ICategory";
import axios from "axios";

const getCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/category`
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

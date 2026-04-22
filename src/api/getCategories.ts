import { ICategory } from "@interfaces/ICategory";
import api from "./axiosInstance";

const getCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await api.get(
      `/api/v1/category/findAll`
    );
    if (response.status !== 200) {
      throw new Error("Error al obtener las categorías.");
    }
    return response.data.content || response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getCategories;

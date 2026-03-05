import api from "./axiosInstance";
import { IEmployee } from "../interfaces/IEmployee";

const getEmployeeById = async (id: number): Promise<IEmployee | null> => {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_API_URL}/employee/find/${id}`
    );
    if (response.status !== 200) {
      throw new Error("Error al obtener el empleado.");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getEmployeeById;

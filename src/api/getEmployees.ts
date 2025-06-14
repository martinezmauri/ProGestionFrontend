import axios from "axios";
import { IEmployeeTableResponse } from "../interfaces/IEmployee";

export const getEmployeesByBusinessId = async (
  id: number
): Promise<IEmployeeTableResponse[] | null> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/employee/${id}`
    );
    console.log(response.data);

    if (response.status !== 200) {
      throw new Error("Error al obtener el empleado.");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getEmployeesByUserId = async (
  id: number
): Promise<IEmployeeTableResponse[] | null> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/employee/user/${id}`
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

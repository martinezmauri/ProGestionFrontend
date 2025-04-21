import axios from "axios";
import { IEmployee } from "../interfaces/IEmployee";

const getEmployee = async (): Promise<IEmployee | null> => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v0/employee/find/1"
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

export default getEmployee;

import axios from "axios";
import { IEmployee, IEmployeeTableResponse } from "../interfaces/IEmployee";

const getEmployeesByBusinessId = async (
  id: number
): Promise<IEmployeeTableResponse[] | null> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v0/employee/findAll/?businessId=${id}`
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

export default getEmployeesByBusinessId;

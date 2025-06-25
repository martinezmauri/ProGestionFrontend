import axios from "axios";
import {
  IEmployee,
  IEmployeeCreate,
  IEmployeeResponse,
} from "../interfaces/IEmployee";

export const getEmployeesByBusinessId = async (
  id: number
): Promise<IEmployeeResponse[] | null> => {
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
): Promise<IEmployeeResponse[] | null> => {
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

export const createEmployee = async (payload: IEmployee) => {
  const normalizedPayload = {
    ...payload,
    employeeHours: payload.employeeHours.map((h) => ({
      ...h,
      opening_morning_time:
        h.opening_morning_time === "" ? null : h.opening_morning_time,
      closing_morning_time:
        h.closing_morning_time === "" ? null : h.closing_morning_time,
      opening_evening_time:
        h.opening_evening_time === "" ? null : h.opening_evening_time,
      closing_evening_time:
        h.closing_evening_time === "" ? null : h.closing_evening_time,
    })),
  };
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/employee`,
      normalizedPayload
    );

    if (response.status !== 201) {
      throw new Error("Error al crear el empleado.");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateEmployee = async (
  id: number,
  employee: Partial<IEmployee>
) => {
  try {
    console.log(employee);

    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/employee/${id}`,
      employee
    );
    console.log("response", response);

    if (response.status !== 200) {
      throw new Error("Error al actualizar el empleado.");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

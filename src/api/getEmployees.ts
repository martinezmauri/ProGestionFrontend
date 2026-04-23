import api from "./axiosInstance";
import {
  IEmployee,
  IEmployeeCreate,
  IEmployeeResponse,
} from "../interfaces/IEmployee";

export const getEmployeesByBusinessId = async (
  id: string
): Promise<IEmployeeResponse[] | null> => {
  try {
    const response = await api.get(
      `/employee/findAll?businessId=${id}`
    );
    console.log(response.data);

    if (response.status !== 200) {
      throw new Error("Error al obtener el empleado.");
    }

    // Map backend keys to frontend UI
    const mappedData = response.data.map((emp: any) => ({
      ...emp,
      employeeHours: emp.workSchedules || [],
    }));

    return mappedData;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const createEmployee = async (payload: IEmployee) => {
  const normalizedPayload = {
    ...payload,
    serviceIds: payload.servicesIds,
    workSchedules: payload.employeeHours,
  };
  delete (normalizedPayload as any).servicesIds;
  delete (normalizedPayload as any).employeeHours;
  try {
    const response = await api.post(
      `/employee/save`,
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
    const payloadToSend: any = { ...employee };
    if (employee.servicesIds !== undefined) {
      payloadToSend.serviceIds = employee.servicesIds;
      delete payloadToSend.servicesIds;
    }
    if (employee.employeeHours !== undefined) {
      payloadToSend.workSchedules = employee.employeeHours;
      delete payloadToSend.employeeHours;
    }

    console.log("Sending update:", payloadToSend);

    const response = await api.patch(
      `/employee/update/${id}`,
      payloadToSend
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

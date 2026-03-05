import api from "./axiosInstance";
import { IService, IServiceUpdate } from "../interfaces/IService";

export const getService = async (): Promise<IService[]> => {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_API_URL}/service/findAll`
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

export const getServiceByUserId = async (
  userId: number
): Promise<IService[]> => {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_API_URL}/service/user/${userId}`
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

export const getServiceByBusinessId = async (
  businessId: number
): Promise<IService[]> => {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_API_URL}/service/business/${businessId}`
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

export const createService = async (service: IService) => {
  try {
    const response = await api.post(
      `${import.meta.env.VITE_API_URL}/service`,
      service
    );

    if (response.status !== 201) {
      throw new Error("Error al crear el servicio.");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateService = async (
  serviceId: number,
  service: Partial<IService>
) => {
  try {
    const response = await api.patch(
      `${import.meta.env.VITE_API_URL}/service/${serviceId}`,
      service
    );

    if (response.status !== 200) {
      throw new Error("Error al actualizar el servicio.");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

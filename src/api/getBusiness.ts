import axios from "axios";

interface IAddress {
  street: string;
  city: string;
  province?: string;
  country?: string;
}

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
}
interface Employee {
  id: string;
  name: string;
  role: string;
  services: Service[];
}
interface BusinessHours {
  id: string;
  day_of_week: string;
  opening_morning_time: string;
  closing_morning_time: string;
  opening_evening_time: string | null;
  closing_evening_time: string | null;
}
interface ICategory {
  id: string;
  name: string;
}

export interface PropsBusiness {
  id: string;
  name: string;
  logo: string;
  phone_number: string;
  address: IAddress;
  open: boolean;
  services: Service[];
  category: ICategory;
  employees: Employee[];
  businessHours: BusinessHours[];
}

const getBusiness = async (): Promise<PropsBusiness[]> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/business`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBusinessById = async (
  id: string
): Promise<PropsBusiness | undefined> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/business/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el negocio con id ${id}:`, error);
    return undefined;
  }
};

export default getBusiness;

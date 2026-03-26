import { useState } from "react";
import { IRegisterBusiness } from "../interfaces/IRegisterBusiness";
import api from "@api/axiosInstance";

export const useRegistrationBusiness = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerBusiness = async (newBusinessData: IRegisterBusiness) => {
    setLoading(true);

    try {
      const payload = {
        name: newBusinessData.name,
        description: newBusinessData.description,
        phoneNumber: newBusinessData.phone_number,
        logo: newBusinessData.logo,
        category: { id: newBusinessData.categoryId },
        address: {
          street: newBusinessData.address.street,
          streetNumber: newBusinessData.address.streetNumber,
          city: newBusinessData.address.city,
          province: newBusinessData.address.province,
          country: newBusinessData.address.country
        }
      };
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/business/save`,
        payload
      );
      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };
  return { registerBusiness, loading, error };
};

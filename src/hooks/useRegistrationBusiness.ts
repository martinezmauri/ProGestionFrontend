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
        phoneNumber: newBusinessData.phoneNumber,
        logo: newBusinessData.logo,
        category: { id: Number(newBusinessData.categoryId) },
        address: {
          street: newBusinessData.address.street,
          streetNumber: String(newBusinessData.address.street_number),
          city: newBusinessData.address.city,
          province: newBusinessData.address.province,
          country: newBusinessData.address.country
        }
      };
      const response = await api.post("/api/v1/business/save", payload);
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

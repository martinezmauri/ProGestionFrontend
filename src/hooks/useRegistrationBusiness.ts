import { useState } from "react";
import { IRegisterBusiness } from "../interfaces/IRegisterBusiness";
import axios from "axios";
import { IWorkSchedule } from "../interfaces/IWorkSchedule";

export const useRegistrationBusiness = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const registerBusiness = async (
    data: IRegisterBusiness,
    businessHours: IWorkSchedule[]
  ) => {
    console.log(data.business);

    setLoading(true);
    try {
      const addressResponse = await axios.post(
        "http://localhost:8080/api/v0/address/save",
        data.address
      );

      const businessResponse = await axios.post(
        "http://localhost:8080/api/v0/business/save",
        {
          ...data.business,
          user: { id: 1 },
          category: { id: 1 },
          address: { id: 1 },
        }
      );
      const businessHoursResponse = await axios.post(
        "http://localhost:8080/api/v0/business/1/hours",
        businessHours
      );

      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };
  return { registerBusiness, loading, error, success };
};

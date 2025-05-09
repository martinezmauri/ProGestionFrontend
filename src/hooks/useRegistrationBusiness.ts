import { useEffect, useState } from "react";
import { IRegisterBusiness } from "../interfaces/IRegisterBusiness";
import axios from "axios";
import { IWorkSchedule } from "../interfaces/IWorkSchedule";
import { IAddress } from "../interfaces/IAddress";

export const useRegistrationBusiness = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const registerBusiness = async (
    businessHours: IWorkSchedule[],
    businessData: IRegisterBusiness,
    addressData: IAddress
  ) => {
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8080/api/v0/address/save",
        addressData
      );

      const payload = {
        name: businessData.business.name,
        description: businessData.business.description,
        phoneNumber: businessData.business.phone_number,
        logo: businessData.business.logo || "",
        user: { id: 1 },
        category: { id: 1 },
        address: { id: 1 },
      };

      await axios.post("http://localhost:8080/api/v0/business/save", payload);

      await axios.post(
        "http://localhost:8080/api/v0/business/1/hours" /* el 1 debe ser el id del business */,
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

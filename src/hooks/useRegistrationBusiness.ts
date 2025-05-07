import { useState } from "react";
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
    console.log(businessHours);
    try {
      await axios.post(
        "http://localhost:8080/api/v0/address/save",
        addressData
      );

      await axios.post("http://localhost:8080/api/v0/business/save", {
        businessData,
        user: { id: 1 },
        category: { id: 1 } /* businessData.category */,
        address: { id: 1 },
      });

      await axios.post(
        /* Falla. 400 BadRequest */
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

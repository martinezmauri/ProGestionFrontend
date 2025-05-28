import { useEffect, useState } from "react";
import { IRegisterBusiness } from "../interfaces/IRegisterBusiness";
import axios from "axios";
import { IWorkSchedule } from "../interfaces/IWorkSchedule";
import { IAddress } from "../interfaces/IAddress";

export const useRegistrationBusiness = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerBusiness = async (
    businessHours: IWorkSchedule[],
    businessData: IRegisterBusiness,
    addressData: IAddress
  ) => {
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8080/api/v0/business-registration/register",
        {
          business: businessData.business,
          address: addressData,
          categoryId: businessData.id_category,
          userId: 1,
          businessHours,
        }
      );
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };
  return { registerBusiness, loading, error };
};

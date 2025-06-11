import { useEffect, useState } from "react";
import { IRegisterBusiness } from "../interfaces/IRegisterBusiness";
import axios from "axios";

export const useRegistrationBusiness = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerBusiness = async (newBusinessData: IRegisterBusiness) => {
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/business`, {
        newBusinessData,
      });
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };
  return { registerBusiness, loading, error };
};

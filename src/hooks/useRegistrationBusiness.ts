import { useState } from "react";
import { IRegisterBusiness } from "../interfaces/IRegisterBusiness";
import axios from "axios";

export const useRegistrationBusiness = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const registerBusiness = async (data: IRegisterBusiness) => {
    setLoading(true);
    try {
      const addressResponse = await axios.post(
        "http://localhost:8080/api/v0/address/save",
        data.address
      );
      if (addressResponse.status !== 201) {
        throw new Error("Error al registrar la direccion");
      }

      const businessResponse = await axios.post(
        "http://localhost:8080/api/v0/business/save",
        data.business
      );
      if (businessResponse.status !== 201) {
        throw new Error("Error al registrar el negocio");
      }
      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };
  return { registerBusiness, loading, error, success };
};

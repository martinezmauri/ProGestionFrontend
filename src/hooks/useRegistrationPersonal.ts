import { Rol } from "@enum/UserRol";
import { IEmployee } from "@interfaces/IEmployee";
import { IWorkSchedule } from "@interfaces/IWorkSchedule";
import api from "@api/axiosInstance";
import { useState } from "react";

export const useRegistrationPersonal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const registerPersonal = async (bodyObject: IEmployee) => {
    setLoading(true);
    if (bodyObject.id === null) {
      try {
        await api.post(
          `${import.meta.env.VITE_API_URL}/employee/save`,
          bodyObject
        );
        setSuccess(true);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Error desconocido al registrar personal"
        );
      } finally {
        setLoading(false);
      }
    } else {
      /* ACTUALIZAMOS EL QUE YA TENEMOS */
    }
  };
  const registerHoursPersonal = async (workSchedule: IWorkSchedule[]) => {
    setLoading(true);
    try {
      await api.post(
        `${import.meta.env.VITE_API_URL}/employees/1/hours`,
        workSchedule
      );
      setSuccess(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Error desconocido al registrar personal"
      );
    } finally {
      setLoading(false);
    }
  };
  return { registerPersonal, registerHoursPersonal, loading, error, success };
};

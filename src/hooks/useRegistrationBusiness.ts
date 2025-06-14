import { useEffect, useState } from "react";
import { IRegisterBusiness } from "../interfaces/IRegisterBusiness";
import axios from "axios";

export const diasAIngles: Record<string, string> = {
  lunes: "monday",
  martes: "tuesday",
  miercoles: "wednesday",
  jueves: "thursday",
  viernes: "friday",
  sabado: "saturday",
  domingo: "sunday",
};

export const useRegistrationBusiness = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerBusiness = async (newBusinessData: IRegisterBusiness) => {
    setLoading(true);

    try {
      const businessHoursFormatted = newBusinessData.businessHours
        .filter((h) => h.active)
        .map((h) => ({
          day_of_week: diasAIngles[h.day_of_week.toLowerCase()],
          opening_morning_time: h.opening_morning_time,
          closing_morning_time: h.closing_morning_time,
          opening_evening_time: h.opening_evening_time,
          closing_evening_time: h.closing_evening_time,
        }));
      const payload = {
        ...newBusinessData,
        businessHours: businessHoursFormatted,
      };
      console.log(payload);
      await axios.post(`${import.meta.env.VITE_API_URL}/business`, payload);

      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { registerBusiness, loading, error };
};

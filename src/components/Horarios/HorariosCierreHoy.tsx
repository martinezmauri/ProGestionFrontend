import { PropsBusiness } from "@api/getBusiness";
import { Clock } from "lucide-react";

interface Props {
  business: PropsBusiness;
}

const HorarioCierreHoy = ({ business }: Props) => {
  const daysMap: Record<number, string> = {
    0: "Domingo",
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado",
  };

  const todayName = daysMap[new Date().getDay()];

  // Busco el horario para hoy
  const horarioHoy = business.businessHours.find(
    (h) => h.day_of_week === todayName
  );

  // Si no hay horario para hoy, muestro cerrado
  if (!horarioHoy) {
    return (
      <div className="flex items-center">
        <Clock className="h-4 w-4 text-gray-500 mr-2" />
        <span className="text-sm">Cerrado hoy</span>
      </div>
    );
  }

  // Determino la hora de cierre más tarde hoy
  // Puede ser closing_evening_time si existe, sino closing_morning_time
  const closingEvening = horarioHoy.closing_evening_time;
  const closingMorning = horarioHoy.closing_morning_time;

  // Elijo la hora de cierre más tarde (si hay evening, la prefiero)
  const closingTime = closingEvening || closingMorning;

  // Si no hay cierre (ej. cerrado todo el día)
  if (!closingTime || closingTime === "") {
    return (
      <div className="flex items-center">
        <Clock className="h-4 w-4 text-gray-500 mr-2" />
        <span className="text-sm">Cerrado hoy</span>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <Clock className="h-4 w-4 text-gray-500 mr-2" />
      <span className="text-sm">Abierto hasta las {closingTime}</span>
    </div>
  );
};

export default HorarioCierreHoy;

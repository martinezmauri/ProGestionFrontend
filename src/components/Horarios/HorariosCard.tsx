import { PropsBusiness } from "@api/getBusiness";
import { CardContent } from "@ui/card";
import { useMemo } from "react";

const daysOrder = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const HorariosCard = ({ business }: { business: PropsBusiness }) => {
  // Día actual capitalizado, para comparar con day_of_week
  const today = useMemo(() => {
    const d = new Date();
    const dayName = d.toLocaleDateString("es-AR", { weekday: "long" });
    return dayName.charAt(0).toUpperCase() + dayName.slice(1);
  }, []);

  // Ordenamos los días y rellenamos con "Cerrado" si no hay horarios
  const horariosOrdenados = daysOrder.map((day) => {
    const horario = business.businessHours.find((h) => h.day_of_week === day);

    if (!horario) {
      return { day, hours: "Cerrado" };
    }

    const morning =
      horario.opening_morning_time && horario.closing_morning_time
        ? `${horario.opening_morning_time} - ${horario.closing_morning_time}`
        : "";

    const evening =
      horario.opening_evening_time && horario.closing_evening_time
        ? `${horario.opening_evening_time} - ${horario.closing_evening_time}`
        : "";

    let hours = "";
    if (morning && evening) {
      hours = `${morning} / ${evening}`;
    } else if (morning) {
      hours = morning;
    } else if (evening) {
      hours = evening;
    } else {
      hours = "Cerrado";
    }

    return { day, hours };
  });

  // Dividir en dos columnas: lun-jue y vie-dom
  const primeraColumna = horariosOrdenados.slice(0, 4);
  const segundaColumna = horariosOrdenados.slice(4);

  return (
    <CardContent className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {primeraColumna.map(({ day, hours }, idx) => {
            const isToday = day === today;
            return (
              <div
                key={idx}
                className={`flex justify-between items-center p-2 rounded ${
                  isToday ? "bg-purple-50 border border-purple-200" : ""
                }`}
              >
                <span
                  className={`font-medium ${
                    isToday ? "text-purple-700" : "text-gray-700"
                  }`}
                >
                  {day}
                  {isToday && " (Hoy)"}
                </span>
                <span
                  className={
                    hours === "Cerrado"
                      ? "text-red-600"
                      : isToday
                      ? "text-purple-600"
                      : "text-gray-600"
                  }
                >
                  {hours}
                </span>
              </div>
            );
          })}
        </div>
        <div className="space-y-3">
          {segundaColumna.map(({ day, hours }, idx) => {
            const isToday = day === today;
            return (
              <div
                key={idx}
                className={`flex justify-between items-center p-2 rounded ${
                  isToday ? "bg-purple-50 border border-purple-200" : ""
                }`}
              >
                <span
                  className={`font-medium ${
                    isToday ? "text-purple-700" : "text-gray-700"
                  }`}
                >
                  {day}
                  {isToday && " (Hoy)"}
                </span>
                <span
                  className={
                    hours === "Cerrado"
                      ? "text-red-600"
                      : isToday
                      ? "text-purple-600"
                      : "text-gray-600"
                  }
                >
                  {hours}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </CardContent>
  );
};

export default HorariosCard;

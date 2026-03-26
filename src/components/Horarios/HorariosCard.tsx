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

interface DaySchedule {
  day: string;
  isClosed: boolean;
  morning?: string;
  evening?: string;
}

const HorariosCard = ({ business }: { business: PropsBusiness }) => {
  const today = useMemo(() => {
    const d = new Date();
    const dayName = d.toLocaleDateString("es-AR", { weekday: "long" });
    return dayName.charAt(0).toUpperCase() + dayName.slice(1);
  }, []);

  const horariosOrdenados: DaySchedule[] = daysOrder.map((day) => {
    const horario = business.businessHours.find((h) => h.day_of_week === day);

    if (!horario) return { day, isClosed: true };

    const morning =
      horario.opening_morning_time && horario.closing_morning_time
        ? `${horario.opening_morning_time} – ${horario.closing_morning_time}`
        : undefined;

    const evening =
      horario.opening_evening_time && horario.closing_evening_time
        ? `${horario.opening_evening_time} – ${horario.closing_evening_time}`
        : undefined;

    if (!morning && !evening) return { day, isClosed: true };

    return { day, isClosed: false, morning, evening };
  });

  const DayRow = ({ schedule }: { schedule: DaySchedule }) => {
    const isToday = schedule.day === today;
    return (
      <div
        className={`flex items-start justify-between gap-4 px-3 py-2.5 rounded-lg transition-colors ${
          isToday
            ? "bg-purple-50 border border-purple-200"
            : "hover:bg-gray-50"
        }`}
      >
        {/* Day label */}
        <span
          className={`text-sm font-semibold w-24 shrink-0 pt-0.5 ${
            isToday ? "text-purple-700" : "text-gray-700"
          }`}
        >
          {schedule.day}
          {isToday && (
            <span className="ml-1.5 text-[10px] font-bold uppercase tracking-wide bg-purple-600 text-white px-1.5 py-0.5 rounded-full">
              Hoy
            </span>
          )}
        </span>

        {/* Hours */}
        <div className="flex flex-col items-end gap-0.5 text-sm">
          {schedule.isClosed ? (
            <span className="font-medium text-red-500">Cerrado</span>
          ) : (
            <>
              {schedule.morning && (
                <span
                  className={`font-medium tabular-nums ${
                    isToday ? "text-purple-600" : "text-gray-600"
                  }`}
                >
                  {schedule.morning}
                </span>
              )}
              {schedule.morning && schedule.evening && (
                <span className="text-gray-300 text-xs leading-none">—</span>
              )}
              {schedule.evening && (
                <span
                  className={`font-medium tabular-nums ${
                    isToday ? "text-purple-600" : "text-gray-600"
                  }`}
                >
                  {schedule.evening}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <CardContent className="px-4 py-3">
      <div className="flex flex-col gap-1">
        {horariosOrdenados.map((schedule) => (
          <DayRow key={schedule.day} schedule={schedule} />
        ))}
      </div>
    </CardContent>
  );
};

export default HorariosCard;

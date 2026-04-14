import { PropsBusiness } from "@api/getBusiness";
import { CardContent } from "@ui/card";
import { mapBackendSchedule } from "@utils/scheduleMapper";
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
  const todayNum = useMemo(() => new Date().getDay(), []);

  const horariosOrdenados: DaySchedule[] = useMemo(() => {
    const standardHours = mapBackendSchedule(business.businessHours || []);
    
    // El orden deseado es Lunes (1) a Domingo (0)
    const order = [1, 2, 3, 4, 5, 6, 0];
    
    return order.map((dayNum) => {
      const dayName = daysOrder[dayNum === 0 ? 6 : dayNum - 1];
      const horario = standardHours.find((h) => h.dayOfWeek === dayNum);

      if (!horario || !horario.isWorkingDay) {
        return { day: dayName, dayNum, isClosed: true };
      }

      const morning =
        horario.morningStart && horario.morningEnd
          ? `${horario.morningStart} – ${horario.morningEnd}`
          : undefined;

      const evening =
        horario.afternoonStart && horario.afternoonEnd
          ? `${horario.afternoonStart} – ${horario.afternoonEnd}`
          : undefined;

      return { 
        day: dayName, 
        dayNum,
        isClosed: false, 
        morning, 
        evening 
      };
    });
  }, [business.businessHours]);

  const DayRow = ({ schedule }: { schedule: DaySchedule & { dayNum?: number } }) => {
    const isToday = schedule.dayNum === todayNum;
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

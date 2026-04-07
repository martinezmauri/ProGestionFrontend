import React from "react";
import { format, isToday } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@lib/utils";
import { CalendarOff } from "lucide-react";

interface DayColumnHeaderProps {
  date: Date;
  isClosed: boolean;
}

export const DayColumnHeader = ({ date, isClosed }: DayColumnHeaderProps) => {
  const dayName = format(date, "EEE", { locale: es });
  const dayNumber = format(date, "d");
  const today = isToday(date);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-3 px-2 border-r border-slate-200 min-w-[140px] select-none transition-colors",
        isClosed
          ? "bg-slate-100 text-slate-400"
          : today
            ? "bg-orange-50"
            : "bg-white"
      )}
    >
      <span
        className={cn(
          "text-[11px] font-bold uppercase tracking-wider",
          isClosed ? "text-slate-400" : today ? "text-orange-600" : "text-slate-500"
        )}
      >
        {dayName}
      </span>
      <span
        className={cn(
          "text-lg font-extrabold leading-none mt-0.5",
          today
            ? "bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center"
            : isClosed
              ? "text-slate-400"
              : "text-slate-800"
        )}
      >
        {dayNumber}
      </span>
      {isClosed && (
        <span className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-wider">
          <CalendarOff className="w-3 h-3" />
          Cerrado
        </span>
      )}
    </div>
  );
};

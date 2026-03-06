import React from "react";
import { User, Clock, PlusCircle } from "lucide-react";
import { cn } from "@lib/utils";

interface TimeColumnProps {
  slots: string[];
}

export const TimeColumn = ({ slots }: TimeColumnProps) => (
  <div className="w-[100px] flex-shrink-0 bg-[#F8FAFC] border-r border-[#E2E8F0] flex flex-col z-20">
    {/* Header Placeholder for Time Column */}
    <div className="h-16 shrink-0 border-b border-[#E2E8F0] bg-gray-50 flex items-center justify-center text-[10px] uppercase tracking-wider font-semibold text-gray-400">
      <Clock className="w-3 h-3 mr-1" /> Hora
    </div>
    {slots.map((slot, idx) => (
      <div
        key={`time-${idx}`}
        className="h-20 flex px-4 items-start pt-4 justify-end border-b border-[#E2E8F0] text-[11px] font-medium text-gray-400 uppercase tracking-tighter"
      >
        {slot}
      </div>
    ))}
  </div>
);

interface ResourceHeaderProps {
  name: string;
}

export const ResourceHeader = ({ name }: ResourceHeaderProps) => (
  <div className="w-[300px] h-16 shrink-0 border-b border-r border-[#E2E8F0] bg-[#E6F4EA] flex items-center justify-center font-bold text-[#065F46] shadow-sm text-sm">
    <User className="w-4 h-4 mr-2 opacity-70" />
    <span className="truncate px-2">{name}</span>
  </div>
);

interface AppointmentBlockProps {
  appointment: {
    startTime: string; // "08:30"
    endTime: string;
    duration: number; // in minutes
    customerName: string;
    serviceName: string;
    appointmentId: number;
    status?: "PRO" | "FIJO" | "PENDIENTE";
  };
  slots: string[];
  onClick?: () => void;
}

export const AppointmentBlock = ({
  appointment,
  slots,
  onClick,
}: AppointmentBlockProps) => {
  const {
    startTime,
    customerName,
    serviceName,
    duration,
    status = "FIJO",
  } = appointment;

  // 30 mins = 80px (h-20)
  const slotIndex = slots.findIndex((s) => s === startTime);
  if (slotIndex === -1) return null;

  const top = slotIndex * 80;
  const height = (duration / 30) * 80;

  return (
    <div
      className="absolute left-1 right-1 z-10 cursor-pointer group px-1 pt-1"
      style={{ top: `${top}px`, height: `${height}px` }}
      onClick={onClick}
    >
      <div className="w-full h-full bg-[#1F2937] rounded-xl p-3 text-white shadow-xl flex flex-col justify-between border border-white/5 hover:bg-[#111827] transition-all overflow-hidden">
        <div className="flex justify-between items-start">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold opacity-70 uppercase tracking-tight">
              {startTime} - {appointment.endTime}
            </span>
            <span className="text-sm font-bold mt-1 truncate leading-tight">
              {customerName}
            </span>
          </div>
          <span className="text-[8px] font-black bg-white/10 px-1.5 py-0.5 rounded-sm shrink-0">
            {status}
          </span>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0" />
            <span className="text-[11px] font-medium text-white/70 truncate uppercase tracking-tighter">
              {serviceName}
            </span>
          </div>
          <PlusCircle className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors shrink-0 m-1" />
        </div>
      </div>
    </div>
  );
};

interface GridCellProps {
  time: string;
  onAdd?: () => void;
  isAvailable?: boolean;
  isBooked?: boolean;
}

export const GridCell = ({
  time,
  onAdd,
  isAvailable = true,
  isBooked = false,
}: GridCellProps) => (
  <div
    className={cn(
      "h-20 border-b border-[#F1F5F9] transition-colors relative group",
      !isAvailable
        ? "bg-gray-50/50 cursor-not-allowed"
        : isBooked
          ? "bg-[#FFF7ED] cursor-default"
          : "bg-white hover:bg-[#F8FAFC] cursor-pointer",
    )}
    onClick={isAvailable && !isBooked ? onAdd : undefined}
  >
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center transition-opacity pointer-events-none",
        isAvailable && !isBooked
          ? "opacity-0 group-hover:opacity-100"
          : "opacity-0",
      )}
    >
      <div className="w-8 h-8 rounded-full bg-[#E6F4EA] flex items-center justify-center">
        <PlusCircle className="w-4 h-4 text-[#059669]" />
      </div>
    </div>
    {isBooked && (
      <div className="absolute inset-0 flex items-center justify-center bg-orange-50/30">
        <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest opacity-40">
          Ocupado
        </span>
      </div>
    )}
  </div>
);

interface CurrentTimeIndicatorProps {
  slots: string[];
  currentLocalTime: Date;
  totalGridWidth: number;
}

export const CurrentTimeIndicator = ({
  slots,
  currentLocalTime,
  totalGridWidth,
}: CurrentTimeIndicatorProps) => {
  const hours = currentLocalTime.getHours();
  const minutes = currentLocalTime.getMinutes();
  const timeStr = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  // Find closest slot or calculate absolute top
  const baseH = 8; // 08:00 start
  const currentTotalMinutes = hours * 60 + minutes;
  const startTotalMinutes = baseH * 60;

  if (currentTotalMinutes < startTotalMinutes) return null;

  // 30 mins = 80px
  const top = ((currentTotalMinutes - startTotalMinutes) / 30) * 80;

  return (
    <div
      className="absolute left-0 z-40 pointer-events-none flex items-center"
      style={{ top: `${top}px`, width: "100%" }}
    >
      <div
        className="relative flex items-center"
        style={{ width: `${totalGridWidth + 100}px` }}
      >
        <div className="absolute -left-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-md z-50 shrink-0" />
        <div className="w-full h-[1px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
      </div>
    </div>
  );
};

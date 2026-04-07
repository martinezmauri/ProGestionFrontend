import React from "react";
import { format, isToday } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@lib/utils";
import { PlusCircle, CalendarOff, User } from "lucide-react";
import { DayColumnHeader } from "./DayColumnHeader";
import type { IAppointment, IBusinessDayConfig, IGridEmployee } from "@interfaces/IAppointment";

interface WeeklyGridProps {
  weekDays: Date[];
  employees: IGridEmployee[];
  appointments: IAppointment[];
  businessHours: IBusinessDayConfig[];
  allTimeSlots: string[];
  isDayClosed: (dayOfWeek: number) => boolean;
  getAppointmentsForSlot: (dateStr: string, employeeId: number, time: string) => IAppointment[];
  onSlotClick: (date: Date, employeeId: number, time: string) => void;
  onAppointmentClick: (appointment: IAppointment) => void;
  loading: boolean;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const TimeCell = ({ time, isHour }: { time: string; isHour: boolean }) => (
  <div
    className={cn(
      "h-14 flex items-center justify-end pr-3 text-[11px] font-medium tracking-tight select-none shrink-0",
      isHour ? "text-slate-500 font-semibold" : "text-slate-300"
    )}
  >
    {time}
  </div>
);

const AppointmentChip = ({
  appointment,
  onClick,
}: {
  appointment: IAppointment;
  onClick: () => void;
}) => {
  const statusColors: Record<string, string> = {
    APPROVED: "bg-slate-900 text-white hover:bg-slate-800",
    PENDING: "bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200",
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "w-full rounded-lg px-2 py-1.5 text-left transition-all cursor-pointer shadow-sm group",
        statusColors[appointment.status] || "bg-slate-200 text-slate-700"
      )}
      // data-* attributes for future drag & drop
      data-appointment-id={appointment.id}
      data-employee-id={appointment.employeeId}
      data-date={appointment.appointmentDate}
      data-start={appointment.startTime}
    >
      <div className="flex items-center gap-1 min-w-0">
        <div
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            appointment.status === "APPROVED" ? "bg-emerald-400" : "bg-amber-500"
          )}
        />
        <span className="text-[10px] font-bold truncate leading-none">
          {appointment.customerName || `#${appointment.userId}`}
        </span>
      </div>
      <p className="text-[9px] opacity-70 truncate mt-0.5 leading-none">
        {appointment.startTime} — {appointment.serviceName || "Servicio"}
      </p>
    </button>
  );
};

const EmptySlot = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full h-full min-h-[28px] rounded-lg group/slot transition-colors hover:bg-emerald-50/60 flex items-center justify-center"
  >
    <PlusCircle className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover/slot:opacity-100 transition-opacity" />
  </button>
);

const ClosedOverlay = () => (
  <div className="absolute inset-0 bg-slate-100/80 backdrop-blur-[1px] flex items-center justify-center z-10 pointer-events-none">
    <div className="flex flex-col items-center opacity-40">
      <CalendarOff className="w-6 h-6 text-slate-400 mb-1" />
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
        Cerrado
      </span>
    </div>
  </div>
);

// ─── Current Time Indicator ──────────────────────────────────────────────────

const CurrentTimeLine = ({
  allTimeSlots,
  slotHeight,
}: {
  allTimeSlots: string[];
  slotHeight: number;
}) => {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const nowStr = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;

  if (allTimeSlots.length === 0) return null;
  const firstSlot = allTimeSlots[0];
  const [fh, fm] = firstSlot.split(":").map(Number);
  const startMinutes = fh * 60 + fm;
  const currentMinutes = h * 60 + m;
  if (currentMinutes < startMinutes) return null;

  const top = ((currentMinutes - startMinutes) / 30) * slotHeight;

  return (
    <div
      className="absolute left-0 right-0 z-30 pointer-events-none flex items-center"
      style={{ top: `${top}px` }}
    >
      <div className="w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-md -ml-1 shrink-0" />
      <div className="flex-1 h-[2px] bg-red-500/70 shadow-[0_0_6px_rgba(239,68,68,0.3)]" />
    </div>
  );
};

// ─── Main Grid Component ─────────────────────────────────────────────────────

export const WeeklyGrid = ({
  weekDays,
  employees,
  appointments,
  businessHours,
  allTimeSlots,
  isDayClosed,
  getAppointmentsForSlot,
  onSlotClick,
  onAppointmentClick,
  loading,
}: WeeklyGridProps) => {
  const SLOT_HEIGHT = 56; // h-14 = 56px
  const EMP_COL_WIDTH = 120; // px per employee sub-column
  const TIME_COL_WIDTH = 64; // px

  const todayDayIndex = weekDays.findIndex((d) => isToday(d));

  return (
    <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="flex items-center gap-2 text-slate-500">
            <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Cargando turnos...</span>
          </div>
        </div>
      )}

      {/* Scrollable container */}
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <div className="flex flex-col min-w-max">
          {/* ═══ Header Row ═══ */}
          <div className="flex sticky top-0 z-20 bg-white border-b border-slate-200">
            {/* Time column header */}
            <div
              className="shrink-0 bg-slate-50 border-r border-slate-200 flex items-center justify-center"
              style={{ width: TIME_COL_WIDTH }}
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Hora
              </span>
            </div>

            {/* Day headers */}
            {weekDays.map((day) => {
              const dow = day.getDay();
              const closed = isDayClosed(dow);
              const colWidth = closed
                ? 80
                : Math.max(employees.length * EMP_COL_WIDTH, 140);

              return (
                <div
                  key={day.toISOString()}
                  className="border-r border-slate-200 last:border-r-0"
                  style={{ width: colWidth }}
                >
                  <DayColumnHeader date={day} isClosed={closed} />
                  {/* Employee sub-headers (only if open) */}
                  {!closed && employees.length > 0 && (
                    <div className="flex border-t border-slate-100">
                      {employees.map((emp) => (
                        <div
                          key={emp.id}
                          className="flex items-center justify-center gap-1 py-1.5 border-r border-slate-100 last:border-r-0 text-[10px] font-semibold text-slate-500 truncate px-1"
                          style={{ width: EMP_COL_WIDTH }}
                        >
                          <User className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{emp.name.split(" ")[0]}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ═══ Body Rows ═══ */}
          <div className="relative">
            {/* Current time indicator for today's column */}
            {todayDayIndex >= 0 && (
              <CurrentTimeLine allTimeSlots={allTimeSlots} slotHeight={SLOT_HEIGHT} />
            )}

            {allTimeSlots.map((time, rowIdx) => {
              const isHour = time.endsWith(":00");
              return (
                <div
                  key={time}
                  className={cn(
                    "flex",
                    isHour ? "border-t border-slate-200" : "border-t border-slate-100/60"
                  )}
                >
                  {/* Time label */}
                  <div
                    className="shrink-0 border-r border-slate-200 bg-slate-50/50"
                    style={{ width: TIME_COL_WIDTH }}
                  >
                    <TimeCell time={time} isHour={isHour} />
                  </div>

                  {/* Day columns */}
                  {weekDays.map((day) => {
                    const dow = day.getDay();
                    const closed = isDayClosed(dow);
                    const dateStr = format(day, "yyyy-MM-dd");
                    const colWidth = closed
                      ? 80
                      : Math.max(employees.length * EMP_COL_WIDTH, 140);

                    if (closed) {
                      return (
                        <div
                          key={day.toISOString()}
                          className="border-r border-slate-200 last:border-r-0 relative bg-slate-50/40"
                          style={{ width: colWidth, height: SLOT_HEIGHT }}
                        >
                          {rowIdx === 0 && <ClosedOverlay />}
                        </div>
                      );
                    }

                    return (
                      <div
                        key={day.toISOString()}
                        className="flex border-r border-slate-200 last:border-r-0"
                        style={{ height: SLOT_HEIGHT }}
                      >
                        {employees.map((emp) => {
                          const slotAppts = getAppointmentsForSlot(dateStr, emp.id, time);
                          return (
                            <div
                              key={emp.id}
                              className={cn(
                                "border-r border-slate-100/60 last:border-r-0 p-0.5 relative",
                                isToday(day) && "bg-orange-50/20"
                              )}
                              style={{ width: EMP_COL_WIDTH }}
                              // data-* for future drag & drop
                              data-droppable="true"
                              data-date={dateStr}
                              data-employee={emp.id}
                              data-time={time}
                            >
                              {slotAppts.length > 0 ? (
                                <div className="space-y-0.5 h-full overflow-hidden">
                                  {slotAppts.map((appt) => (
                                    <AppointmentChip
                                      key={appt.id}
                                      appointment={appt}
                                      onClick={() => onAppointmentClick(appt)}
                                    />
                                  ))}
                                </div>
                              ) : (
                                <EmptySlot
                                  onClick={() => onSlotClick(day, emp.id, time)}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

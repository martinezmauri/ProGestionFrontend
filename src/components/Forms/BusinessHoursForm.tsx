import { IWorkSchedule } from "@interfaces/IWorkSchedule";
import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Checkbox } from "@ui/checkbox";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { CheckCircle, Clock, CalendarDays, Copy } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@lib/utils";
import { generateInitialWeeklySchedule } from "../../utils/scheduleDefaults";

interface Props {
  businessHours: IWorkSchedule[];
  setBusinessHours: React.Dispatch<React.SetStateAction<IWorkSchedule[]>>;
  handleFinalSubmit?: () => void;
  title?: string;
  showSubmitButton?: boolean;
}

const daysLabels = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export const BusinessHoursForm = ({
  businessHours,
  handleFinalSubmit,
  setBusinessHours,
  title = "Horario de Atención",
  showSubmitButton = true,
}: Props) => {
  const [splitHours, setSplitHours] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (businessHours.length === 0) {
      const initial = generateInitialWeeklySchedule();
      setBusinessHours(initial);
      const initialSplitState: Record<number, boolean> = {};
      initial.forEach((d) => (initialSplitState[d.dayOfWeek] = false));
      setSplitHours(initialSplitState);
    } else {
      const recoveredSplit: Record<number, boolean> = {};
      businessHours.forEach((bh) => {
        if (bh.afternoonStart || bh.afternoonEnd) {
          recoveredSplit[bh.dayOfWeek] = true;
        } else {
          recoveredSplit[bh.dayOfWeek] = false;
        }
      });
      setSplitHours(recoveredSplit);
    }
  }, []);

  const handleHourChange = (
    index: number,
    field: keyof IWorkSchedule,
    value: string
  ) => {
    setBusinessHours((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value || null } : item))
    );
  };

  const handleDayActiveChange = (index: number, checked: boolean) => {
    setBusinessHours((prev) => {
      const updated = prev.map((item, i) =>
        i === index ? { ...item, isWorkingDay: checked } : item
      );
      return updated;
    });
  };

  const handleSplitChange = (dayOfWeek: number, checked: boolean) => {
    setSplitHours((prev) => ({
      ...prev,
      [dayOfWeek]: checked,
    }));
    // If we uncheck split, clear the evening hours
    if (!checked) {
      const index = businessHours.findIndex((d) => d.dayOfWeek === dayOfWeek);
      if (index !== -1) {
        handleHourChange(index, "afternoonStart", "");
        handleHourChange(index, "afternoonEnd", "");
      }
    }
  };

  const applySchedule = (sourceIndex: number, targetDaysOfWeek: number[]) => {
    const sourceSchedule = businessHours[sourceIndex];
    if (!sourceSchedule) return;

    const sourceSplit = splitHours[sourceSchedule.dayOfWeek] || false;

    setBusinessHours((prev) => {
      const next = [...prev];
      targetDaysOfWeek.forEach((targetDay) => {
        const i = next.findIndex((item) => item.dayOfWeek === targetDay);
        if (i !== -1 && i !== sourceIndex) {
          next[i] = {
            ...next[i],
            isWorkingDay: sourceSchedule.isWorkingDay,
            morningStart: sourceSchedule.morningStart,
            morningEnd: sourceSchedule.morningEnd,
            afternoonStart: sourceSchedule.afternoonStart,
            afternoonEnd: sourceSchedule.afternoonEnd,
          };
        }
      });
      return next;
    });

    setSplitHours((prev) => {
      const next = { ...prev };
      targetDaysOfWeek.forEach((targetDay) => {
        if (targetDay !== sourceSchedule.dayOfWeek) {
          next[targetDay] = sourceSplit;
        }
      });
      return next;
    });
  };

  return (
    <Card className="border-0 shadow-sm overflow-hidden bg-white">
      <CardHeader className="bg-slate-50 border-b px-6 py-5">
        <CardTitle className="flex items-center text-xl text-slate-800">
          <CalendarDays className="w-5 h-5 mr-2 text-orange-500" />
          {title}
        </CardTitle>
        <p className="text-sm text-slate-500 mt-1">
          Configura los días y horarios en los que tu negocio está abierto al público.
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <form className="space-y-6">
          <div className="space-y-3">
            {businessHours.map((schedule, index) => {
              const isActive = schedule.isWorkingDay || false;
              const isSplit = splitHours[schedule.dayOfWeek] || false;
              const dayName = daysLabels[schedule.dayOfWeek];

              return (
                <div
                  key={schedule.dayOfWeek}
                  className={cn(
                    "border rounded-xl p-4 transition-all duration-200",
                    isActive ? "border-orange-200 bg-orange-50/10 shadow-sm" : "border-slate-100 bg-slate-50/50 opacity-70"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={`day-${schedule.dayOfWeek}-active`}
                        checked={isActive}
                        onCheckedChange={(checked) => handleDayActiveChange(index, !!checked)}
                        className={cn(isActive && "data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500")}
                      />
                      <Label
                        htmlFor={`day-${schedule.dayOfWeek}-active`}
                        className={cn("text-base font-semibold cursor-pointer", isActive ? "text-slate-800" : "text-slate-400")}
                      >
                        {dayName}
                      </Label>
                    </div>

                    {isActive && (
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        <div className="flex items-center bg-white border rounded-lg shadow-sm overflow-hidden">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 text-xs text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-none border-r"
                            onClick={(e) => {
                              e.preventDefault();
                              applySchedule(index, [1, 2, 3, 4, 5]); // Lunes a Viernes
                            }}
                            title="Copiar horario a Lunes - Viernes"
                          >
                            <Copy className="w-3 h-3 mr-1.5" /> L-V
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 text-xs text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-none"
                            onClick={(e) => {
                              e.preventDefault();
                              applySchedule(index, [0, 1, 2, 3, 4, 5, 6]); // Todos los días
                            }}
                            title="Copiar horario a todos los días de la semana"
                          >
                            <Copy className="w-3 h-3 mr-1.5" /> Todos
                          </Button>
                        </div>

                        <div className="flex items-center bg-white border px-3 h-8 rounded-lg shadow-sm">
                          <Checkbox
                            id={`day-${schedule.dayOfWeek}-split`}
                            checked={isSplit}
                            onCheckedChange={(checked) => handleSplitChange(schedule.dayOfWeek, !!checked)}
                            className="w-3.5 h-3.5"
                          />
                          <Label
                            htmlFor={`day-${schedule.dayOfWeek}-split`}
                            className="ml-2 text-xs font-medium text-slate-600 cursor-pointer"
                          >
                            Añadir turno tarde
                          </Label>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={cn("grid transition-all duration-300 gap-4", isActive ? "opacity-100" : "opacity-40 pointer-events-none")}>
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                      <div className="flex-1 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                        <Label className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 block">
                          {isSplit ? "Turno Mañana" : "Horario Corrido"}
                        </Label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <Input
                              id={`day-${schedule.dayOfWeek}-open1`}
                              type="time"
                              value={schedule.morningStart || ""}
                              onChange={(e) => handleHourChange(index, "morningStart", e.target.value)}
                              className="h-9"
                            />
                          </div>
                          <span className="text-slate-400 text-sm font-medium">a</span>
                          <div className="flex-1">
                            <Input
                              id={`day-${schedule.dayOfWeek}-close1`}
                              type="time"
                              value={schedule.morningEnd || ""}
                              onChange={(e) => handleHourChange(index, "morningEnd", e.target.value)}
                              className="h-9"
                            />
                          </div>
                        </div>
                      </div>

                      {isSplit && (
                        <div className="flex-1 bg-white p-3 rounded-lg border border-slate-100 shadow-sm relative">
                          <Label className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 block">
                            Turno Tarde
                          </Label>
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <Input
                                id={`day-${schedule.dayOfWeek}-open2`}
                                type="time"
                                value={schedule.afternoonStart || ""}
                                onChange={(e) => handleHourChange(index, "afternoonStart", e.target.value)}
                                className="h-9"
                              />
                            </div>
                            <span className="text-slate-400 text-sm font-medium">a</span>
                            <div className="flex-1">
                              <Input
                                id={`day-${schedule.dayOfWeek}-close2`}
                                type="time"
                                value={schedule.afternoonEnd || ""}
                                onChange={(e) => handleHourChange(index, "afternoonEnd", e.target.value)}
                                className="h-9"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-start mt-6">
            <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
            <div className="ml-3">
              <h4 className="text-sm font-semibold text-slate-700">
                Horario partido vs Corrido
              </h4>
              <p className="text-sm text-slate-500 mt-1">
                Si no seleccionas "Añadir turno tarde", interpretaremos el bloque de arriba como un turno corrido.
                Si seleccionas "turno tarde", el sistema entenderá que el negocio cierra al medio día y reabre más tarde.
              </p>
            </div>
          </div>

          {showSubmitButton && handleFinalSubmit && (
            <div className="flex justify-end pt-6 border-t">
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20"
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  handleFinalSubmit();
                }}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Continuar
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

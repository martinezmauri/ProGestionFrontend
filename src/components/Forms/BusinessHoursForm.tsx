import { WeekDays } from "@enum/WeekDays";
import { IWorkSchedule } from "@interfaces/IWorkSchedule";
import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Checkbox } from "@ui/checkbox";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { CheckCircle, Clock, CalendarDays, SeparatorHorizontal, Copy } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@lib/utils";

interface Props {
  businessHours: IWorkSchedule[];
  setBusinessHours: React.Dispatch<React.SetStateAction<IWorkSchedule[]>>;
  handleFinalSubmit?: () => void;
  title?: string;
  showSubmitButton?: boolean;
}

const diasAIngles: Record<string, WeekDays> = {
  lunes: WeekDays.Monday,
  martes: WeekDays.Tuesday,
  miercoles: WeekDays.Wednesday,
  jueves: WeekDays.Thursday,
  viernes: WeekDays.Friday,
  sabado: WeekDays.Saturday,
  domingo: WeekDays.Sunday,
};

const days = [
  { day: "Lunes", key: "lunes" },
  { day: "Martes", key: "martes" },
  { day: "Miércoles", key: "miercoles" },
  { day: "Jueves", key: "jueves" },
  { day: "Viernes", key: "viernes" },
  { day: "Sábado", key: "sabado" },
  { day: "Domingo", key: "domingo" },
];

export const BusinessHoursForm = ({
  businessHours,
  handleFinalSubmit,
  setBusinessHours,
  title = "Horario de Atención",
  showSubmitButton = true,
}: Props) => {
  const [splitHours, setSplitHours] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (businessHours.length === 0) {
      const initial: IWorkSchedule[] = days.map((d) => ({
        day_of_week: diasAIngles[d.key],
        opening_morning_time: "",
        closing_morning_time: "",
        opening_evening_time: "",
        closing_evening_time: "",
        active: false,
      }));

      const initialSplitState: Record<string, boolean> = {};
      days.forEach((d) => (initialSplitState[d.key] = false));

      setBusinessHours(initial);
      setSplitHours(initialSplitState);
    } else {
      // Recover split hours state if data already exists
      const recoveredSplit: Record<string, boolean> = {};
      businessHours.forEach((bh, index) => {
        if (bh.opening_evening_time || bh.closing_evening_time) {
          recoveredSplit[days[index].key] = true;
        } else {
          recoveredSplit[days[index].key] = false;
        }
      })
      setSplitHours(recoveredSplit);
    }
  }, []);

  const handleHourChange = (
    index: number,
    field: keyof IWorkSchedule,
    value: string
  ) => {
    setBusinessHours((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value || "" } : item))
    );
  };

  const handleDayActiveChange = (index: number, checked: boolean) => {
    setBusinessHours((prev) => {
      const updated = prev.map((item, i) =>
        i === index ? { ...item, active: checked } : item
      );
      return updated;
    });
  };

  const handleSplitChange = (dayKey: string, checked: boolean) => {
    setSplitHours((prev) => ({
      ...prev,
      [dayKey]: checked,
    }));
    // If we uncheck split, clear the evening hours
    if (!checked) {
      const index = days.findIndex(d => d.key === dayKey);
      if (index !== -1) {
        handleHourChange(index, "opening_evening_time", "");
        handleHourChange(index, "closing_evening_time", "");
      }
    }
  };

  const applySchedule = (sourceIndex: number, targetIndices: number[]) => {
    const sourceSchedule = businessHours[sourceIndex];
    if (!sourceSchedule) return;

    const sourceSplit = splitHours[days[sourceIndex].key] || false;

    setBusinessHours((prev) => {
      const next = [...prev];
      targetIndices.forEach((i) => {
        if (i !== sourceIndex && next[i]) {
          next[i] = {
            ...next[i],
            active: sourceSchedule.active,
            opening_morning_time: sourceSchedule.opening_morning_time,
            closing_morning_time: sourceSchedule.closing_morning_time,
            opening_evening_time: sourceSchedule.opening_evening_time,
            closing_evening_time: sourceSchedule.closing_evening_time,
          };
        }
      });
      return next;
    });

    setSplitHours((prev) => {
      const next = { ...prev };
      targetIndices.forEach((i) => {
        if (i !== sourceIndex) {
          next[days[i].key] = sourceSplit;
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
            {days.map((dayInfo, index) => {
              const schedule = businessHours[index] || {};
              const isActive = schedule.active || false;
              const isSplit = splitHours[dayInfo.key] || false;

              return (
                <div
                  key={index}
                  className={cn(
                    "border rounded-xl p-4 transition-all duration-200",
                    isActive ? "border-orange-200 bg-orange-50/10 shadow-sm" : "border-slate-100 bg-slate-50/50 opacity-70"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={`${dayInfo.key}-active`}
                        checked={isActive}
                        onCheckedChange={(checked) =>
                          handleDayActiveChange(index, !!checked)
                        }
                        className={cn(isActive && "data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500")}
                      />
                      <Label
                        htmlFor={`${dayInfo.key}-active`}
                        className={cn("text-base font-semibold cursor-pointer", isActive ? "text-slate-800" : "text-slate-400")}
                      >
                        {dayInfo.day}
                      </Label>
                    </div>

                    {isActive && (
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        {/* Botones de copiado rápido */}
                        <div className="flex items-center bg-white border rounded-lg shadow-sm overflow-hidden">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 text-xs text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-none border-r"
                            onClick={(e) => {
                              e.preventDefault();
                              applySchedule(index, [0, 1, 2, 3, 4]); // Lunes a Viernes
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
                            id={`${dayInfo.key}-split`}
                            checked={isSplit}
                            onCheckedChange={(checked) =>
                              handleSplitChange(dayInfo.key, !!checked)
                            }
                            className="w-3.5 h-3.5"
                          />
                          <Label
                            htmlFor={`${dayInfo.key}-split`}
                            className="ml-2 text-xs font-medium text-slate-600 cursor-pointer"
                          >
                            Añadir turno tarde
                          </Label>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={cn("grid transition-all duration-300 gap-4", isActive ? "opacity-100" : "opacity-40 pointer-events-none")}>

                    {/* Shift Row */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                      <div className="flex-1 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                        <Label className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 block">
                          {isSplit ? "Turno Mañana" : "Horario Corrido"}
                        </Label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <Input
                              id={`${dayInfo.key}-open1`}
                              type="time"
                              value={schedule.opening_morning_time || ""}
                              onChange={(e) =>
                                handleHourChange(index, "opening_morning_time", e.target.value)
                              }
                              className="h-9"
                            />
                          </div>
                          <span className="text-slate-400 text-sm font-medium">a</span>
                          <div className="flex-1">
                            <Input
                              id={`${dayInfo.key}-close1`}
                              type="time"
                              value={schedule.closing_morning_time || ""}
                              onChange={(e) =>
                                handleHourChange(index, "closing_morning_time", e.target.value)
                              }
                              className="h-9"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Split Shift Row */}
                      {isSplit && (
                        <div className="flex-1 bg-white p-3 rounded-lg border border-slate-100 shadow-sm relative">
                          <Label className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 block">
                            Turno Tarde
                          </Label>
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <Input
                                id={`${dayInfo.key}-open2`}
                                type="time"
                                value={schedule.opening_evening_time || ""}
                                onChange={(e) =>
                                  handleHourChange(index, "opening_evening_time", e.target.value)
                                }
                                className="h-9"
                              />
                            </div>
                            <span className="text-slate-400 text-sm font-medium">a</span>
                            <div className="flex-1">
                              <Input
                                id={`${dayInfo.key}-close2`}
                                type="time"
                                value={schedule.closing_evening_time || ""}
                                onChange={(e) =>
                                  handleHourChange(index, "closing_evening_time", e.target.value)
                                }
                                className="h-9"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
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

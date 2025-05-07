import React, { useEffect, useState } from "react";
import { IWorkSchedule } from "../../interfaces/IWorkSchedule";
import { WeekDays } from "../../enum/WeekDays";
import { Card } from "../../ui/card";
import { Input } from "../../ui/input";

interface Props {
  work_days: WeekDays[];
  onScheduleChange: (schedule: IWorkSchedule[]) => void;
}

const translateDay: Record<WeekDays, string> = {
  Monday: "Lunes",
  Tuesday: "Martes",
  Wednesday: "Miércoles",
  Thursday: "Jueves",
  Friday: "Viernes",
  Saturday: "Sábado",
  Sunday: "Domingo",
};

export const BusinessSchedule = ({ work_days, onScheduleChange }: Props) => {
  const [businessWork, setBusinessWork] = useState<IWorkSchedule[]>([]);

  useEffect(() => {
    const initialSchedule = work_days.map((day) => ({
      dayOfWeek: day,
      openingMorningTime: "",
      closingMorningTime: "",
      openingEveningTime: "",
      closingEveningTime: "",
    }));
    setBusinessWork(initialSchedule);
  }, [work_days]);

  useEffect(() => {
    onScheduleChange(businessWork);
  }, [businessWork]);

  const handleTimeChange = (
    day: WeekDays,
    field: keyof Omit<IWorkSchedule, "dayOfWeek">,
    value: string
  ) => {
    setBusinessWork((prev) =>
      prev.map((schedule) =>
        schedule.dayOfWeek === day ? { ...schedule, [field]: value } : schedule
      )
    );
  };

  return (
    <Card className="bg-[#78b3ce]">
      <h1 className="text-black text-[1.2em] font-medium text-center">
        Horarios de atencion
      </h1>
      {work_days.length <= 0 && (
        <div className="text-center">Debes seleccionar los dias laborales.</div>
      )}
      {work_days.length > 0 && (
        <div>
          {work_days.map((day) => {
            const schedule = businessWork.find((s) => s.dayOfWeek === day);
            return (
              <section key={day} className="border-t p-2">
                <h2 className="font-medium text-[1.1em] text-center">
                  {translateDay[day]}
                </h2>
                <div className="flex ">
                  {/* mañana */}
                  <div className="flex gap-2 items-center">
                    <h2 className="font-medium">Turno mañana.</h2>

                    <div className="flex items-center gap-2">
                      <h2>Desde:</h2>
                      <Input
                        type="time"
                        className="border rounded-lg"
                        value={schedule?.openingMorningTime || ""}
                        onChange={(e) =>
                          handleTimeChange(
                            day,
                            "openingMorningTime",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center  gap-2">
                      <h2>Hasta:</h2>
                      <Input
                        type="time"
                        className="border rounded-lg"
                        value={schedule?.closingMorningTime || ""}
                        onChange={(e) =>
                          handleTimeChange(
                            day,
                            "closingMorningTime",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* tarde */}
                  <div className="flex items-center gap-2 ml-2">
                    <h2 className="font-medium">Turno Tarde.</h2>

                    <div className="flex items-center  gap-2">
                      <h2>Desde:</h2>
                      <Input
                        type="time"
                        className="border rounded-lg"
                        value={schedule?.openingEveningTime || ""}
                        onChange={(e) =>
                          handleTimeChange(
                            day,
                            "openingEveningTime",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <h2>Hasta:</h2>
                      <Input
                        type="time"
                        className="border rounded-lg"
                        value={schedule?.closingEveningTime || ""}
                        onChange={(e) =>
                          handleTimeChange(
                            day,
                            "closingEveningTime",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </Card>
  );
};

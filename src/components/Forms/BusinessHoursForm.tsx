import { IRegisterBusiness } from "@interfaces/IRegisterBusiness";
import { IWorkSchedule } from "@interfaces/IWorkSchedule";
import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Checkbox } from "@ui/checkbox";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { CheckCircle, Clock } from "lucide-react";
import React, { useState } from "react";

interface Props {
  businessHours: IWorkSchedule[];
  setBusinessHours: React.Dispatch<React.SetStateAction<IWorkSchedule[]>>;
  handleFinalSubmit: (data: IRegisterBusiness) => void;
}
/* Implemetar: */
/* https://chatgpt.com/c/6849263e-f95c-8001-8d71-992e6e83e676 */
export const BusinessHoursForm = ({
  businessHours,
  handleFinalSubmit,
  setBusinessHours,
}: Props) => {
  const [splitHours, setSplitHours] = useState<Record<string, boolean>>({
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    domingo: false,
  });

  const handleSplitChange = (dayKey: string, checked: boolean) => {
    setSplitHours((prev) => ({
      ...prev,
      [dayKey]: checked,
    }));
  };
  return (
    <Card className="border-0 shadow-md overflow-hidden p-0">
      <CardHeader className="bg-gradient-to-r from-green-500 to-green-400 text-white px-4 py-4">
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Horarios de atención
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form className="space-y-6">
          <div className="space-y-4">
            {[
              { day: "Lunes", key: "lunes" },
              { day: "Martes", key: "martes" },
              { day: "Miércoles", key: "miercoles" },
              { day: "Jueves", key: "jueves" },
              { day: "Viernes", key: "viernes" },
              { day: "Sábado", key: "sabado" },
              { day: "Domingo", key: "domingo" },
            ].map((dayInfo, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Checkbox id={`${dayInfo.key}-active`} />
                    <Label
                      htmlFor={`${dayInfo.key}-active`}
                      className="ml-2 font-medium text-gray-700"
                    >
                      {dayInfo.day}
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id={`${dayInfo.key}-split`}
                      checked={splitHours[dayInfo.key]}
                      onCheckedChange={(checked) =>
                        handleSplitChange(dayInfo.key, !!checked)
                      }
                    />
                    <Label
                      htmlFor={`${dayInfo.key}-split`}
                      className="ml-2 text-sm text-gray-600"
                    >
                      Horario partido
                    </Label>
                  </div>
                </div>

                {/* Primer turno */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <Label
                      htmlFor={`${dayInfo.key}-open1`}
                      className="text-sm text-gray-600"
                    >
                      Apertura
                    </Label>
                    <Input
                      id={`${dayInfo.key}-open1`}
                      type="time"
                      defaultValue="09:00"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor={`${dayInfo.key}-close1`}
                      className="text-sm text-gray-600"
                    >
                      Cierre
                    </Label>
                    <Input
                      id={`${dayInfo.key}-close1`}
                      type="time"
                      defaultValue="13:00"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Segundo turno (solo visible si horario partido está activado) */}
                <div
                  className={`grid grid-cols-2 gap-3 ${
                    splitHours[dayInfo.key] ? "" : "opacity-50"
                  }`}
                >
                  <div>
                    <Label
                      htmlFor={`${dayInfo.key}-open2`}
                      className="text-sm text-gray-600"
                    >
                      Reapertura
                    </Label>
                    <Input
                      id={`${dayInfo.key}-open2`}
                      type="time"
                      defaultValue="15:00"
                      className="mt-1"
                      disabled={!splitHours[dayInfo.key]}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor={`${dayInfo.key}-close2`}
                      className="text-sm text-gray-600"
                    >
                      Cierre final
                    </Label>
                    <Input
                      id={`${dayInfo.key}-close2`}
                      type="time"
                      defaultValue="19:00"
                      className="mt-1"
                      disabled={!splitHours[dayInfo.key]}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Clock className="h-5 w-5 text-sky-600 mt-0.5" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-sky-800">
                  Horario partido
                </h4>
                <p className="text-sm text-sky-700 mt-1">
                  Activa esta opción para negocios que cierran al mediodía y
                  vuelven a abrir por la tarde. Por ejemplo: 8:00-13:00 y
                  15:00-19:00.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button className="bg-green-500 hover:bg-green-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              Finalizar configuración
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

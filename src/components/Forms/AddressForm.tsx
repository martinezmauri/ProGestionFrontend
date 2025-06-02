import React from "react";
import { Input } from "../../ui/input";
import { IAddress } from "../../interfaces/IAddress";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Clock, MapPin, Phone } from "lucide-react";
import { Label } from "@ui/label";
import { Button } from "@ui/button";
import { Checkbox } from "@ui/checkbox";
interface Props {
  addressData: IAddress;
  setAddressData: React.Dispatch<React.SetStateAction<IAddress>>;
}

export const AddressForm = ({ addressData, setAddressData }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="border-0 shadow-md overflow-hidden p-0">
        <CardHeader className="bg-gradient-to-r from-sky-500 to-sky-400 text-white px-4 py-4">
          <CardTitle className="flex items-center w-full">
            <MapPin className="w-5 h-5 mr-2" />
            Ubicación del negocio
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ciudad" className="text-gray-700">
                    Ciudad
                  </Label>
                  <Input
                    id="ciudad"
                    placeholder="Ej: Buenos Aires"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="provincia" className="text-gray-700">
                    Provincia
                  </Label>
                  <Input
                    id="provincia"
                    placeholder="Ej: CABA"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="direccion" className="text-gray-700">
                  Dirección
                </Label>
                <Input
                  id="direccion"
                  placeholder="Ej: Av. Corrientes 1234"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="telefono" className="text-gray-700">
                  Teléfono
                </Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    id="telefono"
                    placeholder="Ej: +54 11 1234-5678"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300 flex items-center justify-center h-48">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">
                    Haga clic para seleccionar la ubicación en el mapa
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700"
              >
                Cancelar
              </Button>
              <Button className="bg-sky-500 hover:bg-sky-600">
                Guardar Ubicación
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md overflow-hidden p-0">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-4 py-4">
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
                      <Checkbox id={`${dayInfo.key}-split`} />
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
                  <div className="grid grid-cols-2 gap-3 opacity-50">
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
                        disabled
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
                        disabled
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
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700"
              >
                Cancelar
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600">
                Guardar Horarios
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

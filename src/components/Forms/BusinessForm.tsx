import React from "react";
import { Input } from "@ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { IRegisterBusiness } from "@interfaces/IRegisterBusiness";
import useHandleBusinessForm from "@hooks/useHandleBusinessForm";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Building2 } from "lucide-react";
import { Label } from "@ui/label";
import { Textarea } from "@ui/textarea";
import { Button } from "@ui/button";

interface Props {
  registerData: IRegisterBusiness;
  setRegisterData: React.Dispatch<React.SetStateAction<IRegisterBusiness>>;
}

export const BusinessForm = ({ registerData, setRegisterData }: Props) => {
  const { categories } = useHandleBusinessForm();

  return (
    <Card className="border-0 shadow-md overflow-hidden p-0">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-4 py-4">
        <CardTitle className="flex items-center w-full ">
          <Building2 className="w-5 h-5 mr-2" />
          Datos Principales
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="nombre" className="text-gray-700">
                Nombre del Negocio
              </Label>
              <Input
                className="mt-1 border rounded-md"
                id="nombre"
                placeholder="Ej: Peluquería Estilo"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="documento" className="text-gray-700">
                  Número identificativo de la empresa
                </Label>
                <Input
                  id="documento"
                  placeholder="Ej: 30-12345678-9"
                  className="mt-1 border rounded-md"
                />
              </div>

              <div>
                <Label htmlFor="categoria" className="text-gray-700">
                  Categoría
                </Label>
                <Select>
                  <SelectTrigger className="mt-1 border rounded-md w-full">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="peluqueria">Peluquería</SelectItem>
                    <SelectItem value="spa">Spa</SelectItem>
                    <SelectItem value="estetica">Centro de Estética</SelectItem>
                    <SelectItem value="dental">Consultorio Dental</SelectItem>
                    <SelectItem value="medico">Consultorio Médico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="descripcion" className="text-gray-700">
                Descripción
              </Label>
              <Textarea
                id="descripcion"
                placeholder="Describe brevemente tu negocio..."
                className="mt-1 resize-none"
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" className="border-gray-300 text-gray-700">
              Cancelar
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Guardar Cambios
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

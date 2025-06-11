import React, { useState } from "react";
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
import { ArrowDown, Building2 } from "lucide-react";
import { Label } from "@ui/label";
import { Textarea } from "@ui/textarea";
import { Button } from "@ui/button";
import { IBusiness } from "@interfaces/IBusiness";

interface Props {
  registerData: IBusiness;
  setRegisterData: (data: IBusiness) => void;
  onContinue: () => void; //
}

export const BusinessForm = ({
  registerData,
  setRegisterData,
  onContinue,
}: Props) => {
  const { categories } = useHandleBusinessForm();
  const [errors, setErrors] = useState({
    name: false,
    phone_number: false,
    categoryId: false,
  });

  const handleScroll = () => {
    const newErrors = {
      name: registerData.name.trim() === "",
      phone_number: registerData.phone_number.trim() === "",
      categoryId: registerData.categoryId.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.categoryId || newErrors.name || newErrors.phone_number)
      return;

    onContinue();
  };

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
                value={registerData.name}
                onChange={(e) => {
                  setErrors({ ...errors, name: false });
                  setRegisterData({ ...registerData, name: e.target.value });
                }}
                className={`mt-1 border rounded-md ${
                  errors.name ? "border-red-500" : "border-gray-200"
                }`}
                id="nombre"
                placeholder="Ej: Peluquería Estilo"
              />
              {errors.name && (
                <p className="text-sm text-red-500">
                  El nombre es obligatorio.
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-gray-700">
                  Número de contacto
                </Label>
                <Input
                  value={registerData.phone_number}
                  onChange={(e) => {
                    setErrors({ ...errors, phone_number: false });
                    setRegisterData({
                      ...registerData,
                      phone_number: e.target.value,
                    });
                  }}
                  id="phone"
                  placeholder="Ej: 2634253243"
                  className={`mt-1 border rounded-md ${
                    errors.phone_number ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.phone_number && (
                  <p className="text-sm text-red-500">
                    El numero de contacto es obligatorio.
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="categoria" className="text-gray-700">
                  Categoría
                </Label>
                <Select
                  onValueChange={(value) => {
                    setErrors({ ...errors, categoryId: false });
                    setRegisterData({
                      ...registerData,
                      categoryId: value,
                    });
                  }}
                >
                  <SelectTrigger
                    className={`mt-1 border rounded-md w-full ${
                      errors.categoryId ? "border-red-500" : "border-gray-200"
                    }`}
                  >
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c, index) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryId && (
                  <p className="text-sm text-red-500">
                    Debes seleccionar una categoria.
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="descripcion" className="text-gray-700">
                Descripción
              </Label>
              <Textarea
                value={registerData.description}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    description: e.target.value,
                  })
                }
                id="descripcion"
                placeholder="Describe brevemente tu negocio..."
                className="mt-1 resize-none"
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              onClick={handleScroll}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Continuar con ubicación
              <ArrowDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

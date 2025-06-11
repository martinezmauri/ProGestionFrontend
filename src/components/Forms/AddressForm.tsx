import React, { useState } from "react";
import { Input } from "../../ui/input";
import { IAddress } from "../../interfaces/IAddress";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { ArrowDown, MapPin } from "lucide-react";
import { Label } from "@ui/label";
import { Button } from "@ui/button";

interface Props {
  addressData: IAddress;
  setAddressData: (data: IAddress) => void;
  onContinue: () => void;
}

export const AddressForm = ({
  addressData,
  setAddressData,
  onContinue,
}: Props) => {
  const [errors, setErrors] = useState({
    street_number: false,
    province: false,
    country: false,
    street: false,
    city: false,
  });

  const handleScroll = () => {
    const newErrors = {
      street_number: addressData.street_number <= 0,
      province: addressData.province.trim() === "",
      country: addressData.country.trim() === "",
      street: addressData.street.trim() === "",
      city: addressData.city.trim() === "",
    };

    setErrors(newErrors);

    if (
      newErrors.city ||
      newErrors.country ||
      newErrors.province ||
      newErrors.street ||
      newErrors.street_number
    )
      return;

    onContinue();
  };

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
                    value={addressData.city}
                    onChange={(e) => {
                      setErrors({ ...errors, city: false });
                      setAddressData({ ...addressData, city: e.target.value });
                    }}
                    type="text"
                    id="ciudad"
                    placeholder="Ej: Buenos Aires"
                    className={`mt-1 ${
                      errors.city ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">
                      La ciudad es obligatoria.
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="provincia" className="text-gray-700">
                    Provincia
                  </Label>
                  <Input
                    type="text"
                    value={addressData.province}
                    onChange={(e) => {
                      setErrors({ ...errors, province: false });
                      setAddressData({
                        ...addressData,
                        province: e.target.value,
                      });
                    }}
                    id="provincia"
                    placeholder="Ej: CABA"
                    className={`mt-1 ${
                      errors.province ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.province && (
                    <p className="text-sm text-red-500">
                      La provincia es obligatoria.
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pais" className="text-gray-700">
                    Pais
                  </Label>
                  <Input
                    type="text"
                    value={addressData.country}
                    onChange={(e) => {
                      setErrors({ ...errors, country: false });
                      setAddressData({
                        ...addressData,
                        country: e.target.value,
                      });
                    }}
                    id="pais"
                    placeholder="Ej: Argentina"
                    className={`mt-1 ${
                      errors.country ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.country && (
                    <p className="text-sm text-red-500">
                      El pais es obligatorio.
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="calle" className="text-gray-700">
                    Calle
                  </Label>
                  <Input
                    type="text"
                    value={addressData.street}
                    onChange={(e) => {
                      setErrors({ ...errors, street: false });
                      setAddressData({
                        ...addressData,
                        street: e.target.value,
                      });
                    }}
                    id="calle"
                    placeholder="Ej: Av. San Martin"
                    className={`mt-1 ${
                      errors.street ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.street && (
                    <p className="text-sm text-red-500">
                      La calle es obligatoria.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="altura" className="text-gray-700">
                  Altura
                </Label>
                <Input
                  value={addressData.street_number}
                  onChange={(e) => {
                    setErrors({ ...errors, street_number: false });
                    setAddressData({
                      ...addressData,
                      street_number: Number(e.target.value),
                    });
                  }}
                  type="number"
                  id="altura"
                  placeholder="Ej: 210"
                  className={`mt-1 ${
                    errors.street_number ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.street_number && (
                  <p className="text-sm text-red-500">
                    La calle es obligatoria.
                  </p>
                )}
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
                type="button"
                onClick={handleScroll}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Continuar con horarios
                <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

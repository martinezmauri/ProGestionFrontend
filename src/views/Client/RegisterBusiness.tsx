import React, { useEffect, useState } from "react";
import { IRegisterBusiness } from "@interfaces/IRegisterBusiness";
import { useRegistrationBusiness } from "@hooks/useRegistrationBusiness";
import { WeekDays } from "@enum/WeekDays";
import { useNavigate } from "react-router-dom";
import { IWorkSchedule } from "@interfaces/IWorkSchedule";
import { AddressForm } from "@components/Forms/AddressForm";
import { DaysWithCheckbox } from "@components/Dropdowns/DaysWithCheckbox";
import { BusinessSchedule } from "@components/Schedules/BusinessSchedule";
import { BusinessForm } from "@components/Forms/BusinessForm";
import { Card } from "@ui/card";
import { IAddress } from "@interfaces/IAddress";
import { toast } from "sonner";
import { Dashboard } from "@components/Sidebar/Dashboard";
import { AppHeader } from "@components/Header/AppHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";

export const RegistersBusiness = () => {
  const navigate = useNavigate();
  const [workDays, setWorkDays] = useState<WeekDays[]>([]);
  const [businessSchedule, setbusinessSchedule] = useState<IWorkSchedule[]>([]);
  const [businessData, setBusinessData] = useState<IRegisterBusiness>({
    business: { name: "", description: "", phone_number: "", logo: "" },
    id_category: null,
  });
  const [addressData, setAddressData] = useState<IAddress>({
    street_number: null,
    province: "",
    country: "",
    street: "",
    city: "",
  });

  const { registerBusiness, loading, error } = useRegistrationBusiness();

  const handleScheduleChange = (newSchedule: IWorkSchedule[]) => {
    setbusinessSchedule(newSchedule);
  };

  const handleOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const success = await registerBusiness(
      businessSchedule,
      businessData,
      addressData
    );

    if (success) {
      toast.success("Negocio creado!", {
        description: `Se ha creado correctamente el negocio ${businessData.business.name}`,
      });
      navigate("/personal");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F4FBFF]">
      <div className="flex flex-1">
        <Dashboard />
        <div className="flex-1 p-6 space-y-3 overflow-x-auto max-w-full">
          <AppHeader title="Información de la Empresa" />
          <p className="text-muted-foreground">
            Gestiona los datos de tu negocio
          </p>

          <Tabs defaultValue="datos" className="space-y-6">
            <TabsList className="bg-white border max-w-md grid grid-cols-2">
              <TabsTrigger value="datos" className="text-sm">
                Datos Principales
              </TabsTrigger>
              <TabsTrigger value="ubicacion" className="text-sm">
                Ubicación del Negocio
              </TabsTrigger>
            </TabsList>

            <TabsContent value="datos" className="space-y-6">
              <BusinessForm
                registerData={businessData}
                setRegisterData={setBusinessData}
              />
            </TabsContent>
            <TabsContent value="ubicacion" className="space-y-6">
              <AddressForm
                addressData={addressData}
                setAddressData={setAddressData}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { IRegisterBusiness } from "@interfaces/IRegisterBusiness";
import { useRegistrationBusiness } from "@hooks/useRegistrationBusiness";
import { WeekDays } from "@enum/WeekDays";
import { useNavigate } from "react-router-dom";
import { IWorkSchedule } from "@interfaces/IWorkSchedule";
import { AddressForm } from "@components/Forms/AddressForm";
import { DaysWithCheckbox } from "@components/Dropdowns/DaysWithCheckbox";
import { BusinessForm } from "@components/Forms/BusinessForm";
import { Card } from "@ui/card";
import { IAddress } from "@interfaces/IAddress";
import { toast } from "sonner";
import { Dashboard } from "@components/Sidebar/Dashboard";
import { AppHeader } from "@components/Header/AppHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import StepIndicator from "@components/StepIndicator/StepIndicator";
import { IBusiness } from "@interfaces/IBusiness";
import { BusinessHoursForm } from "@components/Forms/BusinessHoursForm";
import { useAuth } from "@context/AuthContext";

export const RegistersBusiness = () => {
  const navigate = useNavigate();
  const [businessHours, setBusinessHours] = useState<IWorkSchedule[]>([]);
  const [businessData, setBusinessData] = useState<IBusiness>({
    name: "",
    description: "",
    phone_number: "",
    logo: "",
    userId: "",
    categoryId: "",
  });
  const [addressData, setAddressData] = useState<IAddress>({
    street_number: 0,
    province: "",
    country: "",
    street: "",
    city: "",
  });
  const { userId } = useAuth();
  const { registerBusiness, loading, error } = useRegistrationBusiness();

  useEffect(() => {
    if (userId) {
      setBusinessData((prev) => ({ ...prev, userId }));
    }
  }, [userId]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFinalSubmit = async () => {
    if (!userId) {
      toast.error("No se pudo registrar el negocio. Usuario no autenticado.");
      return;
    }
    const success = await registerBusiness({
      ...businessData,
      businessHours: businessHours.filter((d) => d.active),
      address: addressData,
    });

    if (success) {
      toast.success("Negocio creado!", {
        description: `Se ha creado correctamente el negocio ${businessData.name}`,
      });
      navigate("/personal");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F4FBFF]">
      <div className="flex flex-1">
        <Dashboard />
        <div className="flex-1 p-6 space-y-6 max-w-4xl mx-auto">
          <AppHeader title="Información de la Empresa" />
          <p className="text-muted-foreground">
            Gestiona los datos de tu negocio
          </p>

          {/* Paso visual */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <StepIndicator step={1} title="Datos principales" active />
              <StepIndicator step={2} title="Ubicación" />
              <StepIndicator step={3} title="Horarios" />
            </div>
          </div>

          {/* Paso 1 */}
          <div id="form-datos">
            <BusinessForm
              registerData={businessData}
              setRegisterData={setBusinessData}
              onContinue={() => scrollToSection("form-ubicacion")}
            />
          </div>

          {/* Paso 2 */}
          <div id="form-ubicacion">
            <AddressForm
              addressData={addressData}
              setAddressData={setAddressData}
              onContinue={() => scrollToSection("form-horarios")}
            />
          </div>

          {/* Paso 3 */}
          <div id="form-horarios">
            <BusinessHoursForm
              businessHours={businessHours}
              setBusinessHours={setBusinessHours}
              handleFinalSubmit={handleFinalSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

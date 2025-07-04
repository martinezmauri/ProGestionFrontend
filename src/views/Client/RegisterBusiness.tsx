import React, { useEffect, useState } from "react";
import { useRegistrationBusiness } from "@hooks/useRegistrationBusiness";
import { useNavigate } from "react-router-dom";
import { IWorkSchedule } from "@interfaces/IWorkSchedule";
import { AddressForm } from "@components/Forms/AddressForm";
import { BusinessForm } from "@components/Forms/BusinessForm";
import { IAddress } from "@interfaces/IAddress";
import { toast } from "sonner";
import { AppHeader } from "@components/Header/AppHeader";
import StepIndicator from "@components/StepIndicator/StepIndicator";
import { IBusiness } from "@interfaces/IBusiness";
import { BusinessHoursForm } from "@components/Forms/BusinessHoursForm";
import { useAuth } from "@context/AuthContext";
import AppSidebar from "@components/Sidebar/AppSidebar";

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
  const { userId, login } = useAuth();
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
    const response = await registerBusiness({
      ...businessData,
      businessHours: businessHours.filter((d) => d.active),
      address: addressData,
    });

    if (response?.data?.token && response?.data?.business) {
      toast.success("Negocio creado!", {
        description: `Se ha creado correctamente el negocio ${businessData.name}`,
      });

      login(userId, response.data.token);
      setTimeout(() => {
        navigate("/personal");
      }, 0);
    } else {
      toast.error("No se pudo registrar el negocio.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F4FBFF]">
      <div className="flex flex-1">
        <AppSidebar />
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

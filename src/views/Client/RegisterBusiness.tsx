import React, { useEffect, useState } from "react";
import { useRegistrationBusiness } from "@hooks/useRegistrationBusiness";
import { useNavigate } from "react-router-dom";
import { AddressForm } from "@components/Forms/AddressForm";
import { BusinessForm } from "@components/Forms/BusinessForm";
import { IAddress } from "@interfaces/IAddress";
import { toast } from "sonner";
import StepIndicator from "@components/StepIndicator/StepIndicator";
import { IBusiness } from "@interfaces/IBusiness";
import { useAuth } from "@context/AuthContext";
import { Building2, MapPin } from "lucide-react";

export const RegistersBusiness = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
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

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 2));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinalSubmit = async () => {
    if (!userId) {
      toast.error("No se pudo registrar el negocio. Usuario no autenticado.");
      return;
    }
    const response = await registerBusiness({
      ...businessData,
      address: addressData,
    });

    if (response?.data?.token && response?.data?.business) {
      toast.success("¡Negocio creado exitosamente!", {
        description: `Se ha configurado ${businessData.name}. Ahora puedes configurar los horarios desde el módulo de Turnos.`,
      });

      login(userId, response.data.token);
      setTimeout(() => {
        navigate("/onboarding/business-hours");
      }, 500);
    } else {
      toast.error("No se pudo registrar el negocio.");
    }
  };

  const steps = [
    { title: "Empresa", icon: Building2 },
    { title: "Ubicación", icon: MapPin },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full pt-4 animate-in fade-in duration-500">

      {/* Wizard Progress Indicator */}
      <div className="mb-10 relative">
        <div className="flex justify-between items-center relative z-10 w-full px-4 md:px-12">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
                    ${isActive ? 'bg-orange-500 text-white shadow-orange-500/30 ring-4 ring-orange-50' :
                      isCompleted ? 'bg-orange-100 text-orange-600' :
                        'bg-slate-100 text-slate-400'}`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`text-sm font-medium transition-colors ${isActive ? 'text-slate-800' : isCompleted ? 'text-slate-600' : 'text-slate-400'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-[2px] bg-slate-100 -z-0 px-16">
          <div
            className="h-full bg-orange-500 transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content Wrapper */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-1 md:p-6 transition-all duration-300">
        {currentStep === 1 && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <BusinessForm
              registerData={businessData}
              setRegisterData={setBusinessData}
              onContinue={handleNextStep}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <AddressForm
              addressData={addressData}
              setAddressData={setAddressData}
              onContinue={handleFinalSubmit}
            />
          </div>
        )}
      </div>

      {/* Back button wrapper */}
      {currentStep > 1 && (
        <div className="mt-6 flex justify-start">
          <button
            type="button"
            onClick={handlePrevStep}
            className="text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors px-4 py-2 hover:bg-slate-50 rounded-md"
          >
            ← Volver al paso anterior
          </button>
        </div>
      )}
    </div>
  );
};

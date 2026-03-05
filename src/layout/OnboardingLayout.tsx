import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppHeader } from "@components/Header/AppHeader";
import StepIndicator from "@components/StepIndicator/StepIndicator";
import { useAuth } from "@context/AuthContext";

export const OnboardingLayout = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // The step index will be calculated based on the current path, but for simplicity we render the Header and Outlet 
  // and let specific views (RegisterBusiness) use their own StepIndicator for now, 
  // or we can centralized it. Let's keep a simple wrapper.

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F4FBFF]">
      <div className="flex-1 p-6 space-y-6 max-w-5xl mx-auto w-full">
        <header className="mb-8 text-center pt-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300">
            OMTime
          </h1>
          <p className="text-muted-foreground mt-2">Configura tu negocio para empezar a operar</p>
        </header>

        <main className="w-full bg-white rounded-xl shadow-sm border p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

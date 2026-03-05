import { useState } from "react";
import { NavbarClient } from "@components/Navbars/NavbarClient";
import { FormLogin } from "@components/Modals/FormLogin";
import { FormRegister } from "@components/Modals/FormRegister";
import {
  ClientHero,
  ClientFeatures,
  ClientFreeTrial,
  ClientAdvantages,
  ClientReviews,
  ClientFAQ,
  ClientFooter,
} from "@components/Landing/ClientLandingSections";

export const ClientLanding = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const handleOpenLogin = () => {
    setIsOpenRegister(false);
    setIsOpenLogin(true);
  };
  const handleCloseLogin = () => setIsOpenLogin(false);

  const handleOpenRegister = () => {
    setIsOpenLogin(false);
    setIsOpenRegister(true);
  };
  const handleCloseRegister = () => setIsOpenRegister(false);

  return (
    <div className="w-full min-h-screen bg-white">
      <NavbarClient onOpenLogin={handleOpenLogin} />
      <ClientHero />
      <ClientFeatures />
      <ClientFreeTrial />
      <ClientAdvantages />
      <ClientReviews />
      <ClientFAQ />
      <ClientFooter />
      {isOpenLogin && (
        <FormLogin
          onClose={handleCloseLogin}
          onOpenRegister={handleOpenRegister}
        />
      )}
      {isOpenRegister && (
        <FormRegister
          onClose={handleCloseRegister}
          onOpenLogin={handleOpenLogin}
        />
      )}
    </div>
  );
};

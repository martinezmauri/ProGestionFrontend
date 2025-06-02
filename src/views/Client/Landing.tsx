import { useState } from "react";
import { NavbarClient } from "@components/Navbars/NavbarClient";
import { WhatsAppButton } from "@components/WhatsApp/WhatsAppButton";
import { FormLogin } from "@components/Modals/FormLogin";
import { FormRegister } from "@components/Modals/FormRegister";
import { HeroClient } from "@components/Hero/HeroClient";
import { AboutClient } from "@components/About/AboutClient";
import { FooterLanding } from "@components/Footer/FooterLanding";

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
    <div className="w-full h-full bg-[#F2FAFF]">
      <NavbarClient onOpenLogin={handleOpenLogin} />
      <HeroClient />
      <AboutClient />
      <FooterLanding />
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

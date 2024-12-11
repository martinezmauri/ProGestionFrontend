import { useState } from "react";
import { HeroClient } from "../../components/HeroClientLanding/HeroClient";
import { NavbarClientLanding } from "../../components/NavbarClientLanding/NavbarClient";
import { WhatsAppButton } from "../../components/WhatsAppComponent/WhatsAppButton";
import { FormLogin } from "../../components/ModalsClientLanding/ModalLogin/FormLogin";
import { FormRegister } from "../../components/ModalsClientLanding/ModalRegister/FormRegister";
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
    <div>
      <NavbarClientLanding onOpenLogin={handleOpenLogin} />
      <HeroClient />
      <WhatsAppButton />
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

import React from "react";
import { NavbarUser } from "../../components/NavbarUserLanding/NavbarUser";
import { HeroUser } from "../../components/HeroUserLanding/HeroUser";
import { WhatsAppButton } from "../../components/WhatsAppComponent/WhatsAppButton";

export const UserLanding = () => {
  return (
    <>
      <NavbarUser />
      <HeroUser />
      <WhatsAppButton />
    </>
  );
};

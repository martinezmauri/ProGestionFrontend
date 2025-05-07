import React from "react";
import { NavbarUser } from "@components/Navbars/NavbarUser";
import { HeroUser } from "@components/Hero/HeroUser";
import { WhatsAppButton } from "@components/WhatsApp/WhatsAppButton";

export const UserLanding = () => {
  return (
    <>
      <NavbarUser />
      <HeroUser />
      <WhatsAppButton />
    </>
  );
};

import React from "react";
import { NavbarUser } from "@components/Navbars/NavbarUser";
import { HeroUser } from "@components/Hero/HeroUser";
import { Featured } from "@components/About/Featured";
import { FooterLanding } from "@components/Footer/FooterLanding";

export const UserLanding = () => {
  return (
    <div className="bg-[#F2FAFF] w-full h-full">
      <NavbarUser />
      <HeroUser />
      <Featured />
      <FooterLanding />
    </div>
  );
};

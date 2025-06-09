import React, { useRef } from "react";
import { NavbarUser } from "@components/Navbars/NavbarUser";
import { HeroUser } from "@components/Hero/HeroUser";
import { Featured } from "@components/About/Featured";
import { FooterLanding } from "@components/Footer/FooterLanding";

export const UserLanding = () => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div className="bg-[#F2FAFF] w-full h-full">
      <NavbarUser />
      <HeroUser formRef={formRef} />
      <Featured
        scrollToForm={() => {
          if (formRef.current) {
            formRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });

            formRef.current.classList.add("animate-ring");
            setTimeout(() => {
              formRef.current?.classList.remove("animate-ring");
            }, 1500);
          }
        }}
      />
      <FooterLanding />
    </div>
  );
};

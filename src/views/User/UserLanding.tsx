import { useRef } from "react";
import { NavbarUser } from "@components/Navbars/NavbarUser";
import { HeroUser } from "@components/Hero/HeroUser";
import {
  FeaturedEstablishments,
  HowItWorks,
  CTABusiness,
  FAQ,
  LandingFooter,
} from "@components/Landing/LandingSections";

export const UserLanding = () => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div className="bg-[#F2FAFF] w-full h-full">
      <NavbarUser />
      <HeroUser formRef={formRef} />
      <FeaturedEstablishments />
      <HowItWorks />
      <CTABusiness />
      <FAQ />
      <LandingFooter />
    </div>
  );
};

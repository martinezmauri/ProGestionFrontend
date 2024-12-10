import { HeroClient } from "../../components/HeroClientLanding/HeroClient";
import { NavbarClientLanding } from "../../components/NavbarClientLanding/NavbarClient";
import { WhatsAppButton } from "../../components/WhatsAppComponent/WhatsAppButton";

export const ClientLanding = () => {
  return (
    <>
      <NavbarClientLanding />
      <HeroClient />
      <WhatsAppButton />
    </>
  );
};

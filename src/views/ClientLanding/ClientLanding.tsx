import { AboutClient } from "../../components/AboutClientLandig/AboutClient";
import { HeroClient } from "../../components/HeroClientLanding/HeroClient";
import { NavbarClientLanding } from "../../components/NavbarClientLanding/NavbarClient";
import { PlansClient } from "../../components/PlansClientLanding/PlansClient";
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

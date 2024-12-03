import { HeroClient } from "../../components/HeroClientLanding/HeroClient";
import { NavbarClientLanding } from "../../components/NavbarClientLanding/NavbarClient";
import { PlansClient } from "../../components/PlansClientLanding/PlansClient";

export const ClientLanding = () => {
  return (
    <div>
      <NavbarClientLanding />
      {/* <PlansClient /> */}
      <HeroClient />
    </div>
  );
};

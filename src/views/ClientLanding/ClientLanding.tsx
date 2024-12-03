import { HeroClient } from "../../components/HeroClientLanding/HeroClient";
import { FormRegister } from "../../components/ModalsClientLanding/ModalRegister/FormRegister";
import { NavbarClientLanding } from "../../components/NavbarClientLanding/NavbarClient";
import { PlansClient } from "../../components/PlansClientLanding/PlansClient";

export const ClientLanding = () => {
  return (
    <div>
      <NavbarClientLanding />
      {/* <PlansClient /> */}
      <HeroClient />
      <FormRegister />
    </div>
  );
};

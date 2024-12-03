import { HeroClient } from "../../components/HeroClientLanding/HeroClient";
import { HeroUser } from "../../components/HeroUserLanding/HeroUser";
import { FormLogin } from "../../components/ModalsClientLanding/ModalLogin/FormLogin";
import { FormRegister } from "../../components/ModalsClientLanding/ModalRegister/FormRegister";
import { NavbarClientLanding } from "../../components/NavbarClientLanding/NavbarClient";
import { NavbarUser } from "../../components/NavbarUserLanding/NavbarUser";
import { PlansClient } from "../../components/PlansClientLanding/PlansClient";

export const ClientLanding = () => {
  return (
    <div>
      <NavbarUser />
      <HeroUser />
    </div>
  );
};

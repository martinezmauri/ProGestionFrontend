import React from "react";
import { PlansClient } from "../../components/PlansClientLanding/PlansClient";
import { NavbarClientLanding } from "../../components/NavbarClientLanding/NavbarClient";

export const Plans = () => {
  return (
    <>
      <NavbarClientLanding />
      <PlansClient />
    </>
  );
};

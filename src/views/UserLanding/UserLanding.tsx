import React from "react";
import { NavbarUser } from "../../components/NavbarUserLanding/NavbarUser";
import { HeroUser } from "../../components/HeroUserLanding/HeroUser";
import { WhatsAppButton } from "../../components/WhatsAppComponent/WhatsAppButton";
import styles from "./UserLanding.module.css";

export const UserLanding = () => {
  return (
    <div className={styles.hero}>
      <NavbarUser />
      <HeroUser />
      <WhatsAppButton />
    </div>
  );
};

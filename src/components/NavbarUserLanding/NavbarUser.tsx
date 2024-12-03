import React from "react";
import styles from "./NavbarUser.module.css";

export const NavbarUser = () => {
  return (
    <nav className={styles.hero}>
      <h1>ProGestion</h1>
      <div className={styles.containerButtons}>
        <button className={styles.purpleButton}>Contratá ProGestion</button>
        <button className={styles.whiteButton}>Iniciar Sesion</button>
      </div>
    </nav>
  );
};

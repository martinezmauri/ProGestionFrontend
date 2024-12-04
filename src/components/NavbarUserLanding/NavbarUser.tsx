import React from "react";
import styles from "./NavbarUser.module.css";
import { Link } from "react-router-dom";

export const NavbarUser = () => {
  return (
    <nav className={styles.hero}>
      <Link to={"/"} className={styles.logo}>
        ProGestion
      </Link>
      <div className={styles.containerButtons}>
        <Link to={"/client"} className={styles.purpleButton}>
          Contratá ProGestion
        </Link>
        <button className={styles.whiteButton}>Iniciar Sesion</button>
      </div>
    </nav>
  );
};

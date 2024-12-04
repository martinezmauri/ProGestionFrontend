import React from "react";
import styles from "./WhatsAppButton.module.css";
import { Link } from "react-router-dom";

export const WhatsAppButton = () => {
  return (
    <div className={styles.contact}>
      <Link to={"/whatsapp"}>
        <img
          src="src/assets/logo-whatsapp.png"
          alt="Icono de WhatsApp para contactarnos"
        />
      </Link>
    </div>
  );
};

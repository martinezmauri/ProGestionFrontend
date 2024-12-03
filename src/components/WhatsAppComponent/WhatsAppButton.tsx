import React from "react";
import styles from "./WhatsAppButton.module.css";

export const WhatsAppButton = () => {
  return (
    <div className={styles.contact}>
      <a href="">
        <img
          src="src/assets/logo-whatsapp.png"
          alt="Icono de WhatsApp para contactarnos"
        />
      </a>
    </div>
  );
};

import React from "react";
import styles from "./WhatsAppButton.module.css";
import { Link } from "react-router-dom";

export const WhatsAppButton = () => {
  return (
    <div className={styles.contact}>
      <Link to={"/whatsapp"}>
        <img
          src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446457/cpzvxd3zgl5m2n1ipvtb.png"
          alt="Icono de WhatsApp para contactarnos"
        />
      </Link>
    </div>
  );
};

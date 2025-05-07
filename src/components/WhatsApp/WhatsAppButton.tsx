import React from "react";
import { Link } from "react-router-dom";

export const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-[20px] right-[20px] z-1000 cursor-pointer">
      <Link to={"/whatsapp"}>
        <img
          className="w-[4rem]"
          src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446457/cpzvxd3zgl5m2n1ipvtb.png"
          alt="Icono de WhatsApp para contactarnos"
        />
      </Link>
    </div>
  );
};

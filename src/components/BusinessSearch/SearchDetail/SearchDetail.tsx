import React, { useEffect, useState } from "react";
import styles from "./SearchDetail.module.css";
import { IAddress } from "../../../interfaces/IAddress";

/* La busqueda devuelve aunque los campos esten vacios */

interface PropsBusiness {
  logo: string;
  name: string;
  address: IAddress;
}
export const SearchDetail = ({ business }: { business: PropsBusiness[] }) => {
  return (
    <div>
      {business.length > 0 ? (
        business.map((item, index) => (
          <div className={styles.hero}>
            <div key={index} className={styles.card}>
              <img
                src={item.logo}
                alt="Imagen del negocio"
                className={styles.imgBusiness}
              />
              <div className={styles.containerInfo}>
                <h1 className={styles.title}>{item.name}</h1>
                <div className={styles.address}>
                  <img
                    src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445922/fux2jiezuqbgxf3dr3r8.png"
                    alt="logo de busqueda"
                    className={styles.logo}
                  />
                  <p>{item.address.street}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.errorMessage}>
          No se han encontrado establecimientos.
        </p>
      )}
    </div>
  );
};

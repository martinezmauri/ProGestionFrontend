import React, { useEffect, useState } from "react";
import styles from "./SearchDetail.module.css";
import data from "../../../helpers/business.json";

interface IAddress {
  id: number;
  street: string;
  streetNumber: string;
  city: string;
  province: string;
  country: string;
}

interface IBusiness {
  id: number;
  name: string;
  description: string;
  phoneNumber: string;
  logo: string;
  openingHours: string;
  workDays: string;
  address: IAddress;
}

export const SearchDetail = () => {
  const [business, setBusiness] = useState<IBusiness[]>([]);
  useEffect(() => {
    setBusiness(data); /* props */
  }, []);
  return (
    <div className={styles.hero}>
      {business.map((item, index) => (
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
                src="src/assets/location-logo.png"
                alt="logo de busqueda"
                className={styles.logo}
              />
              <p>{item.address.street}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

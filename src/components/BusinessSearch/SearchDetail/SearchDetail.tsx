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
    <div>
      {business.map((item, index) => (
        <div key={index} className={styles.card}>
          <img src={item.logo} alt="Imagen del negocio" />
          <div>
            <h1>{item.name}</h1>
            <div>
              <img src="src/assets/search-logo.png" alt="logo de busqueda" />
              <p>{item.address.street}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

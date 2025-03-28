import React from "react";
import styles from "./HomeClient.module.css";
import { Dashboard } from "../Dashboard/Dashboard";
import { Link } from "react-router-dom";

export const HomeClient = () => {
  return (
    <div className={styles.hero}>
      <Dashboard extend={true} />
      <main>
        <div className={styles.containerButtons}>
          <div className={styles.buttons}>
            <Link to={"/"}>
              <img src="src/assets/personal.png" alt="" />
              <p>PERSONAL</p>
            </Link>
          </div>
          <div className={styles.buttons}>
            <Link to={"/"}>
              <img src="src/assets/customer-service.png" alt="" />
              <p>SERVICIOS</p>
            </Link>
          </div>
          <div className={styles.buttons}>
            <Link to={"/"}>
              <img src="src/assets/calendar.png" alt="" />
              <p>TURNOS</p>
            </Link>
          </div>
          <div className={styles.buttons}>
            <Link to={"/"}>
              <img src="src/assets/tablero.png" alt="" />
              <p>EMPRESA</p>
            </Link>
          </div>
          <div className={styles.buttons}>
            <Link to={"/"}>
              <img src="src/assets/marca.png" alt="" />
              <p>CONFIGURACION</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

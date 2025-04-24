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
              <img
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446184/moepwmyrbvrrblfjvwpo.png"
                alt="Logo referido a la vista PERSONAL"
              />
              <p>PERSONAL</p>
            </Link>
          </div>
          <div className={styles.buttons}>
            <Link to={"/"}>
              <img
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446203/kqweob0pxuuhpbiifgtu.png"
                alt="Logo sobre SERVICIOS"
              />
              <p>SERVICIOS</p>
            </Link>
          </div>
          <div className={styles.buttons}>
            <Link to={"/"}>
              <img
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446222/u2erdekuep0dos7lqr2o.png"
                alt="Logo sobre TURNOS"
              />
              <p>TURNOS</p>
            </Link>
          </div>
          <div className={styles.buttons}>
            <Link to={"/"}>
              <img
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446236/rwpjzqtno1fjvmjfvlb8.png"
                alt="Logo sobre EMPRESA"
              />
              <p>EMPRESA</p>
            </Link>
          </div>
          <div className={styles.buttons}>
            <Link to={"/"}>
              <img
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446255/aghzamax91klrtunfudb.png"
                alt="Logo sobre CONFIGURACION"
              />
              <p>CONFIGURACION</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

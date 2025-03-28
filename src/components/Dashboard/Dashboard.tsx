import React, { useEffect } from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
interface propsDashboard {
  extend: boolean;
}

export const Dashboard = ({ extend }: propsDashboard) => {
  return (
    <aside
      className={`${styles.hero} ${
        extend ? styles.extended : styles.collapsed
      }`}
    >
      {extend ? (
        <h1 className={styles.title}>ProGestion</h1>
      ) : (
        <h1 className={styles.title}>PG</h1>
      )}
      <div className={styles.container}>
        <ul className={styles.buttonsNav}>
          <li className={styles.home}>
            <img src="src/assets/home-logo.png" alt="" />
            {extend && <Link to={"/"}>Inicio</Link>}
          </li>
          <li>
            <img src="src/assets/schedule-logo.png" alt="" />
            {extend && <Link to={"/"}>Mis Turnos</Link>}
          </li>
          <li>
            <img src="src/assets/calculator-logo.png" alt="" />
            {extend && <Link to={"/"}>Contabilidad</Link>}
          </li>
          <li>
            <img src="src/assets/graphics-logo.png" alt="" />
            {extend && <Link to={"/"}>Gráficos</Link>}
          </li>
          <li>
            <img src="src/assets/id-logo.png" alt="" />
            {extend && <Link to={"/"}>Mi Cuenta</Link>}
          </li>
          <li>
            <img src="src/assets/config-logo.png" alt="" />
            {extend && <Link to={"/"}>Configuración</Link>}
          </li>
        </ul>
        <div>
          <ul className={styles.buttonsNav}>
            <li>
              <img src="src/assets/chats-logo.png" alt="" />
              {extend && <Link to={"/"}>Soporte</Link>}
            </li>
            <li>
              <img src="src/assets/disconnect-logo.png" alt="" />
              {extend && <Link to={"/"}>Salir</Link>}
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

import React, { useEffect } from "react";
import styles from "./Dashboard.module.css";
import { Link, useNavigate } from "react-router-dom";
interface propsDashboard {
  extend: boolean;
}

export const Dashboard = ({ extend }: propsDashboard) => {
  const navigate = useNavigate();
  const handleNavigate = (to: string) => {
    if (extend) {
      return;
    }
    navigate(to);
  };
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
            <img
              src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745243813/xqrduclpqyjdyqq3orxo.png"
              alt="Logo de Home"
              onClick={() => handleNavigate("/")}
            />
            {extend && <Link to={"/"}>Inicio</Link>}
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745242873/monxdzlyfsxabbbanal0.png"
              alt="Logo de Mis Turnos"
              onClick={() => handleNavigate("/")}
            />
            {extend && <Link to={"/"}>Mis Turnos</Link>}
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745242883/rpoqybcyudj1jcpqzps2.png"
              alt="Logo de Contabilidad"
              onClick={() => handleNavigate("/")}
            />
            {extend && <Link to={"/"}>Contabilidad</Link>}
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745243581/rhzldtjreoglnukak5xe.png"
              alt="Logo de graficos"
              onClick={() => handleNavigate("/")}
            />
            {extend && <Link to={"/"}>Gráficos</Link>}
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745243741/mnbo09m2bzejkaprwqqy.png"
              alt="Logo de MI Cuenta"
              onClick={() => handleNavigate("/")}
            />
            {extend && <Link to={"/"}>Mi Cuenta</Link>}
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745243028/scawqeqwlgbsayty3dhm.png"
              alt="Logo de Configuracion"
              onClick={() => handleNavigate("/")}
            />
            {extend && <Link to={"/"}>Configuración</Link>}
          </li>
        </ul>
        <div>
          <ul className={styles.buttonsNav}>
            <li>
              <img
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745243030/wqfylmcxec6iewqqs0zt.png"
                alt="Logo de Soporte"
                onClick={() => handleNavigate("/")}
              />
              {extend && <Link to={"/"}>Soporte</Link>}
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745243035/w9isfchchnrtukowli7q.png"
                alt="Logo de Salir"
                onClick={() => handleNavigate("/")}
              />
              {extend && <Link to={"/"}>Salir</Link>}
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

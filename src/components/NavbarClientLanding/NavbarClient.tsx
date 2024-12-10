import { Link } from "react-router-dom";
import styles from "./NavbarClient.module.css";
import { useEffect, useRef, useState } from "react";
import { FormLogin } from "../ModalsClientLanding/ModalLogin/FormLogin";
import { FormRegister } from "../ModalsClientLanding/ModalRegister/FormRegister";

export const NavbarClientLanding = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const handleOpenLogin = () => setIsOpenLogin(true);
  const handleCloseLogin = () => setIsOpenLogin(false);

  const handleOpenRegister = () => {
    setIsOpenLogin(false);
    setIsOpenRegister(true);
  };
  const handleCloseRegister = () => setIsOpenRegister(false);

  return (
    <nav className={styles.hero}>
      <section className={styles.logo}>
        <Link to={"/client"}>
          <h1 className={styles.title}>ProGestion</h1>
        </Link>
      </section>
      <section className={styles.navbarButtons}>
        <Link to={"/client"}>Inicio</Link>
        <Link to={"/about"}>¿Qué Ofrecemos?</Link>
        <Link to={"/plans"}>Planes</Link>
      </section>
      <section className={styles.actionButtons}>
        <Link to={"/"} className={styles.actionWhite}>
          Sacar Turno
        </Link>
        <button className={styles.actionBlack} onClick={handleOpenLogin}>
          Iniciar Sesión
        </button>
      </section>
      {isOpenLogin && (
        <FormLogin
          onClose={handleCloseLogin}
          onOpenRegister={handleOpenRegister}
        />
      )}
      {isOpenRegister && <FormRegister onClose={handleCloseRegister} />}
    </nav>
  );
};

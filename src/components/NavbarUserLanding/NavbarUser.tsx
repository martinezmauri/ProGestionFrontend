import React, { useState } from "react";
import styles from "./NavbarUser.module.css";
import { Link } from "react-router-dom";
import { FormLogin } from "../ModalsClientLanding/ModalLogin/FormLogin";
import { FormRegister } from "../ModalsClientLanding/ModalRegister/FormRegister";

export const NavbarUser = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  console.log(isOpenLogin);
  console.log(isOpenRegister);

  const handleOpenLogin = () => {
    setIsOpenRegister(false);
    setIsOpenLogin(true);
  };
  const handleCloseLogin = () => setIsOpenLogin(false);

  const handleOpenRegister = () => {
    setIsOpenLogin(false);
    setIsOpenRegister(true);
  };
  const handleCloseRegister = () => setIsOpenRegister(false);

  return (
    <nav className={styles.hero}>
      <Link to={"/"} className={styles.logo}>
        ProGestion
      </Link>
      <div className={styles.containerButtons}>
        <Link to={"/client"} className={styles.purpleButton}>
          Contratá ProGestion
        </Link>
        <button className={styles.whiteButton} onClick={handleOpenLogin}>
          Iniciar Sesión
        </button>
      </div>
      {isOpenLogin && (
        <FormLogin
          onClose={handleCloseLogin}
          onOpenRegister={handleOpenRegister}
        />
      )}
      {isOpenRegister && (
        <FormRegister
          onClose={handleCloseRegister}
          onOpenLogin={handleOpenLogin}
        />
      )}
    </nav>
  );
};

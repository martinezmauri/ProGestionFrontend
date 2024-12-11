import React, { useEffect, useState } from "react";
import styles from "./FormRegister.module.css";

interface ModalProps {
  onClose: () => void;
  onOpenLogin: () => void;
}
export const FormRegister = ({ onClose, onOpenLogin }: ModalProps) => {
  const [registerData, setRegisterData] = useState({
    email: "",
    nameUser: "",
    password: "",
    confirmPassword: "",
  });
  const [labelVisibility, setLabelVisibility] = useState({
    email: true,
    nameUser: true,
    password: true,
    confirmPassword: true,
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleLabelClick = (field: string) => {
    setLabelVisibility((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  const handleBlur = (field: string) => {
    setLabelVisibility((prevState) => ({
      ...prevState,
      [field]: registerData[field as keyof typeof registerData] === "",
    }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <main className={styles.hero}>
      <section className={styles.headerRegister}>
        <h1>Registrarse</h1>
        <p>Si ya tienes una cuenta creada inicia sesión</p>
        <button onClick={onOpenLogin}>aqui !</button>
        <img
          src="src/assets/close-logo.png"
          alt=""
          className={styles.buttonCloseModal}
          onClick={onClose}
        />
      </section>
      <form action="">
        <section className={styles.formulary}>
          <h5>Email</h5>
          <div className={styles.inputContainer}>
            <label
              htmlFor=""
              className={styles.labelForm}
              style={{ display: labelVisibility.email ? "block" : "none" }}
            >
              <img
                src="src/assets/logo-email.png"
                alt=""
                className={styles.inputIcon}
              />
              Email
            </label>
            <input
              type="email"
              className={styles.inputForm}
              value={registerData.email}
              onChange={(event) => handleChange(event, "email")}
              onClick={() => handleLabelClick("email")}
              onBlur={() => handleBlur("email")}
            />
          </div>
        </section>
        <section className={styles.formulary}>
          <h5>Nombre de Usuario</h5>
          <div className={styles.inputContainer}>
            <label
              htmlFor=""
              className={styles.labelForm}
              style={{ display: labelVisibility.nameUser ? "block" : "none" }}
            >
              <img
                src="src/assets/user-logo.png"
                alt=""
                className={styles.inputIcon}
              />
              Nombre de usuario
            </label>
            <input
              type="text"
              className={styles.inputForm}
              value={registerData.nameUser}
              onChange={(event) => handleChange(event, "nameUser")}
              onClick={() => handleLabelClick("nameUser")}
              onBlur={() => handleBlur("nameUser")}
            />
          </div>
        </section>
        <section className={styles.formulary}>
          <h5>Contraseña</h5>
          <div className={styles.inputContainer}>
            <label
              htmlFor=""
              className={styles.labelForm}
              style={{ display: labelVisibility.password ? "block" : "none" }}
            >
              <img
                src="src/assets/padlock-logo.png"
                alt=""
                className={styles.inputIcon}
              />{" "}
              Contraseña
            </label>
            <input
              type={passwordVisibility.password ? "text" : "password"}
              className={styles.inputForm}
              value={registerData.password}
              onChange={(event) => handleChange(event, "password")}
              onClick={() => handleLabelClick("password")}
              onBlur={() => handleBlur("password")}
            />
            <img
              src={
                passwordVisibility.password
                  ? "src/assets/eye-open-logo.png"
                  : "src/assets/eye-logo.png"
              }
              alt=""
              className={styles.padlockEye}
              onClick={() => togglePasswordVisibility("password")}
            />
          </div>
        </section>
        <section className={styles.formulary}>
          <h5>Confirmar Contraseña</h5>
          <div className={styles.inputContainer}>
            <label
              htmlFor=""
              className={styles.labelForm}
              style={{
                display: labelVisibility.confirmPassword ? "block" : "none",
              }}
            >
              <img
                src="src/assets/padlock-logo.png"
                alt=""
                className={styles.inputIcon}
              />
              Confirmar contraseña
            </label>
            <input
              type={passwordVisibility.confirmPassword ? "text" : "password"}
              className={styles.inputForm}
              value={registerData.confirmPassword}
              onChange={(event) => handleChange(event, "confirmPassword")}
              onClick={() => handleLabelClick("confirmPassword")}
              onBlur={() => handleBlur("confirmPassword")}
            />
            <img
              src={
                passwordVisibility.confirmPassword
                  ? "src/assets/eye-open-logo.png"
                  : "src/assets/eye-logo.png"
              }
              alt=""
              className={styles.padlockEye}
              onClick={() => togglePasswordVisibility("confirmPassword")}
            />
          </div>
        </section>
        <button className={styles.buttonRegister}>Registrarse</button>
      </form>
    </main>
  );
};

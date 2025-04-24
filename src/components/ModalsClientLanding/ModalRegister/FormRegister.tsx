import React, { useEffect, useState } from "react";
import styles from "./FormRegister.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  onClose: () => void;
  onOpenLogin: () => void;
}
export const FormRegister = ({ onClose, onOpenLogin }: ModalProps) => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    email: "",
    nameUser: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [labelVisibility, setLabelVisibility] = useState({
    email: true,
    nameUser: true,
    phone: true,
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

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v0/user/save",
        {
          name: registerData.nameUser,
          password: registerData.password,
          phoneNumber: registerData.phone,
          email: registerData.email,
          role: "CLIENT",
        }
      );

      if (response.status === 201) {
        navigate("/registerBusiness");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.hero}>
      <div className={styles.backgroundBlur} onClick={onClose}></div>
      <div className={styles.modal}>
        <section className={styles.headerRegister}>
          <h1>Registrarse</h1>
          <p>Si ya tienes una cuenta creada inicia sesión</p>
          <button onClick={onOpenLogin}>Aqui !</button>
          <img
            src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445796/qyqq8qqknyeh5oi7qmk2.png"
            alt=""
            className={styles.buttonCloseModal}
            onClick={onClose}
          />
        </section>
        <form onSubmit={handleOnSubmit} className={styles.heroFormulary}>
          <section className={styles.formulary}>
            <h5>Email</h5>
            <div className={styles.inputContainer}>
              <label
                htmlFor=""
                className={styles.labelForm}
                style={{ display: labelVisibility.email ? "flex" : "none" }}
              >
                <img
                  src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445776/inpsavtrwce47hoss1nh.png"
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
                onFocus={() => handleLabelClick("email")}
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
                style={{ display: labelVisibility.nameUser ? "flex" : "none" }}
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
                onFocus={() => handleLabelClick("nameUser")}
                onBlur={() => handleBlur("nameUser")}
              />
            </div>
          </section>
          <section className={styles.formulary}>
            <h5>Numero de telefono</h5>
            <div className={styles.inputContainer}>
              <label
                htmlFor=""
                className={styles.labelForm}
                style={{ display: labelVisibility.phone ? "flex" : "none" }}
              >
                <img
                  src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446372/su8u5pysrplg6vz46aix.png"
                  alt=""
                  className={styles.inputIcon}
                />{" "}
                Numero de telefono
              </label>
              <input
                type="number"
                className={styles.inputForm}
                value={registerData.phone}
                onChange={(event) => handleChange(event, "phone")}
                onFocus={() => handleLabelClick("phone")}
                onBlur={() => handleBlur("phone")}
              />
            </div>
          </section>
          <section className={styles.formulary}>
            <h5>Contraseña</h5>
            <div className={styles.inputContainer}>
              <label
                htmlFor=""
                className={styles.labelForm}
                style={{ display: labelVisibility.password ? "flex" : "none" }}
              >
                <img
                  src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445747/le1ny4mfqgttp9y5zkxf.png"
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
                onFocus={() => handleLabelClick("password")}
                onBlur={() => handleBlur("password")}
              />
              <img
                src={
                  passwordVisibility.password
                    ? "https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445720/qeindsrsuign5kte2kf4.png"
                    : "https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445702/gkjcwknwwud06w8fbtf0.png"
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
                  display: labelVisibility.confirmPassword ? "flex" : "none",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445747/le1ny4mfqgttp9y5zkxf.png"
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
                onFocus={() => handleLabelClick("confirmPassword")}
                onBlur={() => handleBlur("confirmPassword")}
              />
              <img
                src={
                  passwordVisibility.confirmPassword
                    ? "https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445720/qeindsrsuign5kte2kf4.png"
                    : "https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445702/gkjcwknwwud06w8fbtf0.png"
                }
                alt=""
                className={styles.padlockEye}
                onClick={() => togglePasswordVisibility("confirmPassword")}
              />
            </div>
          </section>
          <button className={styles.buttonRegister}>Registrarse</button>
        </form>
      </div>
    </main>
  );
};

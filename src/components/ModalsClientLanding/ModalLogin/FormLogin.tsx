import { useEffect, useState } from "react";
import styles from "./FormLogin.module.css";

interface ModalProps {
  onClose: () => void;
  onOpenRegister: () => void;
}
export const FormLogin = ({ onClose, onOpenRegister }: ModalProps) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [labelVisibility, setLabelVisibility] = useState({
    email: true,
    password: true,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLabelClick = (field: string) => {
    setLabelVisibility((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  const handleBlur = (field: string) => {
    setLabelVisibility((prevState) => ({
      ...prevState,
      [field]: loginData[field as keyof typeof loginData] === "",
    }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setLoginData((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <main className={styles.hero}>
      <div className={styles.backgroundBlur} onClick={onClose}></div>
      <div className={styles.modal}>
        <section className={styles.headerLogin}>
          <h1>Inicia Sesión</h1>
          <p>Si no tienes una cuenta creada puedes </p>
          <button onClick={onOpenRegister}>Registrarte aqui!</button>
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
                htmlFor="email"
                className={styles.labelForm}
                style={{ display: labelVisibility.email ? "flex" : "none" }}
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
                value={loginData.email}
                onChange={(event) => handleChange(event, "email")}
                name=""
                id=""
                className={styles.inputForm}
                onFocus={() => handleLabelClick("email")}
                onBlur={() => handleBlur("email")}
              />
            </div>
          </section>
          <section className={styles.formulary}>
            <h5>Contraseña</h5>
            <div className={styles.inputContainer}>
              <label
                htmlFor="password"
                className={styles.labelForm}
                style={{ display: labelVisibility.password ? "flex" : "none" }}
              >
                <img
                  src="src/assets/padlock-logo.png"
                  alt=""
                  className={styles.inputIcon}
                />{" "}
                Contraseña
              </label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                className={styles.inputForm}
                onChange={(event) => handleChange(event, "password")}
                value={loginData.password}
                onFocus={() => handleLabelClick("password")}
                onBlur={() => handleBlur("password")}
              />
              <img
                src={
                  isPasswordVisible
                    ? "src/assets/eye-open-logo.png"
                    : "src/assets/eye-logo.png"
                }
                alt=""
                className={styles.padlockEye}
                onClick={togglePasswordVisibility}
              />
            </div>
          </section>
          <section className={styles.secondaryActions}>
            <div>
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me"> Mantener sesión iniciada</label>
            </div>

            <div>
              <a href="">¿Olvidaste tu contraseña?</a>
            </div>
          </section>
          <button className={styles.buttonLogin}>Iniciar Sesión</button>
        </form>
        <section className={styles.buttonsLogin}>
          <h1>O puedes iniciar con:</h1>
          <div>
            <a href="">
              <img
                className={styles.imgLogo}
                src="src/assets/facebook-logo.png"
                alt=""
              />
            </a>
            <a href="">
              <img
                className={styles.imgLogo}
                src="src/assets/apple-logo.png"
                alt=""
              />
            </a>
            <a href="">
              <img
                className={styles.imgLogo}
                src="src/assets/google-logo.png"
                alt=""
              />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

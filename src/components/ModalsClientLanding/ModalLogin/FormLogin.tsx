import { useEffect, useState } from "react";
import styles from "./FormLogin.module.css";
import { useAuth0 } from "@auth0/auth0-react";

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
  const { loginWithRedirect } = useAuth0();

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

  const handleRedirectLogin = (redirect: string) => {
    loginWithRedirect({
      authorizationParams: { connection: redirect },
    });
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
            src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445796/qyqq8qqknyeh5oi7qmk2.png"
            alt="Cruz para cerrar el modal"
            className={styles.buttonCloseModal}
            onClick={onClose}
          />
        </section>
        <form>
          <section className={styles.formulary}>
            <h5>Email</h5>
            <div className={styles.inputContainer}>
              <label
                htmlFor="email"
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
                  src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445747/le1ny4mfqgttp9y5zkxf.png"
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
                    ? "https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445720/qeindsrsuign5kte2kf4.png"
                    : "https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445702/gkjcwknwwud06w8fbtf0.png"
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
              <a>¿Olvidaste tu contraseña?</a>
            </div>
          </section>
          <button className={styles.buttonLogin}>Iniciar Sesión</button>
        </form>
        <section className={styles.buttonsLogin}>
          <h1>O puedes iniciar con:</h1>
          <div>
            <button onClick={() => handleRedirectLogin("facebook")}>
              <img
                className={styles.imgLogo}
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445649/qrubt0avnlt3w3gz48kn.png"
                alt="Logo de facebook"
              />
            </button>
            <button onClick={() => handleRedirectLogin("apple")}>
              <img
                className={styles.imgLogo}
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445629/oanftqh36xcvujdeoodr.png"
                alt="Logo de apple"
              />
            </button>
            <button onClick={() => handleRedirectLogin("google-oauth2")}>
              <img
                className={styles.imgLogo}
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445666/r8xibykn0lqfspnslacj.png"
                alt="Logo de google"
              />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

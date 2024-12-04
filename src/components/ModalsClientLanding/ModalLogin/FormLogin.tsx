import { useState } from "react";
import styles from "./FormLogin.module.css";

export const FormLogin = () => {
  const [labelVisibility, setLabelVisibility] = useState({
    email: true,
    password: true,
  });

  const handleLabelClick = (field: string) => {
    setLabelVisibility((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  return (
    <main className={styles.hero}>
      <section className={styles.headerLogin}>
        <h1>Iniciar Sesión</h1>
        <p>Si no tienes una cuenta creada puedes </p>
        <a href="">Registrarte aqui !</a>
      </section>
      <form action="">
        <section className={styles.formulary}>
          <h5>Email</h5>
          <div className={styles.inputContainer}>
            <label
              htmlFor="email"
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
              name=""
              id=""
              className={styles.inputForm}
              onClick={() => handleLabelClick("email")}
            />
          </div>
        </section>
        <section className={styles.formulary}>
          <h5>Contraseña</h5>
          <div className={styles.inputContainer}>
            <label
              htmlFor="password"
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
              type="password"
              className={styles.inputForm}
              onClick={() => handleLabelClick("password")}
            />
            <img
              src="src/assets/eye-logo.png"
              alt=""
              className={styles.inputIcon}
            />
          </div>
        </section>
        <section className={styles.secondaryActions}>
          <input type="checkbox" />
          <label htmlFor=""> Mantener sesión iniciada</label>
          <a href="">¿Olvidaste tu contraseña?</a>
        </section>
        <button className={styles.buttonLogin}>Login</button>
      </form>
      <section className={styles.buttonsLogin}>
        <h1>O puedes iniciar con:</h1>
        <div>
          <a href="">
            <img src="src/assets/facebook-logo.png" alt="" />
          </a>
          <a href="">
            <img src="src/assets/apple-logo.png" alt="" />
          </a>
          <a href="">
            <img src="src/assets/google-logo.png" alt="" />
          </a>
        </div>
      </section>
    </main>
  );
};

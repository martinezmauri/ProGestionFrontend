import React from "react";
import styles from "./FormRegister.module.css";

export const FormRegister = () => {
  return (
    <main className={styles.hero}>
      <section className={styles.headerRegister}>
        <h1>Registrarse</h1>
        <p>Si ya tienes una cuenta creada inicia sesión</p>
        <a href="">aqui !</a>
      </section>
      <form action="">
        <section className={styles.formulary}>
          <h5>Email</h5>
          <div className={styles.inputContainer}>
            <label htmlFor="" className={styles.labelForm}>
              <img
                src="src/assets/logo-email.png"
                alt=""
                className={styles.inputIcon}
              />
              Email
            </label>
            <input type="email" className={styles.inputForm} />
          </div>
        </section>
        <section className={styles.formulary}>
          <h5>Nombre de Usuario</h5>
          <div className={styles.inputContainer}>
            <label htmlFor="" className={styles.labelForm}>
              <img
                src="src/assets/user-logo.png"
                alt=""
                className={styles.inputIcon}
              />
              Nombre de usuario
            </label>
            <input type="text" className={styles.inputForm} />
          </div>
        </section>
        <section className={styles.formulary}>
          <h5>Contraseña</h5>
          <div className={styles.inputContainer}>
            <label htmlFor="" className={styles.labelForm}>
              <img
                src="src/assets/padlock-logo.png"
                alt=""
                className={styles.inputIcon}
              />{" "}
              Contraseña
            </label>
            <input type="password" className={styles.inputForm} />
            <img
              src="src/assets/eye-logo.png"
              alt=""
              className={styles.padlockEye}
            />
          </div>
        </section>
        <section className={styles.formulary}>
          <h5>Confirmar Contraseña</h5>
          <div className={styles.inputContainer}>
            <label htmlFor="" className={styles.labelForm}>
              <img
                src="src/assets/padlock-logo.png"
                alt=""
                className={styles.inputIcon}
              />
              Confirmar contraseña
            </label>
            <input type="password" className={styles.inputForm} />
            <img
              src="src/assets/eye-logo.png"
              alt=""
              className={styles.padlockEye}
            />
          </div>
        </section>
        <button className={styles.buttonRegister}>Registrarse</button>
      </form>
    </main>
  );
};

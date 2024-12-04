import React from "react";
import styles from "./HeroUser.module.css";
import { WhatsAppButton } from "../WhatsAppComponent/WhatsAppButton";

export const HeroUser = () => {
  return (
    <main className={styles.hero}>
      <section className={styles.description}>
        <h1>Sacá tu turno de manera facil y rapida</h1>
        <p>
          Seleccioná tu ubicación y elige el establecimiento que mas te
          convenga!
        </p>
      </section>
      <form className={styles.formulary}>
        <div className={styles.formHeader}>
          <section>
            <label htmlFor="establishment" className={styles.labelForm}>
              <img
                src="src/assets/search-logo.png"
                alt=""
                className={styles.inputIcon}
              />
              Nombre del establecimiento
            </label>
            <input
              type="text"
              id="establishment"
              className={styles.inputForm}
            />
          </section>
          <section>
            <label htmlFor="location" className={styles.labelForm}>
              <img
                src="src/assets/location-logo.png"
                alt=""
                className={styles.inputIcon}
              />
              Selecciona tu localidad
            </label>
            <input type="text" id="location" className={styles.inputForm} />
          </section>
        </div>
        <section className={styles.categoryContainer}>
          <label htmlFor="category" className={styles.labelCategory}>
            <img
              src="src/assets/box-logo.png"
              alt=""
              className={styles.inputIcon}
            />
            Selecciona la categoria
          </label>
          <input type="text" id="category" className={styles.categoryForm} />
        </section>
        <div className={styles.containerButton}>
          <button className={styles.buttonSearch}>Buscar</button>
        </div>
      </form>
      <WhatsAppButton />
    </main>
  );
};

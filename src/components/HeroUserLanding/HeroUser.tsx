import React from "react";
import styles from "./HeroUser.module.css";

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
      <form action="" className={styles.formulary}>
        <div className={styles.formHeader}>
          <section>
            <label htmlFor="" className={styles.labelForm}>
              <img src="" alt="" />
              Nombre del establecimiento
            </label>
            <input type="text" className={styles.inputForm} />
          </section>
          <section>
            <label htmlFor="" className={styles.labelForm}>
              <img src="" alt="" />
              Selecciona tu localidad
            </label>
            <input type="text" className={styles.inputForm} />
          </section>
        </div>
        <section className={styles.categoryContainer}>
          <label htmlFor="" className={styles.labelCategory}>
            <img src="" alt="" />
            Selecciona la categoria
          </label>
          <input type="text" className={styles.categoryForm} />
        </section>
        <div className={styles.containerButton}>
          <button className={styles.buttonSearch}>Buscar</button>
        </div>
      </form>
    </main>
  );
};

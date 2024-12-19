import { Link } from "react-router-dom";
import styles from "./HeroClient.module.css";

export const HeroClient = () => {
  return (
    <main>
      <section className={styles.heroPage}>
        <section className={styles.heroDescription}>
          <h1 className={styles.title}>ORGANIZA TU NEGOCIO</h1>
          <p className={styles.subtitle}>
            Optimiza de la mejor manera los turnos de tu negocio.
          </p>
          <p className={styles.description}>
            Desde cualquier dispositivo en cualquier momento a toda hora dales a
            tus clientes la mejor experiencia del mercado con ProGestion.
          </p>
          <nav className={styles.buttonContainer}>
            <Link to={"/plans"} className={styles.buttonWhite}>
              Ver planes
            </Link>
            <Link to={"/about"} className={styles.buttonContanct}>
              Contáctanos
            </Link>
          </nav>
        </section>
        <section className={styles.imageMain}>
          <img
            src="src/assets/tablet-logo.png"
            alt="Vista de un iPad y un teléfono mostrando ProGestion"
          />
        </section>
      </section>
    </main>
  );
};

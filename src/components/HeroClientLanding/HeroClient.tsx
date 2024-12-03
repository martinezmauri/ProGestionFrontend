import { WhatsAppButton } from "../WhatsAppComponent/WhatsAppButton";
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
            <a href="" className={styles.buttonWhite}>
              Ver Planes
            </a>
            <a href="" className={styles.buttonContanct}>
              Contáctanos
            </a>
          </nav>
        </section>
        <section className={styles.imageMain}>
          <img
            src="src/assets/ipad-phone.jpg"
            alt="Vista de un iPad y un teléfono mostrando ProGestion"
          />
        </section>
      </section>
      <WhatsAppButton />
    </main>
  );
};

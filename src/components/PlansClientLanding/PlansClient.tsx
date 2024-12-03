import { WhatsAppButton } from "../WhatsAppComponent/WhatsAppButton";
import styles from "./PlansClient.module.css";

export const PlansClient = () => {
  return (
    <main>
      <div className={styles.hero}>
        <section className={styles.card}>
          <h1>Estándar</h1>
        </section>
        <section className={styles.card}>
          <h1>Premium</h1>
        </section>
        <section className={styles.card}>
          <h1>Pro</h1>
        </section>
      </div>
      <WhatsAppButton />
    </main>
  );
};

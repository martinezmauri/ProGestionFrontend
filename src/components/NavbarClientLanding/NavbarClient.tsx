import { Link } from "react-router-dom";
import styles from "./NavbarClient.module.css";
interface props {
  onOpenLogin: () => void;
}
export const NavbarClient = ({ onOpenLogin }: props) => {
  return (
    <nav className={styles.hero}>
      <section className={styles.logo}>
        <Link to={"/client"}>
          <h1 className={styles.title}>ProGestion</h1>
        </Link>
      </section>
      <section className={styles.navbarButtons}>
        <Link to={"/client"}>Inicio</Link>
        <Link to={"/about"}>¿Qué Ofrecemos?</Link>
        <Link to={"/plans"}>Planes</Link>
      </section>
      <section className={styles.actionButtons}>
        <Link to={"/"} className={styles.actionWhite}>
          Sacar Turno
        </Link>
        <button className={styles.actionBlack} onClick={onOpenLogin}>
          Iniciar Sesión
        </button>
      </section>
    </nav>
  );
};

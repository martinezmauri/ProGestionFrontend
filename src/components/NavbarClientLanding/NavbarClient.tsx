import { Link } from "react-router-dom";
import "./NavbarClient.css";

export const NavbarClientLanding = () => {
  return (
    <nav className="hero">
      <section className="logo">
        <Link to={"/client"}>
          <h1 className="title">ProGestion</h1>
        </Link>
      </section>
      <section className="navbar-buttons">
        <Link to={"/client"}>Inicio</Link>
        <Link to={"/about"}>¿Qué Ofrecemos?</Link>
        <Link to={"/plans"}>Planes</Link>
      </section>
      <section className="action-buttons">
        <Link to={"/"} className="action-white">
          Sacar Turno
        </Link>
        <a href="" className="action-black">
          Iniciar Sesión
        </a>
      </section>
    </nav>
  );
};

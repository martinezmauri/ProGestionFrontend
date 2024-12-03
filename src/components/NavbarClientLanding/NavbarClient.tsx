import "./NavbarClient.css";

export const NavbarClientLanding = () => {
  return (
    <nav className="hero">
      <section className="logo">
        <a href="">
          <h1 className="title">ProGestion</h1>
        </a>
      </section>
      <section className="navbar-buttons">
        <a href="">Inicio</a>
        <a href="">¿Qué Ofrecemos?</a>
        <a href="">Planes</a>
      </section>
      <section className="action-buttons">
        <a href="" className="action-white">
          Sacar Turno
        </a>
        <a href="" className="action-black">
          Iniciar Sesión
        </a>
      </section>
    </nav>
  );
};

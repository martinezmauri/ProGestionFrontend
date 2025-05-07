import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

interface props {
  onOpenLogin: () => void;
}

export const NavbarClient = ({ onOpenLogin }: props) => {
  const { user, isAuthenticated, logout } = useAuth0();
  return (
    <nav className="flex justify-center items-center w-[100%] mt-6">
      <section className="absolute left-[40px]">
        <Link to={"/client"}>
          <h1 className="text-[#f96e2a] text-[3em] font-bold">ProGestion</h1>
        </Link>
      </section>
      <section className="flex gap-[1.5rem]">
        <Link
          className="text-[#295366] font-semibold text-[1em]"
          to={"/client"}
        >
          Inicio
        </Link>
        <Link className="text-[#295366] font-semibold text-[1em]" to={"/about"}>
          ¿Qué Ofrecemos?
        </Link>
        <Link className="text-[#295366] font-semibold text-[1em]" to={"/plans"}>
          Planes
        </Link>
      </section>
      <section className="flex absolute right-[40px] gap-[1.5rem]">
        <Link
          className="bg-[#295366] p-[1.3vh] rounded-3xl font-semibold text-[#fbf8ef]"
          to={"/"}
        >
          Sacar Turno
        </Link>
        {isAuthenticated ? (
          <div>
            <img
              src={user?.picture}
              alt={user?.name}
              className="w-[50px] h-[50px] rounded-3xl object-cover mr-[1rem]"
            />

            <label style={{ color: "black" }} onClick={() => logout()}>
              Salir
            </label>
          </div>
        ) : (
          <button
            className="bg-[#c9e6f0] p-[1.3vh] rounded-3xl font-semibold text-black cursor-pointer"
            onClick={onOpenLogin}
          >
            Iniciar Sesión
          </button>
        )}
      </section>
    </nav>
  );
};

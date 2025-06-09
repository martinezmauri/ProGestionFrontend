import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@ui/button";

interface props {
  onOpenLogin: () => void;
}

export const NavbarClient = ({ onOpenLogin }: props) => {
  const { user, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();
  return (
    <header className="container mx-auto px-4 py-4 flex items-center justify-between">
      {/* Título izquierda */}
      <div className="flex items-center">
        <Link to={"/client"} className="text-[#f96e2a] text-[2.3em] font-bold">
          ProGestion
        </Link>
      </div>

      {/* Centro: navegación */}
      <nav className="hidden md:flex justify-center flex-1 space-x-6">
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
          Precios
        </Link>
      </nav>

      {/* Derecha: botones */}
      <div className="flex items-center gap-5">
        <Link
          className="bg-white border border-[#0284C7] text-[#0284C7] font-medium px-6 py-2 rounded-md hover:bg-[#E0F2FE] transition-colors"
          to={"/"}
        >
          Sacar Turno
        </Link>
        <button
          className="bg-[#0284C7] hover:bg-[#0369A1] text-white font-medium px-6 py-2 rounded-md transition-colors"
          onClick={onOpenLogin}
        >
          Iniciar Sesión
        </button>
      </div>
    </header>
  );
};

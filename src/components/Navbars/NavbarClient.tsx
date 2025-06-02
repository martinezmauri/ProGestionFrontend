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
      <div className="flex-1">
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
      <div className="flex-1 flex justify-end items-center gap-4">
        <Button
          variant="outline"
          className="border-sky-600 text-sky-600 hover:bg-sky-50"
          onClick={onOpenLogin}
        >
          Iniciar Sesión
        </Button>
        <Button
          className="bg-sky-600 hover:bg-sky-700"
          onClick={() => navigate("/")}
        >
          Sacar Turno
        </Button>
      </div>
    </header>
  );
};

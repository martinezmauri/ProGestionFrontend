import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface props {
  onOpenLogin: () => void;
}

export const NavbarClient = ({ onOpenLogin }: props) => {
  const { user, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-4 bg-white sticky top-0 z-50 border-b border-gray-100">
      {/* Título izquierda */}
      <Link to="/para-negocios" className="flex items-center gap-1">
        <span className="text-orange-500 text-2xl font-extrabold tracking-tight">OM</span>
        <span className="text-slate-800 text-2xl font-extrabold tracking-tight">Time</span>
      </Link>

      {/* Centro: navegación (Centrado perfecto absoluto) */}
      <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 space-x-8">
        <Link className="text-slate-600 text-[15px] font-medium hover:text-orange-500 transition-colors" to="/">
          Inicio
        </Link>
        <Link className="text-slate-600 text-[15px] font-medium hover:text-orange-500 transition-colors" to="/about">
          ¿Qué Ofrecemos?
        </Link>
        <Link className="text-slate-600 text-[15px] font-medium hover:text-orange-500 transition-colors" to="/plans">
          Precios
        </Link>
      </nav>

      {/* Derecha: botones (Desktop) */}
      <div className="hidden lg:flex items-center gap-4">
        <Link
          className="border-2 border-sky-500 text-sky-600 hover:bg-sky-50 font-semibold px-5 py-2 rounded-xl transition-colors cursor-pointer text-[14px]"
          to="/"
        >
          OMTime para usuarios
        </Link>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
          onClick={onOpenLogin}
        >
          Iniciar Sesión
        </button>
      </div>

      {/* Hambuger Button (Mobile) */}
      <button
        className="lg:hidden text-slate-600"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white border-b border-gray-100 shadow-lg flex flex-col p-6 gap-4 lg:hidden">
          <Link className="text-slate-600 text-[16px] font-medium hover:text-orange-500" to="/" onClick={() => setIsMobileMenuOpen(false)}>
            Inicio
          </Link>
          <Link className="text-slate-600 text-[16px] font-medium hover:text-orange-500" to="/about" onClick={() => setIsMobileMenuOpen(false)}>
            ¿Qué Ofrecemos?
          </Link>
          <Link className="text-slate-600 text-[16px] font-medium hover:text-orange-500" to="/plans" onClick={() => setIsMobileMenuOpen(false)}>
            Precios
          </Link>
          <div className="h-px bg-slate-100 my-2 w-full" />
          <Link
            className="border-2 border-sky-500 text-sky-600 text-center hover:bg-sky-50 font-semibold px-5 py-3 rounded-xl transition-colors cursor-pointer text-[15px] w-full"
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            OMTime para usuarios
          </Link>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer w-full text-[15px]"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenLogin();
            }}
          >
            Iniciar Sesión
          </button>
        </div>
      )}
    </header>
  );
};

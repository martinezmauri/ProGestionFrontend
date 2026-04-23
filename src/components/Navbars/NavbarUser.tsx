import { useState } from "react";
import { Link } from "react-router-dom";
import { FormLogin } from "@components/Modals/FormLogin";
import { FormRegister } from "@components/Modals/FormRegister";
import { useAuth } from "@context/AuthContext";
import { UserMenu } from "./UserMenu";
import { Menu, X, Store } from "lucide-react";

export const NavbarUser = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { session, userProfile } = useAuth();
  const isAuthenticated = !!session;

  const handleOpenLogin = () => {
    setIsOpenRegister(false);
    setIsOpenLogin(true);
  };
  const handleCloseLogin = () => setIsOpenLogin(false);

  const handleOpenRegister = () => {
    setIsOpenLogin(false);
    setIsOpenRegister(true);
  };
  const handleCloseRegister = () => setIsOpenRegister(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-4 bg-white sticky top-0 z-50 border-b border-gray-100">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-1">
        <span className="text-orange-500 text-2xl font-extrabold tracking-tight">OM</span>
        <span className="text-slate-800 text-2xl font-extrabold tracking-tight">Time</span>
      </Link>

      {/* Right side — always visible */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Software para negocios — siempre visible */}
        <Link
          to="/para-negocios/planes"
          className="border-2 border-sky-500 text-sky-600 hover:bg-sky-50 font-semibold px-3 md:px-5 py-2 rounded-xl transition-colors text-[13px] md:text-[14px] whitespace-nowrap"
        >
          <span className="hidden sm:inline">Software para negocios</span>
          <span className="sm:hidden">Para negocios</span>
        </Link>

        {/* Mi Negocio — solo si tiene negocio */}
        {isAuthenticated && userProfile?.businessId && (
          <Link
            to="/dashboard"
            className="hidden md:flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-semibold text-[14px] transition-colors"
          >
            <Store className="w-4 h-4" />
            Mi Negocio
          </Link>
        )}

        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 md:px-6 py-2 md:py-2.5 rounded-xl transition-colors cursor-pointer text-[13px] md:text-[14px]"
            onClick={handleOpenLogin}
          >
            Iniciar Sesión
          </button>
        )}

        {/* Hamburger — solo mobile */}
        <button
          className="md:hidden text-slate-600 ml-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Hamburger Button — handled inside the right-side div above */}

      {/* Mobile dropdown — extra links when hamburger is open */}
      {isMobileMenuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white border-b border-gray-100 shadow-lg flex flex-col p-4 gap-3 md:hidden">
          {isAuthenticated && userProfile?.businessId && (
            <Link
              to="/dashboard"
              className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-5 py-3 rounded-xl transition-colors text-[15px] w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Store className="w-4 h-4" />
              Mi Negocio
            </Link>
          )}
        </div>
      )}

      {/* Auth modals */}
      {isOpenLogin && (
        <FormLogin
          onClose={handleCloseLogin}
          onOpenRegister={handleOpenRegister}
        />
      )}
      {isOpenRegister && (
        <FormRegister
          onClose={handleCloseRegister}
          onOpenLogin={handleOpenLogin}
        />
      )}
    </nav>
  );
};

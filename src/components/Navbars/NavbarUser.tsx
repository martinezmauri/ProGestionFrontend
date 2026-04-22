import { useState } from "react";
import { Link } from "react-router-dom";
import { FormLogin } from "@components/Modals/FormLogin";
import { FormRegister } from "@components/Modals/FormRegister";
import { useAuth } from "@context/AuthContext";
import { UserMenu } from "./UserMenu";
import { Menu, X } from "lucide-react";

export const NavbarUser = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { session } = useAuth();
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

      {/* Right side (Desktop) */}
      <div className="hidden lg:flex items-center gap-4">
        <Link
          to="/para-negocios"
          className="border-2 border-sky-500 text-sky-600 hover:bg-sky-50 font-semibold px-5 py-2 rounded-xl transition-colors cursor-pointer text-[14px]"
        >
          OMTime para negocios
        </Link>

        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
            onClick={handleOpenLogin}
          >
            Iniciar Sesión
          </button>
        )}
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
          <Link
            to="/para-negocios"
            className="border-2 border-sky-500 text-sky-600 text-center hover:bg-sky-50 font-semibold px-5 py-3 rounded-xl transition-colors cursor-pointer text-[15px] w-full"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            OMTime para negocios
          </Link>
          <div className="h-px bg-slate-100 my-1 w-full" />
          {isAuthenticated ? (
            <div className="w-full flex justify-center">
              <UserMenu />
            </div>
          ) : (
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer w-full text-[15px]"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleOpenLogin();
              }}
            >
              Iniciar Sesión
            </button>
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

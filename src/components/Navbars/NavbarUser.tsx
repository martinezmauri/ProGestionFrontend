import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { FormLogin } from "@components/Modals/FormLogin";
import { FormRegister } from "@components/Modals/FormRegister";
import { useAuth } from "@context/AuthContext";
import { UserMenu } from "./UserMenu";

export const NavbarUser = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const { userInfo, isAuthenticated, logout } = useAuth();

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
    <nav className="flex items-center justify-between px-10 py-4 bg-[#F2FAFF]">
      {/* Lado izquierdo */}
      <div className="flex items-center gap-6">
        <Link to={"/"} className="text-[#f96e2a] text-[2.3em] font-bold">
          ProGestion
        </Link>
      </div>

      {/* Lado derecho */}
      <div className="flex items-center gap-5">
        <Link
          className="bg-white border border-[#0284C7] text-[#0284C7] font-medium px-6 py-2 rounded-md hover:bg-[#E0F2FE] transition-colors"
          to={"/client"}
        >
          Contratá ProGestion
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center  gap-4 relative">
            <UserMenu />
          </div>
        ) : (
          <button
            className="bg-[#0284C7] hover:bg-[#0369A1] text-white font-medium px-6 py-2 rounded-md transition-colors"
            onClick={handleOpenLogin}
          >
            Iniciar Sesión
          </button>
        )}
      </div>

      {/* Formularios modales */}
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

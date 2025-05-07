import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { FormLogin } from "@components/Modals/FormLogin";
import { FormRegister } from "@components/Modals/FormRegister";

export const NavbarUser = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const { user, isAuthenticated, logout } = useAuth0();

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
    <nav className="flex items-center ml-10">
      <Link to={"/"} className="text-[#f96e2a] text-[3em] font-bold">
        ProGestion
      </Link>
      <div className="flex absolute right-[40px] gap-[1.2rem]">
        <Link
          className="bg-[#295366] rounded-3xl text-[#fff] font-semibold p-[1.3vh]"
          to={"/client"}
        >
          Contratá ProGestion
        </Link>
        {isAuthenticated ? (
          <div>
            <Avatar className="mr-[2rem]">
              <AvatarImage
                className="rounded-full object-cover"
                src={user?.picture}
                alt={user?.name}
              />
            </Avatar>

            <label /* reemplazar por componente */
              onClick={() => logout()}
              style={{ color: "black" }}
              className="absolute"
            >
              Salir
            </label>
          </div>
        ) : (
          <button
            className="bg-[#c9e6f0] p-[1.3vh] rounded-3xl font-semibold cursor-pointer"
            onClick={handleOpenLogin}
          >
            Iniciar Sesión
          </button>
        )}
      </div>
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

import { useAuth } from "@context/AuthContext";
import { LogOut, Settings, Store, Calendar, Rocket } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserMenu = () => {
  const { userProfile, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (route: string) => {
    navigate(route);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="focus:outline-none">
        <img
          src="/default-avatar.png"
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
          <ul className="py-1 text-sm text-gray-700">
            {businessId ? (
              <>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => handleNavigate("/dashboard")}
                >
                  <Store className="w-4 h-4" />
                  Mi Negocio
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => handleNavigate("/")}
                >
                  <Calendar className="w-4 h-4" />
                  Sacar un turno
                </li>
              </>
            ) : (
              <li
                className="px-4 py-2 hover:bg-orange-50 cursor-pointer flex items-center gap-2 text-orange-600 font-medium"
                onClick={() => handleNavigate("/para-negocios/planes")}
              >
                <Rocket className="w-4 h-4" />
                Software para negocios
              </li>
            )}
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => handleNavigate("/ajustes")}
            >
              <Settings className="w-4 h-4" />
              Ajustes
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-red-500"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4" />
              Salir
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

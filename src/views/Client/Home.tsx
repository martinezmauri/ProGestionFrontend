import React from "react";
import styles from "./HomeClient.module.css";
import { Dashboard } from "../../components/Sidebar/Dashboard";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Card, CardContent } from "@ui/card";
import AppSidebar from "@components/Sidebar/AppSidebar";

export const HomeClient = () => {
  const navigate = useNavigate();

  const handleNavigate = (to: string) => {
    navigate(to);
  };
  return (
    <div className="flex h-screen bg-gradient-to-br from-sky-50 to-white w-full">
      {/* Sidebar */}
      <AppSidebar />

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-10 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Menu className="w-6 h-6 mr-3 text-sky-600" />
          <h1 className="text-orange-500 font-bold text-xl">ProGestion</h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
          <span className="text-white font-bold">P</span>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto pt-16 md:pt-8">
        <div className="max-w-7xl mx-auto">
          <header className="hidden md:block mb-8">
            <h1 className="text-orange-500 font-bold text-2xl">ProGestion</h1>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-orange-500 h-2"></div>
              <CardContent
                className="p-6"
                onClick={() => handleNavigate("/personal")}
              >
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <img
                    src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446184/moepwmyrbvrrblfjvwpo.png"
                    className="w-16 h-16"
                  />
                </div>
                <h2 className="text-lg font-semibold mb-2">Personal</h2>
                <p className="text-gray-500 text-sm">
                  Gestiona tu equipo de trabajo y sus horarios
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-sky-500 h-2"></div>
              <CardContent
                className="p-6"
                onClick={() => handleNavigate("/servicios")}
              >
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <img
                    src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446203/kqweob0pxuuhpbiifgtu.png"
                    className="w-16 h-16"
                  />
                </div>
                <h2 className="text-lg font-semibold mb-2">Servicios</h2>
                <p className="text-gray-500 text-sm">
                  Configura los servicios que ofrece tu negocio
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-orange-500 h-2"></div>
              <CardContent
                className="p-6"
                onClick={() => handleNavigate("/turnos")}
              >
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <img
                    src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446222/u2erdekuep0dos7lqr2o.png"
                    className="w-16 h-16"
                  />
                </div>
                <h2 className="text-lg font-semibold mb-2">Turnos</h2>
                <p className="text-gray-500 text-sm">
                  Administra la agenda de turnos y citas
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-sky-500 h-2"></div>
              <CardContent
                className="p-6"
                onClick={() => handleNavigate("/register-business")}
              >
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <img
                    src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446236/rwpjzqtno1fjvmjfvlb8.png"
                    className="w-16 h-16"
                  />
                </div>
                <h2 className="text-lg font-semibold mb-2">Empresa</h2>
                <p className="text-gray-500 text-sm">
                  Gestiona la información de tu negocio
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-orange-500 h-2"></div>
              <CardContent
                className="p-6"
                onClick={() => handleNavigate("/configuracion")}
              >
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <img
                    src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446255/aghzamax91klrtunfudb.png"
                    className="w-16 h-16"
                  />
                </div>
                <h2 className="text-lg font-semibold mb-2">Configuración</h2>
                <p className="text-gray-500 text-sm">
                  Personaliza la aplicación según tus necesidades
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

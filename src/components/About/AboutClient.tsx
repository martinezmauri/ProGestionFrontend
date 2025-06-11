import { Button } from "@ui/button";
import React from "react";

export const AboutClient = () => {
  return (
    <section className="bg-gradient-to-br from-sky-100 to-white py-16 md:py-18 flex flex-col gap-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Todo lo que necesitas para gestionar tu negocio
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            ProGestion te ofrece todas las herramientas para optimizar la
            gestión de turnos y mejorar la experiencia de tus clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Gestión de Turnos",
              description:
                "Organiza tu agenda de manera eficiente. Visualiza, modifica y confirma turnos en tiempo real.",
              icon: "calendar",
            },
            {
              title: "Control de Personal",
              description:
                "Administra los horarios de tus empleados y asigna servicios según sus especialidades.",
              icon: "users",
            },
            {
              title: "Reportes y Estadísticas",
              description:
                "Analiza el rendimiento de tu negocio con informes detallados y gráficos intuitivos.",
              icon: "bar-chart",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md transform scale-100 transition-transform duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                {feature.icon === "calendar" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sky-600"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                ) : feature.icon === "users" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sky-600"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sky-600"
                  >
                    <line x1="18" x2="18" y1="20" y2="10" />
                    <line x1="12" x2="12" y1="20" y2="4" />
                    <line x1="6" x2="6" y1="20" y2="14" />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <section className="bg-gradient-to-r from-sky-600 to-sky-500 py-16 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para optimizar tu negocio?
          </h2>
          <p className="text-sky-100 max-w-2xl mx-auto mb-8 text-lg">
            Únete a miles de negocios que ya confían en ProGestion para la
            gestión de sus turnos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-sky-600 hover:bg-sky-50 px-6 py-3 rounded-md cursor-pointer">
              Comenzar ahora
            </Button>
            <Button className="bg-white text-sky-600 hover:bg-sky-50 px-6 py-3 rounded-md cursor-pointer">
              Ver planes
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
};

import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@ui/card";
import { Users, Briefcase, Calendar, Settings, BarChart3 } from "lucide-react";

export const HomeClient = () => {
  const navigate = useNavigate();

  const handleNavigate = (to: string) => {
    navigate(to);
  };

  const cards = [
    {
      title: "Personal",
      description: "Gestiona tu equipo de trabajo y sus horarios",
      imgUrl: "https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446184/moepwmyrbvrrblfjvwpo.png",
      color: "bg-orange-500",
      iconColor: "text-orange-600",
      lightBg: "bg-orange-100",
      path: "/personal",
    },
    {
      title: "Servicios",
      description: "Configura los servicios que ofrece tu negocio",
      imgUrl: "https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446203/kqweob0pxuuhpbiifgtu.png",
      color: "bg-sky-500",
      iconColor: "text-sky-600",
      lightBg: "bg-sky-100",
      path: "/services",
    },
    {
      title: "Turnos",
      description: "Administra la agenda de turnos y citas",
      imgUrl: "https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446222/u2erdekuep0dos7lqr2o.png",
      color: "bg-orange-500",
      iconColor: "text-orange-600",
      lightBg: "bg-orange-100",
      path: "/turnos",
    },
    {
      title: "Empresa",
      description: "Gestiona la información de tu negocio",
      imgUrl: "https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446236/rwpjzqtno1fjvmjfvlb8.png",
      color: "bg-sky-500",
      iconColor: "text-sky-600",
      lightBg: "bg-sky-100",
      path: "/empresa",
    },
    {
      title: "Configuración",
      description: "Personaliza la aplicación según tus necesidades",
      imgUrl: "https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446255/aghzamax91klrtunfudb.png",
      color: "bg-orange-500",
      iconColor: "text-orange-600",
      lightBg: "bg-orange-100",
      path: "/configuracion",
    },
    {
      title: "Estadísticas",
      description: "Métricas y gráficas sobre tu modelo de negocio",
      icon: BarChart3,
      color: "bg-sky-500",
      iconColor: "text-sky-600",
      lightBg: "bg-sky-100",
      path: "/estadisticas",
    },
  ];

  return (
    <div className="w-full flex-1 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <header className="mb-8 hidden md:block">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Bienvenido a <span className="text-orange-500">OMTime</span>
          </h1>
          <p className="text-slate-500 mt-2">
            Gestiona de forma integral tu negocio desde el panel de control.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card
                key={index}
                className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 bg-white"
                onClick={() => handleNavigate(card.path)}
              >
                <div className={`h-1.5 w-full ${card.color}`}></div>
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 overflow-hidden ${card.imgUrl ? '' : card.lightBg} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {card.imgUrl ? (
                      <img src={card.imgUrl} alt={card.title} className="w-16 h-16 object-cover" />
                    ) : (
                      Icon && <Icon className={`w-8 h-8 ${card.iconColor}`} />
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">
                    {card.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

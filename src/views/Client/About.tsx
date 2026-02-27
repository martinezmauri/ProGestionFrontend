import { NavbarClient } from "@components/Navbars/NavbarClient";
import { ClientFooter } from "@components/Landing/ClientLandingSections";
import { FormLogin } from "@components/Modals/FormLogin";
import { FormRegister } from "@components/Modals/FormRegister";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  CreditCard,
  Monitor,
  Package,
  MessageCircle,
  BarChart3,
  ArrowRight,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@ui/button";

/* ─── Feature Data ─── */
const features = [
  {
    tag: "UN SITIO WEB PARA TU NEGOCIO",
    title: "Reservas Online",
    description:
      "Tu negocio tendrá su propia página donde tus clientes pueden reservar turnos online en menos de un minuto, las 24 horas del día, los 7 días de la semana. De esta manera, tu negocio está siempre disponible, evitando perder reservas por falta de respuesta o atención telefónica.",
    extra:
      "Además, automatizamos las respuestas a través de WhatsApp, redes sociales y todo se resuelve de manera automática.",
    image: "/feature-reservas.png",
    icon: CalendarCheck,
    color: "from-sky-500 to-sky-700",
  },
  {
    tag: "GARANTÍA PARA LAS RESERVAS",
    title: "Integración con Mercado Pago",
    description:
      "¡No más pérdida de dinero por cancelaciones a último momento! Nuestra integración con Mercado Pago permite que todas las reservas estén garantizadas. Con el método de 'tarjeta en garantía' podés permitirle a tus clientes pagar en efectivo y evitar el riesgo de perder la seña.",
    extra:
      "A través del método de 'Tarjeta en garantía' los cobros no se ejecutarán, salvo que el cliente incumpla con la reserva. De esta manera se evitará abonar cargos extras por procesamiento de cobros.",
    image: "/feature-pagos.png",
    icon: CreditCard,
    color: "from-green-500 to-green-700",
  },
  {
    tag: "CONTROLÁ TU NEGOCIO DE MANERA REMOTA",
    title: "Software Online",
    description:
      "¡Administrá tu negocio desde cualquier lugar! Podés gestionar reservas, controlar empleados, visualizar estadísticas, resolver la superposición de turnos con esta plataforma multiusuario y todo lo que necesites, desde cualquier dispositivo.",
    extra: null,
    image: "/feature-software.png",
    icon: Monitor,
    color: "from-violet-500 to-violet-700",
  },
  {
    tag: "ADMINISTRACIÓN EFICIENTE",
    title: "Caja y Stock",
    description:
      "Llevá un control de caja diario detallado con todos los movimientos del negocio. Administrá de cerca el inventario y la información de stock en tiempo real.",
    extra:
      "Registrá ingresos, egresos, y controlá el flujo de caja de manera simple y organizada. Ideal para tener total visibilidad de tus finanzas.",
    image: "/dashboard-mockup.png",
    icon: Package,
    color: "from-orange-500 to-orange-700",
  },
];

/* ─── More capabilities ─── */
const capabilities = [
  {
    icon: MessageCircle,
    title: "Notificaciones por WhatsApp",
    description: "Confirmaciones y recordatorios automáticos para reducir ausencias.",
  },
  {
    icon: BarChart3,
    title: "Reportes y métricas",
    description: "Datos claros sobre ocupación, ingresos y rendimiento del equipo.",
  },
  {
    icon: Shield,
    title: "Multi-sucursal",
    description: "Gestioná múltiples locales desde un solo panel centralizado.",
  },
  {
    icon: Clock,
    title: "Gestión de horarios",
    description: "Configurá horarios de atención, franjas y descansos para cada empleado.",
  },
];

export const About = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const handleOpenLogin = () => { setIsOpenRegister(false); setIsOpenLogin(true); };
  const handleCloseLogin = () => setIsOpenLogin(false);
  const handleOpenRegister = () => { setIsOpenLogin(false); setIsOpenRegister(true); };
  const handleCloseRegister = () => setIsOpenRegister(false);

  return (
    <div className="w-full bg-white">
      <NavbarClient onOpenLogin={handleOpenLogin} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#F2FAFF] to-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Zap className="h-4 w-4" />
              FUNCIONALIDADES
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              ¿Cómo funciona OMTime?
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Automatizá tu negocio de forma 100% online. Recibí reservas, gestioná
              empleados, controlá pagos y mucho más desde una sola plataforma.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alternating Feature Sections */}
      {features.map((feat, i) => {
        const isReversed = i % 2 !== 0;
        return (
          <section
            key={i}
            className={`py-20 ${i % 2 === 0 ? "bg-white" : "bg-[#FAFBFC]"}`}
          >
            <div className="container mx-auto px-4">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isReversed ? "lg:direction" : ""
                  }`}
              >
                {/* Text */}
                <motion.div
                  className={isReversed ? "lg:order-2" : ""}
                  initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">
                    {feat.tag}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                    {feat.title}
                  </h2>
                  <p className="text-gray-500 text-lg leading-relaxed mb-4">
                    {feat.description}
                  </p>
                  {feat.extra && (
                    <p className="text-gray-400 leading-relaxed">
                      {feat.extra}
                    </p>
                  )}
                </motion.div>

                {/* Image */}
                <motion.div
                  className={`relative ${isReversed ? "lg:order-1" : ""}`}
                  initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {/* Decorative circle */}
                  <div
                    className={`absolute -z-0 w-72 h-72 rounded-full bg-gradient-to-br ${feat.color} opacity-10 blur-2xl ${isReversed ? "-left-10 top-10" : "-right-10 top-10"
                      }`}
                  />
                  <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                    <img
                      src={feat.image}
                      alt={feat.title}
                      className="w-full object-cover"
                    />
                  </div>
                  {/* Floating icon */}
                  <div
                    className={`absolute z-20 -bottom-4 ${isReversed ? "right-8" : "left-8"
                      } w-14 h-14 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center shadow-lg`}
                  >
                    <feat.icon className="h-7 w-7 text-white" />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* More Capabilities Grid */}
      <section className="py-20 bg-gradient-to-b from-[#F2FAFF] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Y mucho más...
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Funcionalidades que hacen la diferencia
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-orange-100 to-sky-100 flex items-center justify-center mb-4">
                  <cap.icon className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{cap.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-orange-50 max-w-xl mx-auto mb-8 text-lg">
            Probá OMTime gratis durante 30 días. Sin tarjeta de crédito.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/plans"
              className="inline-flex items-center bg-white text-orange-500 hover:bg-orange-50 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all"
            >
              Ver planes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/register-business"
              className="inline-flex items-center border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all"
            >
              Comenzar prueba gratis
            </Link>
          </div>
        </div>
      </section>

      <ClientFooter />

      {isOpenLogin && (
        <FormLogin onClose={handleCloseLogin} onOpenRegister={handleOpenRegister} />
      )}
      {isOpenRegister && (
        <FormRegister onClose={handleCloseRegister} onOpenLogin={handleOpenLogin} />
      )}
    </div>
  );
};

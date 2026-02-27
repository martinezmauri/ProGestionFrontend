import { NavbarClient } from "@components/Navbars/NavbarClient";
import { ClientFooter } from "@components/Landing/ClientLandingSections";
import { FormLogin } from "@components/Modals/FormLogin";
import { FormRegister } from "@components/Modals/FormRegister";
import { Card, CardContent } from "@ui/card";
import { Button } from "@ui/button";
import { motion } from "framer-motion";
import {
  Check,
  X,
  ArrowRight,
  Zap,
  Star,
  Crown,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

/* ─── Plan Data ─── */
const plans = [
  {
    name: "Básico",
    icon: Zap,
    price: "12.000",
    period: "/mes",
    description: "Ideal para emprendedores y negocios pequeños que recién empiezan.",
    highlight: false,
    features: [
      { text: "1 sucursal", included: true },
      { text: "Hasta 3 empleados", included: true },
      { text: "Reservas online ilimitadas", included: true },
      { text: "Confirmación por WhatsApp", included: true },
      { text: "Página de reservas personalizada", included: true },
      { text: "Reportes básicos", included: true },
      { text: "Soporte por email", included: true },
      { text: "Caja y stock", included: false },
      { text: "Multi-sucursal", included: false },
      { text: "Integración Mercado Pago", included: false },
      { text: "API personalizada", included: false },
    ],
  },
  {
    name: "Estándar",
    icon: Star,
    price: "22.000",
    period: "/mes",
    description: "Para negocios en crecimiento que necesitan más control y funcionalidades.",
    highlight: true,
    badge: "Más popular",
    features: [
      { text: "Hasta 2 sucursales", included: true },
      { text: "Hasta 10 empleados", included: true },
      { text: "Reservas online ilimitadas", included: true },
      { text: "Confirmación por WhatsApp", included: true },
      { text: "Página de reservas personalizada", included: true },
      { text: "Reportes avanzados", included: true },
      { text: "Soporte por WhatsApp y email", included: true },
      { text: "Caja y stock", included: true },
      { text: "Integración Mercado Pago", included: true },
      { text: "Multi-sucursal", included: false },
      { text: "API personalizada", included: false },
    ],
  },
  {
    name: "Premium",
    icon: Crown,
    price: "38.000",
    period: "/mes",
    description: "Para negocios grandes con múltiples locales y equipos de trabajo.",
    highlight: false,
    features: [
      { text: "Sucursales ilimitadas", included: true },
      { text: "Empleados ilimitados", included: true },
      { text: "Reservas online ilimitadas", included: true },
      { text: "Confirmación por WhatsApp", included: true },
      { text: "Página de reservas personalizada", included: true },
      { text: "Reportes avanzados + exportación", included: true },
      { text: "Soporte prioritario 24/7", included: true },
      { text: "Caja y stock avanzado", included: true },
      { text: "Integración Mercado Pago", included: true },
      { text: "Multi-sucursal", included: true },
      { text: "API personalizada", included: true },
    ],
  },
];

/* ─── FAQ Data ─── */
const plansFaq = [
  {
    question: "¿Puedo cambiar de plan en cualquier momento?",
    answer:
      "Sí, podés actualizar o bajar tu plan cuando quieras. Los cambios se aplican en el próximo ciclo de facturación.",
  },
  {
    question: "¿Hay algún compromiso de permanencia?",
    answer:
      "No, todos nuestros planes son mes a mes. Podés cancelar cuando quieras sin penalización.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos tarjetas de crédito/débito, Mercado Pago y transferencia bancaria.",
  },
  {
    question: "¿Qué incluye la prueba gratis de 30 días?",
    answer:
      "La prueba gratis incluye todas las funcionalidades del plan Estándar. Al finalizar, podés elegir el plan que mejor se adapte a tu negocio.",
  },
  {
    question: "¿Ofrecen descuento por pago anual?",
    answer:
      "Sí, al pagar anualmente obtenés 2 meses gratis. Contactanos para más información.",
  },
];

const PlanFAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex justify-between items-center py-5 px-1 text-left cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-800 font-medium text-lg group-hover:text-sky-600 transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-sky-500 transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 pb-5" : "max-h-0"
          }`}
      >
        <p className="text-gray-500 px-1 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export const Plans = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [annual, setAnnual] = useState(false);

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Planes y precios
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Elegí el plan que mejor se adapte a tu negocio. Todos incluyen 30 días de
              prueba gratis, sin tarjeta de crédito.
            </p>

            {/* Toggle mensual / anual */}
            <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
              <button
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${!annual ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                  }`}
                onClick={() => setAnnual(false)}
              >
                Mensual
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${annual ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                  }`}
                onClick={() => setAnnual(true)}
              >
                Anual
                <span className="ml-1 text-xs text-green-600 font-bold">-20%</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => {
              const monthlyPrice = parseInt(plan.price.replace(".", ""));
              const displayPrice = annual
                ? Math.round(monthlyPrice * 0.8).toLocaleString("es-AR")
                : plan.price;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex"
                >
                  <Card
                    className={`w-full relative overflow-hidden border-2 transition-all duration-300 flex flex-col ${plan.highlight
                        ? "border-sky-500 shadow-xl shadow-sky-100 scale-105"
                        : "border-gray-100 shadow-sm hover:shadow-lg"
                      }`}
                  >
                    {plan.highlight && (
                      <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-center py-1.5 text-xs font-bold tracking-wider">
                        ⭐ MÁS POPULAR
                      </div>
                    )}
                    <CardContent className={`p-8 flex flex-col flex-1 ${plan.highlight ? "pt-12" : ""}`}>
                      {/* Icon + Name */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.highlight
                              ? "bg-gradient-to-br from-sky-400 to-sky-600"
                              : "bg-gray-100"
                            }`}
                        >
                          <plan.icon
                            className={`h-5 w-5 ${plan.highlight ? "text-white" : "text-gray-500"
                              }`}
                          />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <span className="text-4xl font-extrabold text-gray-900">
                          ${displayPrice}
                        </span>
                        <span className="text-gray-400 text-sm">{plan.period}</span>
                        {annual && (
                          <p className="text-xs text-green-600 font-semibold mt-1">
                            Ahorrás 2 meses por año
                          </p>
                        )}
                      </div>

                      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                        {plan.description}
                      </p>

                      {/* CTA */}
                      <Link to="/register-business" className="w-full mb-6">
                        <Button
                          className={`w-full py-3 rounded-xl font-semibold text-base cursor-pointer ${plan.highlight
                              ? "bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-200"
                              : "bg-gray-900 hover:bg-gray-800 text-white"
                            }`}
                        >
                          Comenzar gratis
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>

                      {/* Features */}
                      <div className="space-y-3 flex-1">
                        {plan.features.map((feat, fi) => (
                          <div key={fi} className="flex items-center gap-2.5">
                            {feat.included ? (
                              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            ) : (
                              <X className="h-4 w-4 text-gray-300 flex-shrink-0" />
                            )}
                            <span
                              className={`text-sm ${feat.included ? "text-gray-700" : "text-gray-400"
                                }`}
                            >
                              {feat.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison note */}
      <section className="py-12 bg-[#FAFBFC]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Todos los planes incluyen prueba gratis de 30 días · Sin tarjeta de crédito · Cancelá cuando quieras
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Preguntas sobre precios
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Resolvé tus dudas antes de elegir
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {plansFaq.map((faq, i) => (
              <PlanFAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Todavía tenés dudas?
          </h2>
          <p className="text-sky-100 max-w-xl mx-auto mb-8 text-lg">
            Hablá con nuestro equipo y te ayudamos a elegir el plan perfecto para tu
            negocio.
          </p>
          <Link
            to="/support"
            className="inline-flex items-center bg-white text-sky-600 hover:bg-sky-50 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all"
          >
            Contactar soporte
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
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

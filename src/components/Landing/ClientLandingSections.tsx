import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import {
    ArrowRight,
    CalendarCheck,
    Clock,
    Users,
    BarChart3,
    Bell,
    Shield,
    ChevronDown,
    Star,
    Zap,
    Smartphone,
    TrendingUp,
    HeartHandshake,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════
   Section 1 — Hero with Device Mockups
   ═══════════════════════════════════════════ */
export const ClientHero = () => (
    <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-[#F2FAFF] via-white to-[#FFF7ED] py-16 md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
    >
        {/* Decorative blob */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-orange-100/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left — Copy */}
                <div>
                    <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                        <Zap className="h-4 w-4" />
                        GESTIÓN DE TURNOS PARA NEGOCIOS
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-gray-900 mb-6 leading-[1.15] tracking-tight">
                        Automatizá la gestión de turnos de tu negocio
                    </h1>
                    <p className="text-gray-500 mb-8 text-lg leading-relaxed max-w-xl">
                        Permitile a tus clientes reservar turnos de manera rápida y
                        sencilla. Ahorrá tiempo, mejorá la organización y aumentá la
                        productividad con OMTime.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/plans">
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold text-base shadow-lg shadow-orange-200 cursor-pointer">
                                Ver planes
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            className="border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold text-base hover:bg-gray-50 cursor-pointer"
                        >
                            Solicitar demo
                        </Button>
                    </div>
                    <div className="flex items-center gap-6 mt-8 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                            <Shield className="h-4 w-4 text-green-500" /> Sin tarjeta de crédito
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-sky-500" /> Configuración en minutos
                        </span>
                    </div>
                </div>

                {/* Right — Device Mockups */}
                <div className="relative flex justify-center items-center">
                    {/* Tablet / Desktop mockup */}
                    <motion.div
                        className="relative z-10 w-[85%] rounded-2xl overflow-hidden shadow-2xl border border-gray-200/60 bg-white"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <div className="h-8 bg-gray-100 flex items-center px-3 gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                            <span className="ml-3 text-xs text-gray-400">omtime.io/dashboard</span>
                        </div>
                        <img
                            src="/dashboard-mockup.png"
                            alt="Dashboard de OMTime — Vista de gestión de turnos"
                            className="w-full"
                        />
                    </motion.div>

                    {/* Phone mockup — overlapping */}
                    <motion.div
                        className="absolute -bottom-6 -right-4 md:right-0 z-20 w-[35%] max-w-[160px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white"
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <div className="h-5 bg-gray-900 rounded-t-lg flex items-center justify-center">
                            <div className="w-12 h-1.5 rounded-full bg-gray-700" />
                        </div>
                        <img
                            src="/mobile-mockup.png"
                            alt="App móvil de reservas OMTime"
                            className="w-full"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    </motion.section>
);

/* ═══════════════════════════════════════════
   Section 2 — Funcionalidades
   ═══════════════════════════════════════════ */
const features = [
    {
        icon: CalendarCheck,
        title: "Reservas automáticas",
        description:
            "Tus clientes reservan online 24/7. Sin llamadas, sin esperas. El sistema actualiza tu agenda en tiempo real.",
        color: "from-sky-400 to-sky-600",
        bg: "bg-sky-50",
    },
    {
        icon: Users,
        title: "Control de personal",
        description:
            "Asigná especialidades, horarios y disponibilidad a cada empleado. Organizá tu equipo sin esfuerzo.",
        color: "from-orange-400 to-orange-600",
        bg: "bg-orange-50",
    },
    {
        icon: Bell,
        title: "Notificaciones automáticas",
        description:
            "Confirmación instantánea por WhatsApp. Recordatorios antes de cada turno para reducir ausencias.",
        color: "from-green-400 to-green-600",
        bg: "bg-green-50",
    },
    {
        icon: BarChart3,
        title: "Reportes y estadísticas",
        description:
            "Analizá el rendimiento de tu negocio con métricas claras: turnos, ingresos y ocupación.",
        color: "from-violet-400 to-violet-600",
        bg: "bg-violet-50",
    },
    {
        icon: Smartphone,
        title: "Tu página de reservas",
        description:
            "Cada negocio recibe su propia página personalizable donde los clientes pueden reservar directamente.",
        color: "from-pink-400 to-pink-600",
        bg: "bg-pink-50",
    },
    {
        icon: Shield,
        title: "Seguridad y privacidad",
        description:
            "Datos encriptados, backups automáticos y control de acceso por roles. Tu información siempre segura.",
        color: "from-slate-400 to-slate-600",
        bg: "bg-slate-50",
    },
];

export const ClientFeatures = () => (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Todo lo que necesitás para gestionar tu negocio
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                    OMTime te da las herramientas para automatizar turnos, organizar tu equipo y
                    hacer crecer tu negocio.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {features.map((feat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                        <Card className="border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full group">
                            <CardContent className="p-6">
                                <div
                                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}
                                >
                                    <feat.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">{feat.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{feat.description}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

/* ═══════════════════════════════════════════
   Section 3 — Prueba Gratis
   ═══════════════════════════════════════════ */
export const ClientFreeTrial = () => (
    <section className="py-20 bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-white" />
            <div className="absolute -bottom-20 -left-10 w-52 h-52 rounded-full bg-white" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <CalendarCheck className="h-12 w-12 text-white/80 mx-auto mb-5" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Probá OMTime gratis durante 1 mes
                </h2>
                <p className="text-sky-100 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
                    Sin compromiso, sin tarjeta de crédito. Experimentá todas las funcionalidades
                    premium y descubrí cómo OMTime puede transformar tu negocio.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/plans"
                        className="inline-flex items-center bg-white text-sky-600 hover:bg-sky-50 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Ver planes
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                        to="/register-business"
                        className="inline-flex items-center border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
                    >
                        Comenzar prueba gratis
                    </Link>
                </div>
            </motion.div>
        </div>
    </section>
);

/* ═══════════════════════════════════════════
   Section 4 — Ventajas (mini cards)
   ═══════════════════════════════════════════ */
const advantages = [
    {
        icon: Clock,
        title: "Ahorrá tiempo",
        description: "Automatizá tareas repetitivas y enfocate en lo que importa.",
    },
    {
        icon: TrendingUp,
        title: "Aumentá ingresos",
        description: "Reducí ausencias con recordatorios y optimizá la ocupación.",
    },
    {
        icon: HeartHandshake,
        title: "Mejorá la experiencia",
        description: "Tus clientes reservan fácil y reciben confirmación al instante.",
    },
    {
        icon: Smartphone,
        title: "Acceso desde cualquier lugar",
        description: "Gestioná tu negocio desde el celular, tablet o computadora.",
    },
];

export const ClientAdvantages = () => (
    <section className="py-20 bg-[#FAFBFC]">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Ventajas de digitalizar tu negocio
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto text-lg">
                    Descubrí por qué miles de negocios eligen OMTime
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {advantages.map((adv, i) => (
                    <motion.div
                        key={i}
                        className="text-center p-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-100 to-sky-100 flex items-center justify-center mb-4 shadow-sm">
                            <adv.icon className="h-7 w-7 text-orange-500" />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">{adv.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{adv.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

/* ═══════════════════════════════════════════
   Section 5 — Reseñas
   ═══════════════════════════════════════════ */
const reviews = [
    {
        name: "Carolina M.",
        business: "Peluquería Style — Palermo",
        text: "Desde que usamos OMTime, las cancelaciones bajaron un 60%. Los clientes reciben recordatorio por WhatsApp y nunca pierden su turno.",
        rating: 5,
    },
    {
        name: "Martín R.",
        business: "Barbería Don Martín — Belgrano",
        text: "Antes atendíamos por teléfono y era un caos. Ahora la agenda se llena sola y podemos enfocarnos en atender bien.",
        rating: 5,
    },
    {
        name: "Laura S.",
        business: "Centro Estética Aura — Recoleta",
        text: "La mejor inversión que hicimos. Mis 4 empleadas manejan sus horarios sin problemas y los reportes me ayudan a tomar decisiones.",
        rating: 5,
    },
];

export const ClientReviews = () => (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Lo que dicen nuestros clientes
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto text-lg">
                    Negocios reales que transformaron su gestión con OMTime
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {reviews.map((review, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                    >
                        <Card className="border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full relative overflow-hidden">
                            {/* Decorative accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-sky-400" />
                            <CardContent className="p-6 pt-8">
                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(review.rating)].map((_, s) => (
                                        <Star
                                            key={s}
                                            className="h-4 w-4 text-yellow-400 fill-yellow-400"
                                        />
                                    ))}
                                </div>
                                {/* Quote */}
                                <p className="text-gray-600 mb-6 leading-relaxed italic">
                                    "{review.text}"
                                </p>
                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-sky-400 flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-sm">
                                            {review.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">{review.name}</p>
                                        <p className="text-gray-400 text-xs">{review.business}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

/* ═══════════════════════════════════════════
   Section 6 — FAQ
   ═══════════════════════════════════════════ */
const clientFaqData = [
    {
        question: "¿Cuál es el precio del sistema?",
        answer:
            "Ofrecemos planes mensuales y anuales que se adaptan al tamaño de tu negocio. Todos incluyen prueba gratis por 1 mes. Consultá la página de planes para ver los detalles.",
    },
    {
        question: "¿Se pueden cobrar señas a través de la página?",
        answer:
            "Sí, podés configurar el cobro de señas al momento de la reserva para reducir cancelaciones. Integramos con Mercado Pago y Stripe.",
    },
    {
        question: "¿Cuántos usuarios administradores puedo tener?",
        answer:
            "Depende del plan. El plan básico incluye 1 administrador, el profesional hasta 3 y el empresarial es ilimitado.",
    },
    {
        question: "¿Se pueden cargar reservas de manera interna?",
        answer:
            "Sí, además de recibir reservas online, podés cargar turnos manualmente desde el panel para clientes que reservan por teléfono o en persona.",
    },
    {
        question: "¿Se pueden configurar precios especiales según día y horario?",
        answer:
            "Sí, podés configurar tarifas diferentes por día de la semana, horario o tipo de servicio para maximizar tu rentabilidad.",
    },
    {
        question: "¿Cuentan con capacitación y soporte?",
        answer:
            "¡Por supuesto! Ofrecemos capacitación inicial gratuita y soporte por WhatsApp y email para resolver cualquier duda.",
    },
];

const ClientFAQItem = ({ question, answer }: { question: string; answer: string }) => {
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

export const ClientFAQ = () => (
    <section className="py-20 bg-[#FAFBFC]">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Preguntas frecuentes
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto text-lg">
                    Todo lo que necesitás saber antes de empezar
                </p>
            </div>
            <div className="max-w-3xl mx-auto">
                {clientFaqData.map((faq, i) => (
                    <ClientFAQItem key={i} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
    </section>
);

/* ═══════════════════════════════════════════
   Section 7 — Footer
   ═══════════════════════════════════════════ */
export const ClientFooter = () => (
    <footer className="bg-gray-900 text-gray-300 py-14">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                <div>
                    <h1 className="text-orange-500 font-bold text-2xl mb-3">OMTime</h1>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        La plataforma completa de gestión de turnos para negocios. Automatizá,
                        organizá y crecé.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-white mb-4">Producto</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
                        <li><Link to="/plans" className="hover:text-white transition-colors">Precios</Link></li>
                        <li><a href="#" className="hover:text-white transition-colors">Tutoriales</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-white mb-4">Empresa</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/about" className="hover:text-white transition-colors">Sobre nosotros</Link></li>
                        <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                        <li><Link to="/support" className="hover:text-white transition-colors">Contacto</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-white mb-4">Soporte</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/support" className="hover:text-white transition-colors">Centro de ayuda</Link></li>
                        <li><a href="#" className="hover:text-white transition-colors">Estado del sistema</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                <p className="text-gray-500">© 2026 OMTime. Todos los derechos reservados.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="text-gray-500 hover:text-white transition-colors">Términos</a>
                    <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacidad</a>
                    <a href="#" className="text-gray-500 hover:text-white transition-colors">Cookies</a>
                </div>
            </div>
        </div>
    </footer>
);

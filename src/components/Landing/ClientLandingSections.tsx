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
        className="relative overflow-hidden bg-white py-12 md:py-24 lg:py-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
    >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 pointer-events-none flex justify-end">
            <img
                src="/business-hero-bg.png"
                alt="Gestión de turnos OMTime"
                className="w-full h-full object-cover object-[80%_center] md:w-[80%] lg:w-[70%] opacity-30 md:opacity-100 blur-[4px]"
            />
        </div>

        {/* Gradient Overlay to ensure text readability on the left */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-white via-white/95 to-transparent md:w-[70%] lg:w-[60%]" />

        {/* Vertical Gradient Overlays for smooth top/bottom edges */}
        <div className="absolute inset-x-0 top-0 h-32 md:h-48 z-0 pointer-events-none bg-gradient-to-b from-white to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 md:h-48 z-0 pointer-events-none bg-gradient-to-t from-white to-transparent" />

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
            <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-500 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 mt-8 md:mt-0">
                    <Zap className="h-4 w-4" />
                    GESTIÓN DE TURNOS PARA NEGOCIOS
                </div>
                <h1 className="text-4xl md:text-[56px] lg:text-[68px] font-extrabold text-slate-800 mb-6 leading-tight tracking-tight">
                    Automatizá la gestión<br /> de turnos de tu negocio
                </h1>
                <p className="text-slate-600 mb-8 text-[16px] md:text-lg leading-relaxed max-w-xl">
                    Permitile a tus clientes reservar turnos de manera rápida y
                    sencilla. Ahorrá tiempo, mejorá la organización y aumentá la
                    productividad con OMTime.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/para-negocios/planes">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-semibold text-[15px] shadow-lg shadow-orange-200 cursor-pointer flex items-center justify-center transition-colors">
                            Ver planes
                            <ArrowRight className="ml-2 h-[18px] w-[18px]" />
                        </button>
                    </Link>
                    <button
                        className="border border-slate-200 bg-white text-slate-700 px-8 py-3.5 rounded-xl font-semibold text-[15px] hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                        Solicitar demo
                    </button>
                </div>
                <div className="flex items-center gap-6 mt-8 text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                        <Shield className="h-[18px] w-[18px] text-green-500" /> Sin tarjeta de crédito
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="h-[18px] w-[18px] text-sky-500" /> Configuración en minutos
                    </span>
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
        description: "Tus clientes reservan online 24/7. Sin llamadas, sin esperas. El sistema actualiza tu agenda en tiempo real.",
        gradient: "from-sky-400 to-sky-600",
    },
    {
        icon: Users,
        title: "Control de personal",
        description: "Asigná especialidades, horarios y disponibilidad a cada empleado. Organizá tu equipo sin esfuerzo.",
        gradient: "from-orange-400 to-orange-600",
    },
    {
        icon: Bell,
        title: "Notificaciones automáticas",
        description: "Confirmación instantánea por WhatsApp. Recordatorios antes de cada turno para reducir ausencias.",
        gradient: "from-green-400 to-green-600",
    },
    {
        icon: BarChart3,
        title: "Reportes y estadísticas",
        description: "Analizá el rendimiento de tu negocio con métricas claras: turnos, ingresos y ocupación.",
        gradient: "from-purple-400 to-purple-600",
    },
    {
        icon: Smartphone,
        title: "Tu página de reservas",
        description: "Cada negocio recibe su propia página personalizable donde los clientes pueden reservar directamente.",
        gradient: "from-pink-400 to-pink-600",
    },
    {
        icon: Shield,
        title: "Seguridad y privacidad",
        description: "Datos encriptados, backups automáticos y control de acceso por roles. Tu información siempre segura.",
        gradient: "from-slate-600 to-slate-800",
    },
];

export const ClientFeatures = () => (
    <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                    Todo lo que necesitás para gestionar tu negocio
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-[16px] md:text-lg">
                    OMTime te da las herramientas para automatizar turnos, organizar tu equipo y
                    hacer crecer tu negocio.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                        <Card className="border border-slate-100 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-xl transition-all duration-300 h-full rounded-2xl group bg-white overflow-hidden">
                            <CardContent className="p-8">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-b ${feat.gradient} flex items-center justify-center mb-6 shadow-md`}>
                                    <feat.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-800">{feat.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-[15px]">{feat.description}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

/* ═══════════════════════════════════════════
   Section 3 — Prueba Gratis (CTA)
   ═══════════════════════════════════════════ */
export const ClientFreeTrial = () => (
    <section id="planes" className="py-16 md:py-24 bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-white" />
            <div className="absolute -bottom-20 -left-10 w-52 h-52 rounded-full bg-white" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <CalendarCheck className="h-12 w-12 text-white/80 mx-auto mb-6" />
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Probá OMTime gratis durante 1 mes
                </h2>
                <p className="text-orange-50 max-w-2xl mx-auto mb-10 text-[17px] leading-relaxed">
                    Sin compromiso, sin tarjeta de crédito. Experimentá todas las funcionalidades
                    premium y descubrí cómo OMTime puede transformar tu negocio.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/para-negocios/planes"
                        className="inline-flex justify-center items-center bg-white text-orange-500 hover:bg-orange-50 px-8 py-4 rounded-xl font-bold text-[17px] shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Ver planes
                        <ArrowRight className="ml-2 h-[18px] w-[18px]" />
                    </Link>
                    <Link
                        to="/para-negocios/planes"
                        className="inline-flex justify-center items-center border border-white/40 bg-white/10 text-white hover:bg-white/20 px-8 py-4 rounded-xl font-bold text-[17px] transition-all duration-300"
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
        description: "Gestioná tu negocio desde celular, tablet o computadora.",
    },
];

export const ClientAdvantages = () => (
    <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                    Ventajas de digitalizar tu negocio
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto text-[16px] md:text-lg">
                    Descubrí por qué miles de negocios eligen OMTime
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {advantages.map((adv, i) => (
                    <motion.div
                        key={i}
                        className="text-center bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.03)] border border-slate-100"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-50 flex items-center justify-center mb-6">
                            <adv.icon className="h-7 w-7 text-orange-500" />
                        </div>
                        <h3 className="font-bold text-slate-800 mb-3 text-lg">{adv.title}</h3>
                        <p className="text-slate-500 text-[15px] leading-relaxed">{adv.description}</p>
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
        text: "La mejor inversión que hicimos. Mis empleadas manejan sus horarios sin problemas y los reportes me ayudan muchísimo.",
        rating: 5,
    },
];

export const ClientReviews = () => (
    <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                    Lo que dicen nuestros clientes
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto text-[16px] md:text-lg">
                    Negocios reales que transformaron su gestión con OMTime
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reviews.map((review, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                    >
                        <Card className="border border-slate-100 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-xl transition-all duration-300 h-full rounded-2xl bg-white overflow-hidden relative">
                            {/* Decorative accent */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-amber-400" />
                            <CardContent className="p-8">
                                {/* Stars */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(review.rating)].map((_, s) => (
                                        <Star
                                            key={s}
                                            className="h-[18px] w-[18px] text-yellow-400 fill-yellow-400"
                                        />
                                    ))}
                                </div>
                                {/* Quote */}
                                <p className="text-slate-600 mb-8 leading-relaxed text-[15px] italic">
                                    "{review.text}"
                                </p>
                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-slate-500 font-bold text-[17px]">
                                            {review.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">{review.name}</p>
                                        <p className="text-slate-500 text-sm">{review.business}</p>
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
        answer: "Ofrecemos planes mensuales y anuales que se adaptan al tamaño de tu negocio. Todos incluyen prueba gratis por 1 mes. Consultá la página de planes para ver los detalles.",
    },
    {
        question: "¿Se pueden cobrar señas a través de la página?",
        answer: "Sí, podés configurar el cobro de señas al momento de la reserva para reducir cancelaciones. Integramos con Mercado Pago y Stripe.",
    },
    {
        question: "¿Cuántos usuarios administradores puedo tener?",
        answer: "Depende del plan. El plan básico incluye 1 administrador, el profesional hasta 3 y el empresarial es ilimitado.",
    },
    {
        question: "¿Se pueden cargar reservas de manera interna?",
        answer: "Sí, además de recibir reservas online, podés cargar turnos manualmente desde el panel para clientes que reservan por teléfono o en persona.",
    },
    {
        question: "¿Se pueden configurar precios especiales según día y horario?",
        answer: "Sí, podés configurar tarifas diferentes por día de la semana, horario o tipo de servicio para maximizar tu rentabilidad.",
    },
    {
        question: "¿Cuentan con capacitación y soporte?",
        answer: "¡Por supuesto! Ofrecemos capacitación inicial gratuita y soporte por WhatsApp y email para resolver cualquier duda.",
    },
];

const ClientFAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-200">
            <button
                className="w-full flex justify-between items-center py-6 px-2 text-left cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-slate-800 font-medium text-[17px] group-hover:text-orange-500 transition-colors">
                    {question}
                </span>
                <ChevronDown
                    className={`h-[22px] w-[22px] text-slate-400 transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-48 pb-6" : "max-h-0"
                    }`}
            >
                <p className="text-slate-500 px-2 leading-relaxed text-[15px]">{answer}</p>
            </div>
        </div>
    );
};

export const ClientFAQ = () => (
    <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12 md:mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                    Preguntas frecuentes
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto text-[16px] md:text-lg">
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
    <footer className="bg-[#0F172A] text-gray-300 py-16">
        <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-4">
                    <h1 className="text-orange-500 font-extrabold text-[26px]">OMTime</h1>
                    <p className="text-slate-500 text-[15px] leading-relaxed max-w-[280px]">
                        La plataforma completa de gestión de turnos para negocios. Automatizá,
                        organizá y crecé.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-white text-[15px] mb-6">Producto</h3>
                    <ul className="space-y-3.5 text-[15px]">
                        <li><a href="#" className="text-slate-500 hover:text-white transition-colors">Características</a></li>
                        <li><Link to="/plans" className="text-slate-500 hover:text-white transition-colors">Precios</Link></li>
                        <li><a href="#" className="text-slate-500 hover:text-white transition-colors">Tutoriales</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-white text-[15px] mb-6">Empresa</h3>
                    <ul className="space-y-3.5 text-[15px]">
                        <li><Link to="/about" className="text-slate-500 hover:text-white transition-colors">Sobre nosotros</Link></li>
                        <li><a href="#" className="text-slate-500 hover:text-white transition-colors">Blog</a></li>
                        <li><Link to="/support" className="text-slate-500 hover:text-white transition-colors">Contacto</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-white text-[15px] mb-6">Soporte</h3>
                    <ul className="space-y-3.5 text-[15px]">
                        <li><Link to="/support" className="text-slate-500 hover:text-white transition-colors">Centro de ayuda</Link></li>
                        <li><a href="#" className="text-slate-500 hover:text-white transition-colors">Estado del sistema</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-[14px]">
                <p className="text-slate-600">© 2026 OMTime. Todos los derechos reservados.</p>
                <div className="flex space-x-8 mt-6 md:mt-0">
                    <a href="#" className="text-slate-600 hover:text-white transition-colors">Términos</a>
                    <a href="#" className="text-slate-600 hover:text-white transition-colors">Privacidad</a>
                    <a href="#" className="text-slate-600 hover:text-white transition-colors">Cookies</a>
                </div>
            </div>
        </div>
    </footer>
);

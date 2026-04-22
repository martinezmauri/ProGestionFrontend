import { Card, CardContent } from "@ui/card";
import { ArrowRight, MapPin, Calendar, MessageCircle, ChevronDown, Search, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "@api/axiosInstance";
import { PropsBusiness } from "@api/getBusiness";

/* ─── FAQ Data ─── */
const faqData = [
    {
        question: "¿Cómo reservo un turno?",
        answer:
            "Es muy sencillo. Buscá el negocio que te interesa usando el buscador, elegí el servicio que necesitás, seleccioná quién te va a atender y el horario disponible. ¡Listo! Recibís la confirmación al instante.",
    },
    {
        question: "¿Necesito crear una cuenta para reservar?",
        answer:
            "Sí, necesitás registrarte con tu email o podés iniciar sesión con Google, Facebook o Apple. Esto nos permite enviarte la confirmación de tu turno y recordatorios.",
    },
    {
        question: "¿Puedo cancelar o reprogramar mi turno?",
        answer:
            "Sí, podés cancelar o reprogramar tu turno desde tu panel de usuario. Te recomendamos hacerlo con al menos 2 horas de anticipación para que el negocio pueda reorganizar su agenda.",
    },
    {
        question: "¿La confirmación del turno es automática?",
        answer:
            "Sí. Una vez que reservás, recibís una confirmación automática vía WhatsApp en tiempo real. El negocio también recibe la notificación para prepararse para tu visita.",
    },
    {
        question: "¿Cómo sé si mi turno fue confirmado?",
        answer:
            "Recibís una notificación por WhatsApp y también podés ver el estado de tu turno en la sección 'Mis turnos' dentro de tu perfil.",
    },
    {
        question: "¿OMTime es gratis para los usuarios?",
        answer:
            "¡Sí! Para los usuarios que reservan turnos, OMTime es completamente gratis. Solo los negocios pagan una suscripción mensual para usar la plataforma.",
    },
];

/* ─── FAQ Item ─── */
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200">
            <button
                className="w-full flex justify-between items-center py-5 px-1 text-left cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-slate-800 font-medium text-base group-hover:text-orange-500 transition-colors">
                    {question}
                </span>
                <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-48 pb-5" : "max-h-0"
                    }`}
            >
                <p className="text-slate-500 px-1 leading-relaxed text-[15px]">{answer}</p>
            </div>
        </div>
    );
};

/* ─── Section: Featured Establishments ─── */
const FeaturedEstablishments = () => {
    const [businesses, setBusinesses] = useState<PropsBusiness[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadBusinesses = async () => {
            try {
                const response = await api.get(`/api/v1/business/search`);
                if (Array.isArray(response.data)) {
                    setBusinesses(response.data.slice(0, 3));
                }
            } catch (err) {
                console.warn("No se pudieron cargar los negocios destacados:", err);
            }
        };
        loadBusinesses();
    }, []);

    const placeholders = [
        { name: "Peluquería Style", category: "Peluquería", location: "Palermo, Buenos Aires", color: "text-orange-500", gradientFrom: "from-sky-50", gradientTo: "to-orange-50" },
        { name: "Centro Dental Sonrisa", category: "Odontología", location: "Recoleta, Buenos Aires", color: "text-sky-600", gradientFrom: "from-green-50", gradientTo: "to-sky-50" },
        { name: "Spa & Bienestar Relax", category: "Spa", location: "Belgrano, Buenos Aires", color: "text-purple-500", gradientFrom: "from-orange-50", gradientTo: "to-pink-50" },
    ];

    const items = businesses.length > 0
        ? businesses.map((b, i) => ({
            id: b.id,
            name: b.name,
            category: b.category?.name || "Sin categoría",
            location: b.address ? `${b.address.city || ""}${b.address.province ? `, ${b.address.province}` : ""}` : "Sin ubicación",
            logo: b.logo,
            color: placeholders[i % 3].color,
            gradientFrom: placeholders[i % 3].gradientFrom,
            gradientTo: placeholders[i % 3].gradientTo,
        }))
        : placeholders.map((p, i) => ({ id: String(i), ...p, logo: null }));

    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
                        Establecimientos destacados
                    </h2>
                    <p className="text-slate-500 max-w-lg mx-auto text-base">
                        Descubrí los negocios que ya usan OMTime para gestionar sus turnos
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {items.map((place, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                        >
                            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white">
                                <div className={`h-40 bg-gradient-to-br ${place.gradientFrom} ${place.gradientTo} flex items-center justify-center relative`}>
                                    {place.logo ? (
                                        <img src={place.logo} alt={place.name} className="h-[72px] w-[72px] object-contain rounded-full shadow-sm" />
                                    ) : (
                                        <div className="w-[72px] h-[72px] rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] flex items-center justify-center">
                                            <span className={`text-3xl font-bold ${place.color}`}>
                                                {place.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 space-y-3">
                                    <h3 className="font-bold text-lg text-slate-800 group-hover:text-orange-500 transition-colors">
                                        {place.name}
                                    </h3>
                                    <div className="flex items-center text-slate-400 text-sm gap-1.5">
                                        <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                                        {place.location}
                                    </div>
                                    <button
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm"
                                        onClick={() => navigate(`/business/${place.id}`)}
                                    >
                                        Reservar turno
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ─── Section: How It Works ─── */
const HowItWorks = () => {
    const steps = [
        {
            icon: Search,
            title: "Buscá tu local",
            description: "Encontrá el establecimiento que necesitás por nombre, ubicación o categoría.",
            gradient: "from-sky-400 to-sky-600",
        },
        {
            icon: Calendar,
            title: "Elegí fecha y hora",
            description: "Seleccioná el profesional, el día y horario que mejor te convenga.",
            gradient: "from-orange-400 to-orange-600",
        },
        {
            icon: MessageCircle,
            title: "Confirmación por WhatsApp",
            description: "Recibí al instante la confirmación de tu turno vía WhatsApp, en tiempo real.",
            gradient: "from-green-400 to-green-600",
        },
    ];

    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-sky-50 to-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
                        ¿Cómo funciona?
                    </h2>
                    <p className="text-slate-500 max-w-lg mx-auto text-base">
                        Reservar tu turno es tan simple como contar hasta tres
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-b ${step.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                                <step.icon className="h-7 w-7 text-white" />
                            </div>
                            <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                                <span className="font-bold text-orange-500 text-[13px]">{index + 1}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-800">{step.title}</h3>
                            <p className="text-slate-500 leading-relaxed text-sm max-w-[260px]">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ─── Section: CTA for Business Owners ─── */
const CTABusiness = () => (
    <section className="py-16 md:py-20 bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white" />
            <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                <Sparkles className="h-10 w-10 text-white/60 mx-auto" />
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    ¿Querés probar OMTime en tu negocio?
                </h2>
                <p className="text-orange-50 max-w-xl mx-auto text-[17px] leading-relaxed">
                    Gestioná turnos, clientes y servicios desde una sola plataforma.
                    Empezá hoy y transformá la experiencia de tus clientes.
                </p>
                <div>
                    <Link
                        to="/para-negocios"
                        className="inline-flex items-center bg-white text-orange-500 hover:bg-orange-50 px-8 py-4 rounded-2xl font-bold text-[17px] shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all duration-300 gap-2"
                    >
                        Conocé más
                        <ArrowRight className="h-[18px] w-[18px]" />
                    </Link>
                </div>
            </motion.div>
        </div>
    </section>
);

/* ─── Section: FAQ ─── */
const FAQ = () => (
    <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10 md:mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
                    Preguntas frecuentes
                </h2>
                <p className="text-slate-500 max-w-lg mx-auto text-base">
                    Todo lo que necesitás saber sobre OMTime
                </p>
            </div>
            <div className="max-w-[800px] mx-auto">
                {faqData.map((faq, i) => (
                    <FAQItem key={i} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
    </section>
);

/* ─── Footer ─── */
const LandingFooter = () => (
    <footer className="bg-[#0F172A] text-gray-300 py-14">
        <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                <div className="space-y-3">
                    <h1 className="text-orange-500 font-extrabold text-2xl">OMTime</h1>
                    <p className="text-slate-500 text-[13px] leading-relaxed max-w-[280px]">
                        La solución completa para la gestión de turnos de tu negocio. Simple, rápido y
                        con confirmación automática por WhatsApp.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-white text-sm mb-4">Producto</h3>
                    <ul className="space-y-2.5 text-[13px]">
                        <li><a href="#" className="text-slate-500 hover:text-white transition-colors">Características</a></li>
                        <li><a href="#" className="text-slate-500 hover:text-white transition-colors">Precios</a></li>
                        <li><a href="#" className="text-slate-500 hover:text-white transition-colors">Tutoriales</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-white text-sm mb-4">Empresa</h3>
                    <ul className="space-y-2.5 text-[13px]">
                        <li><Link to="/about" className="text-slate-500 hover:text-white transition-colors">Sobre nosotros</Link></li>
                        <li><a href="#" className="text-slate-500 hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" className="text-slate-500 hover:text-white transition-colors">Contacto</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-white text-sm mb-4">Soporte</h3>
                    <ul className="space-y-2.5 text-[13px]">
                        <li><a href="#" className="text-slate-500 hover:text-white transition-colors">Centro de ayuda</a></li>
                        <li><a href="#" className="text-slate-500 hover:text-white transition-colors">Estado del sistema</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center text-[13px]">
                <p className="text-slate-600">© 2026 OMTime. Todos los derechos reservados.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="text-slate-600 hover:text-white transition-colors">Términos</a>
                    <a href="#" className="text-slate-600 hover:text-white transition-colors">Privacidad</a>
                    <a href="#" className="text-slate-600 hover:text-white transition-colors">Cookies</a>
                </div>
            </div>
        </div>
    </footer>
);

/* ─── Exports ─── */
export { FeaturedEstablishments, HowItWorks, CTABusiness, FAQ, LandingFooter };

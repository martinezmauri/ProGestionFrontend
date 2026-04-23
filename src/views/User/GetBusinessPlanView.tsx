import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { Check, Rocket, ArrowLeft } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@context/AuthContext";
import { UserMenu } from "@components/Navbars/UserMenu";

const plans = [
  {
    tier: "BASIC",
    name: "Básico",
    price: "$12.000",
    period: "/ mes",
    employees: "1 sucursal · hasta 3 empleados",
    features: [
      "Reservas online ilimitadas",
      "Confirmación por WhatsApp",
      "Página de reservas personalizada",
      "Reportes básicos",
      "Soporte por email",
    ],
    recommended: false,
    accent: "border-slate-200",
    btn: "outline" as const,
  },
  {
    tier: "PROFESSIONAL",
    name: "Estándar",
    price: "$22.000",
    period: "/ mes",
    employees: "Hasta 2 sucursales · 10 empleados",
    features: [
      "Todo lo del plan Básico",
      "Reportes avanzados",
      "Soporte WhatsApp y email",
      "Caja y stock",
      "Integración Mercado Pago",
    ],
    recommended: true,
    accent: "border-orange-400 ring-2 ring-orange-400/25",
    btn: "default" as const,
  },
  {
    tier: "ENTERPRISE",
    name: "Premium",
    price: "$38.000",
    period: "/ mes",
    employees: "Sucursales y empleados ilimitados",
    features: [
      "Todo lo del plan Estándar",
      "Caja y stock avanzado",
      "Multi-sucursal",
      "API personalizada",
      "Soporte prioritario 24/7",
    ],
    recommended: false,
    accent: "border-slate-200",
    btn: "outline" as const,
  },
];

export const GetBusinessPlanView = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSelectPlan = async (tier: string) => {
    setLoading(tier);
    try {
      // Intentar registrar el plan en el backend si está disponible
      try {
        const token = session?.access_token;
        await axios.post(
          `${import.meta.env.VITE_API_URL}/subscriptions/select`,
          { tier },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch {
        // El pago no está implementado aún — continuar igualmente
        console.info("Subscriptions endpoint not yet active, continuing to onboarding.");
      }

      const planName = plans.find((p) => p.tier === tier)?.name ?? tier;
      toast.success(`Plan ${planName} seleccionado. ¡Configuremos tu negocio!`);
      navigate("/onboarding/business");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-4 bg-white/80 backdrop-blur sticky top-0 z-50 border-b border-gray-100">
        <Link to="/" className="flex items-center gap-1">
          <span className="text-orange-500 text-2xl font-extrabold tracking-tight">OM</span>
          <span className="text-slate-800 text-2xl font-extrabold tracking-tight">Time</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <UserMenu />
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center pt-16 pb-10 px-6">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
          <Rocket className="w-3.5 h-3.5" />
          Software de gestión para tu negocio
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Elegí el plan que más te conviene
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Gestioná turnos, personal y reportes desde un solo lugar. Sin ataduras — cambiá de plan cuando quieras.
        </p>
      </section>

      {/* Plans */}
      <section className="flex-1 max-w-5xl w-full mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.tier}
              className={`relative flex flex-col transition-all duration-200 hover:shadow-lg ${plan.accent}`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                    Recomendado
                  </span>
                </div>
              )}

              <CardHeader className="text-center pt-8 pb-2">
                <CardTitle className="text-xl font-bold text-slate-800">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-xs text-slate-400 mt-1">
                  {plan.employees}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 text-center space-y-6 px-6">
                <div className="mt-2">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-slate-400 text-sm ml-1">{plan.period}</span>
                </div>

                <ul className="space-y-2.5 text-sm text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="px-6 pb-6 pt-4">
                <Button
                  className={`w-full font-semibold text-sm ${
                    plan.recommended
                      ? "bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white"
                      : ""
                  }`}
                  variant={plan.btn}
                  onClick={() => handleSelectPlan(plan.tier)}
                  disabled={loading !== null}
                >
                  {loading === plan.tier ? "Procesando..." : "Empezar con este plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="text-center text-slate-400 text-xs mt-10">
          Sin contrato de permanencia · Podés cambiar o cancelar tu plan en cualquier momento.
          <br />
          <span className="text-orange-400 font-medium">Los pagos se habilitarán próximamente.</span>
        </p>
      </section>
    </div>
  );
};

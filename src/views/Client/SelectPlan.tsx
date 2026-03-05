import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { Check } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@context/AuthContext";

export const SelectPlan = () => {
    const navigate = useNavigate();
    const { userId, login } = useAuth();
    const [loading, setLoading] = useState<string | null>(null);

    const plans = [
        {
            tier: "BASIC",
            name: "Básico",
            price: "$12.000 / mes",
            employees: "1 sucursal, hasta 3 empleados",
            features: ["Reservas online ilimitadas", "Confirmación por WhatsApp", "Página de reservas personalizada", "Reportes básicos", "Soporte por email"],
            recommended: false
        },
        {
            tier: "PROFESSIONAL",
            name: "Estándar",
            price: "$22.000 / mes",
            employees: "Hasta 2 sucursales, 10 empleados",
            features: ["Todo lo Básico", "Reportes avanzados", "Soporte WhatsApp y email", "Caja y stock", "Integración Mercado Pago"],
            recommended: true
        },
        {
            tier: "ENTERPRISE",
            name: "Premium",
            price: "$38.000 / mes",
            employees: "Sucursales y empleados ilimitados",
            features: ["Todo lo Estándar", "Caja y stock avanzado", "Multi-sucursal", "API personalizada", "Soporte prioritario 24/7"],
            recommended: false
        }
    ];

    const handleSelectPlan = async (tier: string) => {
        try {
            setLoading(tier);
            const token = localStorage.getItem("auth_data") ? JSON.parse(localStorage.getItem("auth_data")!).token : null;

            // The user wants to "pagarlo" directly and navigate
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/subscriptions/select`,
                { tier },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Re-fetch the new token with updated claims to be an ADMIN and have access:
            if (response.data && response.data.refreshedToken) {
                const refreshedToken = response.data.refreshedToken;
                // Update local storage and auth context automatically
                localStorage.setItem("auth_data", JSON.stringify({
                    token: refreshedToken,
                    usuario: { id: userId, token: refreshedToken } // Depending on how context consumes it, mostly token matters
                }));
                // Try logging in with the context to force re-evaluation
                if (userId) login(userId, refreshedToken);
            }

            toast.success("¡Plan seleccionado! Procedemos a configurar el local.");
            navigate("/onboarding/business");
        } catch (error) {
            console.error(error);
            toast.error("Ocurrió un error al seleccionar el plan");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Selecciona tu Plan</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Elige el plan que mejor se adapte a las necesidades de tu negocio. Puedes actualizar o cancelar en cualquier momento.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-4">
                {plans.map((plan) => (
                    <Card
                        key={plan.tier}
                        className={`relative flex flex-col transition-all duration-200 hover:shadow-md ${plan.recommended ? 'border-orange-500 shadow-md ring-1 ring-orange-500/20' : ''}`}
                    >
                        {plan.recommended && (
                            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0">
                                <span className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs font-semibold px-3 py-1 rounded-full px-2">
                                    Recomendado
                                </span>
                            </div>
                        )}
                        <CardHeader className="text-center pb-2">
                            <CardTitle className="text-xl">{plan.name}</CardTitle>
                            <CardDescription className="pt-1">{plan.employees}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 text-center space-y-6">
                            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
                                {plan.price}
                            </div>
                            <ul className="space-y-3 text-sm text-left px-2">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <Check className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                                        <span className="text-slate-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className={`w-full ${plan.recommended ? 'bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500' : ''}`}
                                variant={plan.recommended ? "default" : "outline"}
                                onClick={() => handleSelectPlan(plan.tier)}
                                disabled={loading !== null}
                            >
                                {loading === plan.tier ? "Procesando..." : "Seleccionar plan"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

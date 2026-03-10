import React, { useEffect, useState } from "react";
import { useAuth } from "@context/AuthContext";
import { AppHeader } from "@components/Header/AppHeader";
import { FooterSimple } from "@components/Footer/FooterSimple";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Users, Briefcase, CalendarCheck, TrendingUp, TrendingDown } from "lucide-react";
import { getEmployeesByBusinessId } from "@api/getEmployees";
import { getServiceByBusinessId } from "@api/getServices";
import { RefreshCw } from "lucide-react";

export const Statistics = () => {
    const { businessId, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);

    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalServices, setTotalServices] = useState(0);

    // Placeholder for future metrics
    const [totalAppointments] = useState(0);

    const loadData = async () => {
        if (!businessId) return;
        setLoading(true);
        try {
            const [employees, services] = await Promise.all([
                getEmployeesByBusinessId(businessId),
                getServiceByBusinessId(businessId)
            ]);

            if (employees) setTotalEmployees(employees.length);
            if (services) setTotalServices(services.length);
        } catch (error) {
            console.error("Error cargando estadísticas", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && businessId) {
            loadData();
        }
    }, [isAuthenticated, businessId]);

    const stats = [
        {
            title: "Total Empleados",
            value: totalEmployees.toString(),
            icon: Users,
            description: "Registrados en la sucursal",
            trend: "+2%",
            trendUp: true,
            color: "text-blue-600",
            bg: "bg-blue-100",
        },
        {
            title: "Total Servicios",
            value: totalServices.toString(),
            icon: Briefcase,
            description: "Ofrecidos actualmente",
            trend: "+0%",
            trendUp: true,
            color: "text-orange-600",
            bg: "bg-orange-100",
        },
        {
            title: "Próximos Turnos",
            value: totalAppointments.toString(),
            icon: CalendarCheck,
            description: "Métrica en desarrollo",
            trend: "N/A",
            trendUp: false,
            color: "text-sky-600",
            bg: "bg-sky-100",
        }
    ];

    if (loading) {
        return (
            <div className="flex flex-col flex-1 items-center justify-center min-h-[50vh]">
                <RefreshCw className="w-8 h-8 text-orange-500 animate-spin mb-3" />
                <p className="text-slate-600 font-medium">Calculando estadísticas...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 w-full animate-in fade-in duration-500">
            <div className="flex-1 p-6 md:p-10 space-y-6 w-full max-w-7xl mx-auto">
                <AppHeader title="Estadísticas de Negocio" />
                <p className="text-slate-500 text-base mb-8">
                    Resumen general del rendimiento de tu negocio.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                                            <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                                        </div>
                                        <div className={`p-4 rounded-xl ${stat.bg}`}>
                                            <Icon className={`w-6 h-6 ${stat.color}`} />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center text-sm">
                                        {stat.trend !== "N/A" && (
                                            <span className={`flex items-center font-medium mr-2 ${stat.trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
                                                {stat.trendUp ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                                                {stat.trend}
                                            </span>
                                        )}
                                        <span className="text-slate-400">{stat.description}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Placeholder para gráfico futuro */}
                <div className="mt-8">
                    <Card className="border-0 shadow-sm">
                        <CardHeader className="border-b bg-slate-50/50">
                            <CardTitle className="text-lg font-semibold text-slate-700">Rendimiento Mensual (Próximamente)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-slate-200 mt-6 mx-6 mb-6 rounded-xl bg-slate-50">
                            <TrendingUp className="w-12 h-12 text-slate-300 mb-4" />
                            <h3 className="text-slate-600 font-medium text-lg">Gráficos Detallados en Desarrollo</h3>
                            <p className="text-slate-400 text-center max-w-md mt-2">
                                Próximamente podrás visualizar el rendimiento de tus servicios, ganancias generadas y horas más populares.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <FooterSimple />
        </div>
    );
};

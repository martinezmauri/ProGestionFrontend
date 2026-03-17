import React, { useState } from "react";
import {
    Calendar, Check, X, Clock, User, ChevronLeft, ChevronRight, Filter
} from "lucide-react";
import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Badge } from "@ui/badge";
import { Avatar, AvatarFallback } from "@ui/avatar";

// Mock Data for the UI
const pendingRequests = [
    { id: 1, client: "María González", service: "Corte de Pelo", professional: "Ana García", date: "Hoy", time: "15:00", duration: "45 min" },
    { id: 2, client: "Juan Pérez", service: "Coloración", professional: "Carlos López", date: "Mañana", time: "10:30", duration: "90 min" },
    { id: 3, client: "Laura Martínez", service: "Manicura semi", professional: "Sofía Ruiz", date: "25 Oct", time: "16:15", duration: "30 min" },
];

const confirmedAppointments = [
    { id: 4, client: "Roberto Sánchez", service: "Corte Clásico", professional: "Ana García", time: "09:00", duration: 45, status: "confirmed" },
    { id: 5, client: "Elena Valdés", service: "Balayage", professional: "Carlos López", time: "11:00", duration: 120, status: "confirmed" },
    { id: 6, client: "Martín Gómez", service: "Perfilado de Barba", professional: "Ana García", time: "13:30", duration: 30, status: "confirmed" },
];

export const AgendaMaster = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Generate grid hours array (08:00 to 20:00)
    const hours = Array.from({ length: 13 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);

    return (
        <div className="flex h-full flex-col md:flex-row bg-slate-50 relative">
            {/* Main Calendar Area */}
            <div className="flex-1 flex flex-col p-6 overflow-hidden">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Agenda Master</h1>
                        <p className="text-slate-500 text-sm">Gestiona todos los turnos y profesionales</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center bg-white rounded-lg p-1 shadow-sm border border-slate-200">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="font-semibold text-sm px-4 text-slate-700">
                                {currentDate.toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}
                            </span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button variant="outline" className="bg-white hover:bg-slate-50">
                            <Filter className="h-4 w-4 mr-2" />
                            Filtrar
                        </Button>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                            <Calendar className="h-4 w-4 mr-2" />
                            Hoy
                        </Button>
                    </div>
                </div>

                {/* Master Calendar Grid */}
                <Card className="flex-1 shadow-md border-0 bg-white overflow-hidden flex flex-col">
                    <div className="grid grid-cols-[100px_1fr_1fr] border-b border-slate-200 bg-slate-50 sticky top-0 z-10">
                        <div className="py-4 px-2 border-r border-slate-200 text-center font-medium text-slate-500 text-sm">
                            Horario
                        </div>
                        {/* Professional Columns */}
                        <div className="py-4 border-r border-slate-200 text-center">
                            <p className="font-bold text-slate-800">Ana García</p>
                            <p className="text-xs text-sky-600 font-medium">Peluquería</p>
                        </div>
                        <div className="py-4 text-center">
                            <p className="font-bold text-slate-800">Carlos López</p>
                            <p className="text-xs text-sky-600 font-medium">Colorista</p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto relative">
                        {hours.map((hour) => (
                            <div key={hour} className="grid grid-cols-[100px_1fr_1fr] group border-b border-slate-100">
                                <div className="py-3 px-2 border-r border-slate-200 text-center text-sm font-medium text-slate-400">
                                    {hour}
                                </div>
                                {/* Grid cells */}
                                <div className="border-r border-slate-100 relative p-1 min-h-[60px] group-hover:bg-slate-50/50 transition-colors">
                                    {confirmedAppointments.filter(a => a.professional === "Ana García" && a.time === hour).map((appt) => (
                                        <div key={appt.id} className="absolute left-2 right-2 top-2 bg-sky-100 border-l-4 border-sky-500 rounded p-2 shadow-sm z-10 cursor-pointer hover:bg-sky-200 transition-colors">
                                            <p className="text-xs font-bold text-sky-900 truncate">{appt.client}</p>
                                            <p className="text-[10px] text-sky-700 truncate">{appt.service} ({appt.duration}m)</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="relative p-1 min-h-[60px] group-hover:bg-slate-50/50 transition-colors">
                                    {confirmedAppointments.filter(a => a.professional === "Carlos López" && a.time === hour).map((appt) => (
                                        <div key={appt.id} className="absolute left-2 right-2 top-2 bg-emerald-100 border-l-4 border-emerald-500 rounded p-2 shadow-sm z-10 cursor-pointer hover:bg-emerald-200 transition-colors">
                                            <p className="text-xs font-bold text-emerald-900 truncate">{appt.client}</p>
                                            <p className="text-[10px] text-emerald-700 truncate">{appt.service} ({appt.duration}m)</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Pending Requests Sidebar */}
            <div className="w-full md:w-80 bg-white border-l border-slate-200 shadow-[-4px_0_24px_-10px_rgba(0,0,0,0.05)] flex flex-col z-20 h-full">
                <div className="p-5 border-b border-slate-100 bg-orange-50/50">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="font-bold text-slate-800 flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-orange-500" />
                            Solicitudes Pendientes
                        </h2>
                        <Badge className="bg-orange-500 text-white font-bold">{pendingRequests.length}</Badge>
                    </div>
                    <p className="text-xs text-slate-500">Requieren tu aprobación</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {pendingRequests.map((req) => (
                        <Card key={req.id} className="border-0 shadow-sm bg-slate-50 ring-1 ring-slate-200 overflow-hidden hover:ring-sky-300 transition-all border-l-4 border-l-orange-400">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center">
                                        <Avatar className="h-8 w-8 mr-2 ring-2 ring-white shadow-sm">
                                            <AvatarFallback className="bg-sky-100 text-sky-700 text-xs font-bold">
                                                {req.client.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800 leading-none">{req.client}</p>
                                            <p className="text-[11px] text-slate-500 mt-1">{req.service}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded p-2 mb-3 border border-slate-100">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-slate-500 flex items-center"><User className="w-3 h-3 mr-1" /> Profesional:</span>
                                        <span className="font-semibold text-slate-700">{req.professional}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500 flex items-center"><Calendar className="w-3 h-3 mr-1" /> Fecha/Hora:</span>
                                        <span className="font-semibold text-sky-600">{req.date} - {req.time}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button variant="outline" className="flex-1 h-8 text-xs bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">
                                        <Check className="w-3 h-3 mr-1" />
                                        Aprobar
                                    </Button>
                                    <Button variant="outline" className="flex-1 h-8 text-xs bg-white text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700">
                                        <X className="w-3 h-3 mr-1" />
                                        Rechazar
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {pendingRequests.length === 0 && (
                        <div className="text-center py-10">
                            <Check className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                            <p className="text-slate-500 font-medium">No hay solicitudes pendientes</p>
                            <p className="text-xs text-slate-400 mt-1">Has respondido a todas las peticiones.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

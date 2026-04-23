import React, { useMemo, useState } from "react";
import {
    Calendar, Check, X, Clock, User, ChevronLeft, ChevronRight, Filter, Plus, Home
} from "lucide-react";
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import { Badge } from "@ui/badge";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { useAgenda } from "../../hooks/useAgenda";
import { useAuth } from "../../context/AuthContext";
import { format, addDays, subDays, startOfWeek, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { ManualAppointmentModal } from "./components/ManualAppointmentModal";
import { AppointmentCard } from "./components/AppointmentCard";
import { AppointmentDetailModal } from "./components/AppointmentDetailModal";
import { IAppointment } from "@interfaces/IAppointment";

export const AgendaMaster = () => {
    const { userProfile } = useAuth();
    const businessId = userProfile?.businessId ?? null;
    const {
        selectedDate,
        setSelectedDate,
        employees,
        appointments,
        businessHours,
        loading,
        isModalOpen,
        setIsModalOpen,
        selectedSlot,
        handleSlotClick,
        refreshAgenda,
        approveAppointment,
        rejectAppointment,
        deleteAppointment
    } = useAgenda(Number(businessId));

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);

    // Generate 7 days of the week starting from Monday
    const weekDays = useMemo(() => {
        const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
        return Array.from({ length: 7 }, (_, i) => addDays(start, i));
    }, [selectedDate]);

    // Generate grid hours
    const hours = useMemo(() => {
        let start = 8;
        let end = 20;

        if (businessHours.length > 0) {
            const starts = businessHours
                .filter(h => h.isWorkingDay && h.morningStart)
                .map(h => parseInt(h.morningStart!.split(":")[0]));
            const ends = businessHours
                .filter(h => h.isWorkingDay && (h.afternoonEnd || h.morningEnd))
                .map(h => {
                    const time = h.afternoonEnd || h.morningEnd;
                    return parseInt(time!.split(":")[0]);
                });

            if (starts.length > 0) start = Math.min(...starts);
            if (ends.length > 0) end = Math.max(...ends) + 1;
        }

        const slots: string[] = [];
        for (let h = start; h < end; h++) {
            const hStr = h.toString().padStart(2, '0');
            slots.push(`${hStr}:00`);
            slots.push(`${hStr}:30`);
        }
        return slots;
    }, [businessHours]);

    const pendingRequests = appointments.filter(a => a.status === "PENDING" || a.status === "PENDING_CONFIRMATION");

    const handleOpenDetail = (appt: IAppointment) => {
        setSelectedAppointment(appt);
        setIsDetailModalOpen(true);
    };

    return (
        <div className="flex h-screen flex-col md:flex-row bg-slate-50 overflow-hidden">
            <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden md:min-w-0">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg text-orange-600 shadow-sm border border-orange-200/50">
                           <Home className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Agenda Semanal</h1>
                            <p className="text-slate-500 text-xs md:text-sm font-medium">Control total sobre tus turnos y profesionales</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto">
                        <div className="flex items-center bg-white rounded-2xl p-1 shadow-sm border border-slate-200 overflow-hidden ring-1 ring-slate-100">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-9 w-9 text-slate-500 hover:bg-slate-50 rounded-xl"
                                onClick={() => setSelectedDate(subDays(selectedDate, 7))}
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <span className="font-bold text-xs md:text-sm px-2 md:px-4 text-slate-700 min-w-[140px] md:min-w-[200px] text-center capitalize">
                                {format(weekDays[0], "d MMM", { locale: es })} - {format(weekDays[6], "d MMM yyyy", { locale: es })}
                            </span>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-9 w-9 text-slate-500 hover:bg-slate-50 rounded-xl"
                                onClick={() => setSelectedDate(addDays(selectedDate, 7))}
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </div>
                        <Button 
                            variant="outline" 
                            className="bg-white hover:bg-slate-50 hidden sm:flex border-slate-200 shadow-sm rounded-xl font-bold h-11"
                            onClick={() => setSelectedDate(new Date())}
                        >
                            <Calendar className="h-4 w-4 mr-2 text-sky-500" />
                            Hoy
                        </Button>
                    </div>
                </div>

                {/* Master Calendar Grid */}
                <Card className="flex-1 shadow-2xl border-0 bg-white overflow-hidden flex flex-col ring-1 ring-slate-200 rounded-[2rem] hidden md:flex">
                    {/* Grid Header */}
                    <div 
                        className="grid border-b border-slate-100 bg-slate-50/50 backdrop-blur-md sticky top-0 z-20"
                        style={{ gridTemplateColumns: `80px repeat(7, 1fr)` }}
                    >
                        <div className="py-5 px-2 border-r border-slate-100 text-center font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] flex items-center justify-center">
                            Hora
                        </div>
                        {weekDays.map(day => (
                            <div key={day.toISOString()} className={`py-4 border-r border-slate-100 text-center last:border-r-0 ${isSameDay(day, new Date()) ? "bg-sky-50/30" : ""}`}>
                                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">
                                    {format(day, "EEEE", { locale: es })}
                                </p>
                                <p className={`text-xl font-black ${isSameDay(day, new Date()) ? "text-sky-600" : "text-slate-800"}`}>
                                    {format(day, "d")}
                                </p>
                                {businessHours.find(h => h.dayOfWeek === (day.getDay() === 0 ? 0 : day.getDay()))?.isWorkingDay === false && (
                                    <Badge variant="secondary" className="text-[8px] h-4 py-0 bg-slate-200/50 text-slate-500 border-0 font-black">Cerrado</Badge>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Grid Body */}
                    <div className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-slate-200">
                        {loading && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-30 transition-all">
                                <div className="flex flex-col items-center bg-white px-8 py-6 rounded-3xl shadow-2xl border border-slate-100">
                                    <div className="relative">
                                         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 opacity-20"></div>
                                         <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-600 absolute top-0 left-0"></div>
                                    </div>
                                    <p className="mt-4 text-xs font-black text-slate-500 uppercase tracking-widest">Sincronizando...</p>
                                </div>
                            </div>
                        )}
                        
                        {hours.map((hour) => (
                            <div 
                                key={hour} 
                                className="grid border-b border-slate-50 min-h-[90px]"
                                style={{ gridTemplateColumns: `80px repeat(7, 1fr)` }}
                            >
                                <div className="py-4 px-2 border-r border-slate-50 text-center text-[11px] font-black text-slate-400 bg-slate-50/20 flex items-start justify-center">
                                    <span className="mt-1 sticky top-20">{hour}</span>
                                </div>
                                
                                {weekDays.map(day => {
                                    const dayStr = format(day, "yyyy-MM-dd");
                                    const dayHours = businessHours.find(h => h.dayOfWeek === (day.getDay() === 0 ? 0 : day.getDay()));
                                    const isClosed = dayHours?.isWorkingDay === false;

                                    const slotAppts = appointments.filter(a => 
                                        a.appointmentDate === dayStr && 
                                        a.startTime.startsWith(hour) && 
                                        a.status !== "REJECTED" && 
                                        a.status !== "CANCELLED"
                                    );

                                    return (
                                        <div 
                                            key={`${dayStr}-${hour}`} 
                                            className={`
                                                border-r border-slate-50 relative p-2 transition-all last:border-r-0
                                                ${isClosed ? 'bg-slate-50/80 cursor-not-allowed' : 'hover:bg-slate-50/50 cursor-pointer group/slot'}
                                            `}
                                            onClick={(e) => {
                                                if (isClosed) return;
                                                // Only click if clicking the background or the + button
                                                if ((e.target as HTMLElement).closest('.appt-card')) return;
                                                handleSlotClick(hour, Number(employees[0]?.id) || 0, employees[0]?.name || "", day);
                                            }}
                                        >
                                            {/* Plus Button for Multi-booking Creation */}
                                            {!isClosed && (
                                                <button 
                                                    className="absolute top-1 right-1 w-6 h-6 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center 
                                                               opacity-0 group-hover/slot:opacity-100 hover:bg-sky-50 transition-all z-20 group-hover/slot:scale-110"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSlotClick(hour, Number(employees[0]?.id) || 0, employees[0]?.name || "", day);
                                                    }}
                                                >
                                                    <Plus className="w-3.5 h-3.5 text-sky-500" />
                                                </button>
                                            )}

                                            {isClosed && hour === hours[Math.floor(hours.length/2)] && (
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] rotate-[-45deg] whitespace-nowrap">Cerrado</span>
                                                </div>
                                            )}

                                            <div className="space-y-1 relative z-10">
                                                {slotAppts.map(appt => (
                                                    <div key={appt.id} className="appt-card">
                                                        <AppointmentCard 
                                                            appointment={appt} 
                                                            onDelete={deleteAppointment} 
                                                            onClick={handleOpenDetail}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Mobile View */}
                <div className="md:hidden flex-1 overflow-y-auto space-y-4">
                    <div className="bg-orange-50/50 p-5 rounded-3xl border border-orange-100 shadow-sm">
                         <h3 className="font-black text-orange-800 text-lg flex items-center tracking-tight mb-1">
                             <Clock className="w-5 h-5 mr-3 text-orange-500" />
                             Peticiones
                         </h3>
                         <p className="text-orange-600 text-xs font-bold">{pendingRequests.length} turnos por confirmar</p>
                    </div>
                    <div className="space-y-3">
                        {pendingRequests.map((req) => (
                            <PendingRequestItem 
                                key={req.id} 
                                req={req} 
                                onApprove={approveAppointment} 
                                onReject={rejectAppointment} 
                            />
                        ))}
                    </div>
                    {pendingRequests.length === 0 && (
                        <div className="text-center py-24 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
                             <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Check className="w-8 h-8 text-emerald-400" />
                             </div>
                             <p className="text-slate-600 font-black tracking-tight">Agenda despejada</p>
                             <p className="text-slate-400 text-xs mt-1 px-12 leading-relaxed">No tienes solicitudes pendientes de revisión.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar Desktop */}
            <div className="hidden md:flex w-80 bg-white border-l border-slate-200 shadow-2xl flex-col z-20 h-full">
                <div className="p-7 border-b border-slate-100 bg-slate-50/30">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-black text-slate-800 flex items-center text-sm md:text-base tracking-tight">
                            <Clock className="w-4 h-4 mr-2 text-orange-500" />
                            Turnos Pendientes
                        </h2>
                        <Badge className="bg-orange-500 text-white font-black px-2 shadow-md ring-4 ring-white">{pendingRequests.length}</Badge>
                    </div>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Incoming Requests</p>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/10 scrollbar-thin scrollbar-thumb-slate-100">
                    {pendingRequests.map((req) => (
                        <PendingRequestItem 
                            key={req.id} 
                            req={req} 
                            onApprove={approveAppointment} 
                            onReject={rejectAppointment} 
                        />
                    ))}

                    {pendingRequests.length === 0 && (
                        <div className="text-center py-20 px-8">
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-slate-50 group">
                                <Check className="w-10 h-10 text-emerald-400 group-hover:scale-110 transition-transform" />
                            </div>
                            <p className="text-slate-700 font-extrabold text-sm mb-2">¡Todo al día!</p>
                            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">No hay nuevos turnos esperando tu aprobación en este momento.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {businessId && (
                <ManualAppointmentModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    selectedSlot={selectedSlot}
                    businessId={Number(businessId)}
                    onSuccess={refreshAgenda}
                />
            )}

            <AppointmentDetailModal 
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                appointment={selectedAppointment}
                onDelete={deleteAppointment}
            />
        </div>
    );
};

const PendingRequestItem = ({ req, onApprove, onReject }: { 
    req: any, 
    onApprove: (id: number) => void, 
    onReject: (id: number) => void 
}) => (
    <Card className="border-0 shadow-lg bg-white ring-1 ring-slate-200 overflow-hidden hover:shadow-xl transition-all border-l-[6px] border-l-orange-400 rounded-2xl group/card">
        <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3 ring-4 ring-orange-50 shadow-sm border border-orange-100">
                        <AvatarFallback className="bg-gradient-to-br from-orange-100 to-orange-50 text-orange-700 text-xs font-black">
                            {(req.clientName || req.userName || "U").split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-black text-slate-800 leading-none truncate max-w-[120px]">{req.clientName || req.userName}</p>
                            {req.status === 'PENDING_CONFIRMATION' && (
                                <Badge className="bg-rose-500 text-[8px] h-3 px-1.5 font-black animate-pulse">NUEVO</Badge>
                            )}
                        </div>
                        <Badge variant="secondary" className="text-[9px] h-4 leading-none bg-sky-50 text-sky-700 border-0 py-0 font-black">{req.serviceName}</Badge>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50/80 rounded-xl p-3 mb-4 space-y-2 border border-slate-100/50">
                <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400 flex items-center font-bold uppercase tracking-widest"><User className="w-2.5 h-2.5 mr-1" /> Profesional</span>
                    <span className="font-black text-slate-700">{req.employeeName}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400 flex items-center font-bold uppercase tracking-widest"><Calendar className="w-2.5 h-2.5 mr-1" /> Agenda</span>
                    <span className="font-black text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded text-[9px]">{format(new Date(req.appointmentDate), "dd MMM")} • {req.startTime}h</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button 
                    onClick={() => onApprove(req.id)}
                    className="flex-1 h-10 text-[10px] font-black bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-100 transition-all active:scale-95 rounded-xl"
                >
                    <Check className="w-3.5 h-3.5 mr-1.5" />
                    APROBAR
                </Button>
                <Button 
                    variant="outline" 
                    onClick={() => onReject(req.id)}
                    className="flex-1 h-10 text-[10px] font-bold text-slate-400 border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all active:scale-95 rounded-xl"
                >
                    <X className="w-3.5 h-3.5 mr-1.5" />
                    RECHAZAR
                </Button>
            </div>
        </CardContent>
    </Card>
);

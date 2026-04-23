import React from "react";
import { IAppointment } from "../../../interfaces/IAppointment";
import { format } from "date-fns";
import { 
    Clock, User, Phone, CheckCircle, AlertCircle, Trash2, Info
} from "lucide-react";
import { Badge } from "@ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@ui/tooltip";
import { getServiceColor } from "../../../utils/colorUtils";

interface AppointmentCardProps {
    appointment: IAppointment;
    onDelete: (id: number) => void;
    onClick?: (appointment: IAppointment) => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
    appointment, 
    onDelete,
    onClick 
}) => {
    const isPending = appointment.status === "PENDING" || appointment.status === "PENDING_CONFIRMATION";
    
    // Get dynamic color based on service name + date
    const colors = getServiceColor(appointment.serviceName || "Servicio", appointment.appointmentDate);

    const handleCardClick = (e: React.MouseEvent) => {
        // Prevent click if clicking the delete icon
        if ((e.target as HTMLElement).closest('.delete-btn')) return;
        if (onClick) onClick(appointment);
    };

    return (
        <TooltipProvider>
            <div 
                onClick={handleCardClick}
                className={`
                    group/card relative rounded-lg p-2.5 transition-all cursor-pointer
                    border-l-4 shadow-sm opacity-90 hover:opacity-100 hover:scale-105 hover:shadow-md
                    ${colors.bg} ${colors.border} ${colors.shadow}
                `}
            >
                <div className="flex justify-between items-start mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-tight ${colors.text}`}>
                        {appointment.startTime}h
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                         <button 
                            onClick={() => onDelete(appointment.id)}
                            className="delete-btn p-1 bg-white/50 hover:bg-rose-100 rounded text-rose-600 transition-colors"
                         >
                            <Trash2 className="w-3 h-3" />
                         </button>
                    </div>
                </div>

                <div className="space-y-0.5">
                    <p className="text-[11px] font-bold text-slate-800 leading-tight truncate">
                         {appointment.clientName || appointment.userName || "Sin Nombre"}
                    </p>
                    <p className="text-[9px] font-medium text-slate-600 truncate opacity-80">
                         {appointment.serviceName}
                    </p>
                </div>

                {/* Info Tooltip */}
                <div className="absolute bottom-1 right-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="bg-white/40 p-0.5 rounded cursor-help">
                                <Info className={`w-3 h-3 ${colors.text}`} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent className="p-3 bg-white/95 backdrop-blur-sm border shadow-xl max-w-xs z-[100]">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 border-b pb-1">
                                    <Badge variant={isPending ? "outline" : "default"} className={isPending ? "bg-orange-50 text-orange-600" : "bg-emerald-50 text-emerald-600 border-emerald-100"}>
                                        {isPending ? "Pendiente" : "Confirmado"}
                                    </Badge>
                                    <span className="text-[10px] font-bold text-slate-400">ID: #{appointment.id}</span>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-1.5 pt-1">
                                    <div className="flex items-center text-xs">
                                        <User className="w-3.5 h-3.5 mr-2 text-slate-400" />
                                        <span className="font-bold text-slate-700">{appointment.clientName || appointment.userName}</span>
                                    </div>
                                    <div className="flex items-center text-xs">
                                        <Phone className="w-3.5 h-3.5 mr-2 text-slate-400" />
                                        <span className="text-slate-600">{appointment.clientPhone || "Sin teléfono"}</span>
                                    </div>
                                    <div className="flex items-center text-xs">
                                        <Clock className="w-3.5 h-3.5 mr-2 text-slate-400" />
                                        <span className="text-slate-600">{appointment.startTime} - {appointment.endTime}</span>
                                    </div>
                                </div>
                                {appointment.notes && (
                                    <div className="mt-2 text-[10px] bg-slate-50 p-2 rounded-md border text-slate-500 italic leading-snug">
                                        "{appointment.notes}"
                                    </div>
                                )}
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    );
};

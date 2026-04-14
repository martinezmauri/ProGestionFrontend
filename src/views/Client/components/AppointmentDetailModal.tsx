import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@ui/dialog";
import { Button } from "@ui/button";
import { IAppointment } from "../../../interfaces/IAppointment";
import { format } from "date-fns";
import { 
    Clock, User, Phone, Mail, Scissors, FileText, Calendar, Trash2, Edit 
} from "lucide-react";
import { Badge } from "@ui/badge";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    appointment: IAppointment | null;
    onDelete: (id: number) => void;
}

export const AppointmentDetailModal = ({ isOpen, onClose, appointment, onDelete }: Props) => {
    if (!appointment) return null;

    const isPending = appointment.status === "PENDING";

    const handleDelete = () => {
        if (window.confirm("¿Estás seguro de que quieres cancelar este turno?")) {
            onDelete(appointment.id);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px] bg-white border-0 shadow-2xl rounded-2xl overflow-hidden">
                <div className={`h-2 w-full absolute top-0 left-0 ${isPending ? 'bg-orange-400' : 'bg-emerald-400'}`} />
                
                <DialogHeader className="pt-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <DialogTitle className="text-2xl font-black text-slate-800 tracking-tight">
                                Detalle del Turno
                            </DialogTitle>
                            <DialogDescription className="text-slate-500 font-medium">
                                Revisión de información de la reserva
                            </DialogDescription>
                        </div>
                        <Badge variant={isPending ? "outline" : "default"} className={`px-3 py-1 rounded-full font-bold ${isPending ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"}`}>
                            {isPending ? "PENDIENTE" : "CONFIRMADO"}
                        </Badge>
                    </div>
                </DialogHeader>

                <div className="space-y-6 py-6">
                    {/* Main Info Card */}
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4 shadow-inner">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border shadow-sm text-sky-500">
                                <User className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Cliente</p>
                                <h4 className="text-xl font-black text-slate-800">{appointment.clientName || appointment.userName || "Invitado"}</h4>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                             <div className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                                    <Phone className="w-2.5 h-2.5" /> Teléfono
                                </span>
                                <p className="text-sm font-bold text-slate-700">{appointment.clientPhone || "No especificado"}</p>
                             </div>
                             <div className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                                    <Mail className="w-2.5 h-2.5" /> Email
                                </span>
                                <p className="text-sm font-bold text-slate-700 truncate">{appointment.clientEmail || "No especificado"}</p>
                             </div>
                        </div>
                    </div>

                    {/* Service & Time Details */}
                    <div className="grid grid-cols-1 gap-4 px-1">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-sky-50 rounded-lg text-sky-600">
                                <Scissors className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Servicio contratado</p>
                                <p className="text-base font-bold text-slate-700">{appointment.serviceName}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Fecha y Horario</p>
                                <p className="text-base font-bold text-slate-700">
                                    {format(new Date(appointment.appointmentDate), "EEEE d 'de' MMMM", { locale: import("date-fns/locale/es") as any })}
                                </p>
                                <p className="text-sky-600 font-black text-lg leading-tight">
                                    {appointment.startTime} - {appointment.endTime}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Profesional asignado</p>
                                <p className="text-base font-bold text-slate-700">{appointment.employeeName}</p>
                            </div>
                        </div>

                        {appointment.notes && (
                            <div className="mt-2 p-4 bg-yellow-50/50 rounded-2xl border border-yellow-100/50 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                    <FileText className="w-10 h-10" />
                                </div>
                                <p className="text-xs font-black text-yellow-700/60 uppercase mb-1">Notas de la reserva</p>
                                <p className="text-slate-600 text-sm italic leading-relaxed">"{appointment.notes}"</p>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-slate-100 px-0">
                    <Button 
                        variant="destructive" 
                        onClick={handleDelete}
                        className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold h-11 rounded-xl"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Cancelar Turno
                    </Button>
                    <Button 
                        variant="outline" 
                        className="flex-1 h-11 rounded-xl font-bold border-slate-200 text-slate-600 hover:bg-slate-50"
                        onClick={() => alert("Función de edición próximamente")}
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

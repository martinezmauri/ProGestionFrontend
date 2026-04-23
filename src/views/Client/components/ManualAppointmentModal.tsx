import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@ui/dialog";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Textarea } from "@ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@ui/select";
import { getServiceByBusinessId } from "@api/getServices";
import { createManualAppointment } from "@api/getAppointments";
import { IService } from "@interfaces/IService";
import { toast } from "sonner";
import { Loader2, User, Phone, Mail, Scissors, FileText } from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    selectedSlot: {
        startTime: string;
        appointmentDate: string;
        employeeId: number;
        employeeName: string;
    } | null;
    businessId: number;
    onSuccess: () => void;
}

export const ManualAppointmentModal = ({ isOpen, onClose, selectedSlot, businessId, onSuccess }: Props) => {
    const [services, setServices] = useState<IService[]>([]);
    const [loadingServices, setLoadingServices] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        clientName: "",
        clientPhone: "",
        clientEmail: "",
        serviceId: "",
        notes: ""
    });

    useEffect(() => {
        if (isOpen) {
            fetchServices();
            // Reset form
            setFormData({
                clientName: "",
                clientPhone: "",
                clientEmail: "",
                serviceId: "",
                notes: ""
            });
        }
    }, [isOpen]);

    const fetchServices = async () => {
        setLoadingServices(true);
        try {
            const data = await getServiceByBusinessId(businessId.toString());
            if (data) setServices(data);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoadingServices(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSlot || !businessId) return;

        if (!formData.clientName || !formData.clientPhone || !formData.serviceId) {
            toast.error("Por favor completa los campos obligatorios");
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                appointmentDate: selectedSlot.appointmentDate,
                startTime: selectedSlot.startTime,
                businessId: businessId,
                employeeId: selectedSlot.employeeId,
                serviceId: Number(formData.serviceId),
                clientName: formData.clientName,
                clientPhone: formData.clientPhone,
                clientEmail: formData.clientEmail,
                notes: formData.notes,
                status: "APPROVED" // Manual creation by admin is auto-approved
            };

            const result = await createManualAppointment(payload);
            if (result) {
                toast.success("Cita agendada correctamente");
                onSuccess();
                onClose();
            } else {
                // Si el resultado es null, es probable que haya fallado la validación
                toast.error("No se pudo agendar el turno. Revisa la disponibilidad.");
            }
        } catch (error: any) {
            console.error("Error creating manual appointment:", error);
            const errorMessage = error.response?.data || "Error inesperado al agendar";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold text-slate-800">
                        Nuevo Turno Manual
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 text-sm">
                        Agendando para <span className="font-semibold text-sky-600">{selectedSlot?.employeeName}</span> a las <span className="font-semibold text-sky-600">{selectedSlot?.startTime}</span>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="clientName" className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            Nombre del Cliente <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            id="clientName"
                            placeholder="Ej. Juan Pérez"
                            value={formData.clientName}
                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                            className="bg-slate-50 border-slate-200"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="clientPhone" className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                Teléfono <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                                id="clientPhone"
                                placeholder="11 2233 4455"
                                value={formData.clientPhone}
                                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                                className="bg-slate-50 border-slate-200"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clientEmail" className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                Email
                            </Label>
                            <Input
                                id="clientEmail"
                                type="email"
                                placeholder="opcional@mail.com"
                                value={formData.clientEmail}
                                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                                className="bg-slate-50 border-slate-200"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="serviceId" className="flex items-center gap-2">
                            <Scissors className="w-3.5 h-3.5 text-slate-400" />
                            Servicio <span className="text-rose-500">*</span>
                        </Label>
                        <Select
                            value={formData.serviceId}
                            onValueChange={(value) => setFormData({ ...formData, serviceId: value })}
                        >
                            <SelectTrigger className="bg-slate-50 border-slate-200">
                                <SelectValue placeholder={loadingServices ? "Cargando..." : "Selecciona un servicio"} />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                {services.map((service) => (
                                    <SelectItem key={service.id} value={service.id?.toString() || ""}>
                                        {service.name} ({service.duration} min)
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes" className="flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-slate-400" />
                            Notas Adicionales
                        </Label>
                        <Textarea
                            id="notes"
                            placeholder="Detalles adicionales del turno..."
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="bg-slate-50 border-slate-200 resize-none h-20"
                        />
                    </div>

                    <DialogFooter className="pt-4 border-t border-slate-100">
                        <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
                            Cancelar
                        </Button>
                        <Button 
                            type="submit" 
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold min-w-[120px]"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Agendando...
                                </>
                            ) : (
                                "Agendar Turno"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

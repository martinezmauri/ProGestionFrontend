import React, { useState } from "react";
import { Check, X, Clock, User, Calendar, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import { Badge } from "@ui/badge";
import { Avatar, AvatarFallback } from "@ui/avatar";
import type { IAppointment } from "@interfaces/IAppointment";
import { cn } from "@lib/utils";

interface PendingPanelProps {
  appointments: IAppointment[];
  onApprove: (id: number) => Promise<void>;
  onReject: (id: number) => Promise<void>;
  actionLoading: boolean;
  className?: string;
}

export const PendingPanel = ({
  appointments,
  onApprove,
  onReject,
  actionLoading,
  className,
}: PendingPanelProps) => {
  const [processingId, setProcessingId] = useState<number | null>(null);

  const handleAction = async (id: number, action: "approve" | "reject") => {
    setProcessingId(id);
    try {
      if (action === "approve") {
        await onApprove(id);
      } else {
        await onReject(id);
      }
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div
      className={cn(
        "bg-white border-l border-slate-200 flex flex-col z-20 shadow-[-4px_0_24px_-10px_rgba(0,0,0,0.05)]",
        className
      )}
    >
      {/* Header */}
      <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-orange-50 to-amber-50/40 shrink-0">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-bold text-slate-800 flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-orange-500" />
            Solicitudes Pendientes
          </h2>
          <Badge className="bg-orange-500 text-white font-bold text-xs px-2 py-0.5 rounded-full">
            {appointments.length}
          </Badge>
        </div>
        <p className="text-[11px] text-slate-500">Requieren tu aprobación</p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {appointments.map((appt) => {
          const isProcessing = processingId === appt.id;
          const initials = (appt.customerName || "??")
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

          return (
            <Card
              key={appt.id}
              className={cn(
                "border-0 shadow-sm bg-slate-50 ring-1 ring-slate-200 overflow-hidden hover:ring-orange-300 transition-all border-l-4 border-l-orange-400",
                isProcessing && "opacity-60 pointer-events-none"
              )}
            >
              <CardContent className="p-4">
                {/* Client info */}
                <div className="flex items-center mb-3">
                  <Avatar className="h-8 w-8 mr-2.5 ring-2 ring-white shadow-sm">
                    <AvatarFallback className="bg-orange-100 text-orange-700 text-[10px] font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 leading-none truncate">
                      {appt.customerName || `Cliente #${appt.userId}`}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {appt.serviceName || `Servicio #${appt.serviceId}`}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="bg-white rounded-lg p-2.5 mb-3 border border-slate-100 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 flex items-center">
                      <User className="w-3 h-3 mr-1" /> Profesional:
                    </span>
                    <span className="font-semibold text-slate-700 truncate ml-2">
                      {appt.employeeName || `Prof. #${appt.employeeId}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" /> Fecha/Hora:
                    </span>
                    <span className="font-semibold text-sky-600">
                      {appt.appointmentDate} — {appt.startTime}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 h-8 text-xs bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 font-semibold"
                    onClick={() => handleAction(appt.id, "approve")}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    ) : (
                      <Check className="w-3 h-3 mr-1" />
                    )}
                    Aprobar
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 h-8 text-xs bg-white text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 font-semibold"
                    onClick={() => handleAction(appt.id, "reject")}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    ) : (
                      <X className="w-3 h-3 mr-1" />
                    )}
                    Rechazar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {appointments.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-emerald-200 mx-auto mb-3" />
            <p className="text-slate-500 font-medium text-sm">
              No hay solicitudes pendientes
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Has respondido a todas las peticiones.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

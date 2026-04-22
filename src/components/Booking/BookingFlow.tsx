import React, { useState, useEffect } from "react";
import { IService } from "@interfaces/IService";
import { IEmployeeResponse } from "@interfaces/IEmployee";
import { getServiceByBusinessId } from "@api/getServices";
import { getEmployeesByBusinessId } from "@api/getEmployees";
import { Card, CardContent } from "@ui/card";
import { Button } from "@ui/button";
import { Badge } from "@ui/badge";
import { 
  Calendar as CalendarIcon, 
  User, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft,
  Scissors
} from "lucide-react";
import api from "@api/axiosInstance";
import { toast } from "sonner";
import { format, addDays, startOfToday } from "date-fns";
import { es } from "date-fns/locale";
import { useAuth } from "@context/AuthContext";

interface BookingFlowProps {
  businessId: string;
  onSuccess?: () => void;
}

export const BookingFlow = ({ businessId, onSuccess }: BookingFlowProps) => {
  const { userId } = useAuth();
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<IService[]>([]);
  const [employees, setEmployees] = useState<IEmployeeResponse[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployeeResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServiceByBusinessId(businessId);
      setServices(data || []);
    };
    fetchServices();
  }, [businessId]);

  useEffect(() => {
    if (selectedService) {
      const fetchEmployees = async () => {
        const allEmployees = await getEmployeesByBusinessId(businessId);
        // Filtrar empleados que realicen el servicio seleccionado
        const filtered = allEmployees?.filter(emp => 
          emp.services?.some(s => s.id === selectedService.id)
        ) || [];
        setEmployees(filtered);
      };
      fetchEmployees();
    }
  }, [selectedService, businessId]);

  useEffect(() => {
    if (selectedEmployee && selectedDate && selectedService) {
      const fetchSlots = async () => {
        setLoading(true);
        try {
          const formattedDate = format(selectedDate, "yyyy-MM-dd");
          const response = await api.get(
            `/appointments/grid`,
            {
              params: {
                serviceId: selectedService.id,
                date: formattedDate,
              }
            }
          );
          // The grid endpoint returns AppointmentGridDto with timeSlots and employeeAvailabilities
          const gridData = response.data;
          if (gridData && gridData.employeeAvailabilities) {
            // Find the selected employee's available slots
            const empSchedule = gridData.employeeAvailabilities.find(
              (ea: any) => String(ea.employeeId) === String(selectedEmployee.id)
            );
            if (empSchedule) {
              const slots = empSchedule.timeSlots
                .filter((ts: any) => ts.available)
                .map((ts: any) => {
                  // Format "HH:mm:ss" to "HH:mm"
                  const raw = ts.startTime;
                  return raw.length > 5 ? raw.substring(0, 5) : raw;
                });
              setAvailableSlots(slots);
            } else {
              setAvailableSlots([]);
            }
          } else {
            setAvailableSlots([]);
          }
        } catch (error) {
          console.error("Error fetching slots", error);
          toast.error("No se pudieron cargar los horarios disponibles.");
        } finally {
          setLoading(false);
        }
      };
      fetchSlots();
    }
  }, [selectedEmployee, selectedDate, selectedService]);

  const handleConfirmBooking = async () => {
    if (!selectedService || !selectedEmployee || !selectedSlot) return;
    
    // Si no hay usuario logueado, validar campos manuales
    if (!userId && (!clientName || !clientEmail || !clientPhone)) {
      toast.error("Por favor, completa tus datos de contacto.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        serviceId: Number(selectedService.id),
        employeeId: Number(selectedEmployee.id),
        businessId: Number(businessId),
        userId: userId ? Number(userId) : undefined,
        clientName: !userId ? clientName : undefined,
        clientEmail: !userId ? clientEmail : undefined,
        clientPhone: !userId ? clientPhone : undefined,
        appointmentDate: format(selectedDate, "yyyy-MM-dd"),
        startTime: selectedSlot,
      };
      
      // Uses /appointment/request — creates a PENDING appointment
      const response = await api.post(`/appointment/request`, payload);
      
      if (response.status === 201 || response.status === 200) {
        toast.success("¡Solicitud enviada!", {
          description: `Tu turno para ${selectedService.name} fue solicitado. El negocio lo confirmará pronto.`
        });
        setStep(5); // Cambio de 4 a 5 por el paso intermedio
        if (onSuccess) onSuccess();
      }
    } catch (error: any) {
      const msg = typeof error.response?.data === 'string' 
        ? error.response.data 
        : error.response?.data?.message || "Error al solicitar la reserva";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <Scissors className="w-5 h-5 text-sky-500" />
        Selecciona un servicio
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {services.map((service) => (
          <Card 
            key={service.id} 
            className={`cursor-pointer transition-all hover:border-sky-500 ${selectedService?.id === service.id ? 'border-sky-500 bg-sky-50/30' : 'border-slate-100'}`}
            onClick={() => {
              setSelectedService(service);
              setStep(2);
            }}
          >
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800">{service.name}</p>
                <p className="text-sm text-slate-500">{service.duration} min • ${service.price}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="p-0 h-8 w-8 rounded-full">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <User className="w-5 h-5 text-sky-500" />
          ¿Con quién te gustaría atenderte?
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {employees.map((emp) => (
          <Card 
            key={emp.id} 
            className={`cursor-pointer transition-all hover:border-sky-500 ${selectedEmployee?.id === emp.id ? 'border-sky-500 bg-sky-50/30' : 'border-slate-100'}`}
            onClick={() => {
              setSelectedEmployee(emp);
              setStep(3);
            }}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                {emp.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-800">{emp.name}</p>
                <p className="text-xs text-slate-500 capitalize">{emp.role.toLowerCase()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => {
    const next7Days = Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i));

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setStep(2)} className="p-0 h-8 w-8 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-500" />
            Elegí el horario
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
            {next7Days.map((date) => (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl transition-all ${
                  format(selectedDate, "yyy-MM-dd") === format(date, "yyy-MM-dd")
                    ? "bg-sky-600 text-white shadow-md shadow-sky-200"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                }`}
              >
                <span className="text-[10px] uppercase font-bold opacity-80">{format(date, "EEE", { locale: es })}</span>
                <span className="text-xl font-bold">{format(date, "d")}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {loading ? (
              <div className="col-span-full py-10 text-center text-slate-400">Cargando horarios...</div>
            ) : availableSlots.length > 0 ? (
              availableSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-3 rounded-xl text-sm font-bold transition-all border ${
                    selectedSlot === slot
                      ? "bg-sky-600 text-white border-sky-600"
                      : "bg-white text-slate-700 border-slate-100 hover:border-sky-200 hover:bg-sky-50/50"
                  }`}
                >
                  {slot}
                </button>
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-slate-400">No hay turnos disponibles para este día</div>
            )}
          </div>
        </div>

        {selectedSlot && (
          <div className="pt-4">
            <Button 
              className="w-full bg-slate-900 hover:bg-sky-600 py-6 text-lg font-bold rounded-2xl transition-all shadow-lg"
              disabled={loading}
              onClick={() => {
                if (userId) {
                  handleConfirmBooking();
                } else {
                  setStep(4);
                }
              }}
            >
              {userId ? "Confirmar Reserva" : "Siguiente"}
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => setStep(3)} className="p-0 h-8 w-8 rounded-full">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <User className="w-5 h-5 text-sky-500" />
          Tus datos de contacto
        </h3>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-slate-500">
          Para que el negocio pueda confirmarte el turno, por favor completa tus datos.
        </p>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700">Nombre Completo *</label>
          <input
            type="text"
            className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
            placeholder="Ej: Juan Pérez"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700">Email *</label>
          <input
            type="email"
            className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
            placeholder="juan@ejemplo.com"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700">Teléfono *</label>
          <input
            type="text"
            className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
            placeholder="11 2345-6789"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
          />
        </div>

        <div className="pt-4">
          <Button 
            className="w-full bg-sky-600 hover:bg-sky-700 py-6 text-lg font-bold rounded-2xl transition-all shadow-lg"
            disabled={loading || !clientName || !clientEmail || !clientPhone}
            onClick={handleConfirmBooking}
          >
            {loading ? "Enviando..." : "Solicitar Turno"}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="py-10 text-center space-y-4">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-slate-800">¡Solicitud Enviada!</h3>
      <p className="text-slate-500 max-w-xs mx-auto">
        Tu turno fue solicitado exitosamente. El negocio revisará tu pedido y lo confirmará pronto.
      </p>
      <div className="pt-6">
        <Button 
          variant="outline" 
          className="rounded-xl px-8"
          onClick={() => {
            setStep(1);
            setSelectedService(null);
            setSelectedEmployee(null);
            setSelectedSlot(null);
            setClientName("");
            setClientEmail("");
            setClientPhone("");
          }}
        >
          Hacer otra reserva
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
      {step === 5 && renderStep5()}
    </div>
  );
};

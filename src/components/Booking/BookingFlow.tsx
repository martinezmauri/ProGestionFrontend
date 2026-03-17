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

interface BookingFlowProps {
  businessId: string;
  onSuccess?: () => void;
}

export const BookingFlow = ({ businessId, onSuccess }: BookingFlowProps) => {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<IService[]>([]);
  const [employees, setEmployees] = useState<IEmployeeResponse[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployeeResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

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
    if (selectedEmployee && selectedDate) {
      const fetchSlots = async () => {
        setLoading(true);
        try {
          const formattedDate = format(selectedDate, "yyyy-MM-dd");
          const response = await api.get(
            `${import.meta.env.VITE_API_URL}/appointment/grid?employeeId=${selectedEmployee.id}&date=${formattedDate}&serviceId=${selectedService?.id}`
          );
          setAvailableSlots(response.data || []);
        } catch (error) {
          console.error("Error fetching slots", error);
          toast.error("Error al cargar horarios disponibles");
        } finally {
          setLoading(false);
        }
      };
      fetchSlots();
    }
  }, [selectedEmployee, selectedDate, selectedService]);

  const handleConfirmBooking = async () => {
    if (!selectedService || !selectedEmployee || !selectedSlot) return;
    
    setLoading(true);
    try {
      const payload = {
        serviceId: selectedService.id,
        employeeId: selectedEmployee.id,
        appointmentDate: format(selectedDate, "yyyy-MM-dd"),
        startTime: selectedSlot,
      };
      
      const response = await api.post(`${import.meta.env.VITE_API_URL}/appointment/save`, payload);
      
      if (response.status === 201 || response.status === 200) {
        toast.success("¡Reserva confirmada!", {
          description: `Tu turno para ${selectedService.name} ha sido agendado.`
        });
        setStep(4);
        if (onSuccess) onSuccess();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al confirmar la reserva");
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
              onClick={handleConfirmBooking}
            >
              Confirmar Reserva
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="py-10 text-center space-y-4">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-slate-800">¡Reserva Exitosa!</h3>
      <p className="text-slate-500 max-w-xs mx-auto">
        Tu turno ha sido confirmado. Recibirás un correo con los detalles del establecimiento.
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
    </div>
  );
};

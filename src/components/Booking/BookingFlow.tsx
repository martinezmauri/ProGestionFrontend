import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Scissors,
  Sparkles,
  Zap,
  Star
} from "lucide-react";
import api from "@api/axiosInstance";
import { toast } from "sonner";
import { format, addDays, startOfToday, getDay, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { useBusinessHours } from "@hooks/useBusinessHours";
import { generateAvailableSlots } from "@utils/generateAvailableSlots";
import { getOccupiedSlots } from "@api/getAppointments";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@ui/dialog";

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
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { businessHours, loading: bhLoading, error: bhError } = useBusinessHours(businessId);

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
        const filtered = allEmployees?.filter(emp => 
          emp.services?.some(s => s.id === selectedService.id)
        ) || [];
        setEmployees(filtered);
      };
      fetchEmployees();
    }
  }, [selectedService, businessId]);

  useEffect(() => {
    if (selectedEmployee && selectedDate && selectedService && businessHours.length > 0) {
      const fetchSlots = async () => {
        setLoading(true);
        try {
          const dayNum = getDay(selectedDate);
          const bHours = businessHours.find(h => h.dayOfWeek === dayNum);
          const pHours = selectedEmployee.employeeHours?.find(h => h.dayOfWeek === dayNum);

          if (!bHours || !bHours.isWorkingDay || !pHours || !pHours.isWorkingDay) {
            setAvailableSlots([]);
            return;
          }

          const slots = generateAvailableSlots(bHours, pHours, selectedService.duration);
          const occupied = await getOccupiedSlots(selectedEmployee.id, format(selectedDate, "yyyy-MM-dd"));
          
          let filteredSlots = slots.filter(s => !occupied.includes(s));
          
          const now = new Date();
          if (isSameDay(selectedDate, now)) {
            const currentTime = format(now, "HH:mm");
            filteredSlots = filteredSlots.filter(s => s > currentTime);
          }
          
          setAvailableSlots(filteredSlots);
        } catch (error) {
          console.error("Error generating slots", error);
          toast.error("Error al calcular horarios disponibles");
        } finally {
          setLoading(false);
        }
      };
      fetchSlots();
    }
  }, [selectedEmployee, selectedDate, selectedService, businessHours]);

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
      
      const response = await api.post(`${import.meta.env.VITE_API_URL}/appointment/request`, payload);
      
      if (response.status === 201 || response.status === 200) {
        toast.success("¡Solicitud enviada!", {
          description: "El profesional revisará tu turno a la brevedad."
        });
        setShowConfirmDialog(false);
        setStep(4);
        if (onSuccess) onSuccess();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data || "Error al confirmar la reserva";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const stepsVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const renderStep1 = () => (
    <motion.div 
      variants={stepsVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-500 fill-indigo-50" />
          Nuestros Servicios
        </h3>
        <p className="text-slate-500 text-sm">Selecciona la experiencia que deseas reservar</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {services.length > 0 ? (
          services.map((service) => (
            <Card 
              key={service.id} 
              className={`group cursor-pointer border-2 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100/50 ${
                selectedService?.id === service.id ? 'border-indigo-500 bg-indigo-50/20' : 'border-slate-100'
              }`}
              onClick={() => {
                setSelectedService(service);
                setStep(2);
              }}
            >
              <CardContent className="p-5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    selectedService?.id === service.id ? 'bg-indigo-500 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'
                  }`}>
                    <Scissors className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-lg">{service.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                        <Clock className="w-3 h-3" /> {service.duration} min
                      </span>
                      <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        ${service.price}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="py-16 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center px-10">
             <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 text-slate-300">
                <Zap className="w-10 h-10" />
             </div>
             <h4 className="text-slate-800 font-black text-xl mb-2">Sin servicios disponibles</h4>
             <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
               Este establecimiento no tiene servicios activos en este momento. Reintenta más tarde.
             </p>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div 
      variants={stepsVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => setStep(1)} className="rounded-2xl border-slate-200 hover:bg-slate-50">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex flex-col">
          <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <User className="w-6 h-6 text-indigo-500" />
            Elegí tu profesional
          </h3>
          <p className="text-slate-500 text-sm">¿Con quién te gustaría lucir increíble?</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {employees.map((emp) => (
          <Card 
            key={emp.id} 
            className={`group cursor-pointer border-2 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100/50 ${
              selectedEmployee?.id === emp.id ? 'border-indigo-500 bg-indigo-50/20' : 'border-slate-100'
            }`}
            onClick={() => {
              setSelectedEmployee(emp);
              setStep(3);
            }}
          >
            <CardContent className="p-5 flex items-center gap-4">
              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black transition-colors ${
                  selectedEmployee?.id === emp.id ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {emp.name.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800 text-lg">{emp.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-slate-100 text-[10px] uppercase tracking-wider font-bold text-slate-500 border-none px-2 py-0">
                    {emp.role}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );

  const renderStep3 = () => {
    const next7Days = Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i));
    const morningSlots = availableSlots.filter(s => parseInt(s.split(":")[0]) < 13);
    const afternoonSlots = availableSlots.filter(s => parseInt(s.split(":")[0]) >= 13);

    return (
      <motion.div 
        variants={stepsVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => setStep(2)} className="rounded-2xl border-slate-200 hover:bg-slate-50">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex flex-col">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <Clock className="w-6 h-6 text-indigo-500" />
              Tu Horario
            </h3>
            <p className="text-slate-500 text-sm">Selecciona el momento perfecto para vos</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Calendario de días */}
          <div className="relative">
            <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide no-scrollbar -mx-1 px-1">
              {next7Days.map((date) => {
                const isSelected = isSameDay(selectedDate, date);
                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedSlot(null);
                    }}
                    className={`flex-shrink-0 flex flex-col items-center justify-center w-18 h-24 rounded-[2rem] transition-all duration-300 ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-200 scale-105"
                        : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                    }`}
                  >
                    <span className={`text-[11px] uppercase font-black mb-1 ${isSelected ? 'opacity-80' : 'text-slate-400'}`}>
                      {format(date, "EEE", { locale: es })}
                    </span>
                    <span className="text-2xl font-black tracking-tighter">{format(date, "d")}</span>
                  </button>
                );
              })}
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />
          </div>

          <div className="min-h-[300px]">
            {loading || bhLoading ? (
              <div className="py-24 flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 border-[6px] border-indigo-100 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-12 h-12 border-[6px] border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Buscando huecos...</p>
              </div>
            ) : bhError ? (
              <div className="py-12 flex flex-col items-center justify-center bg-red-50 rounded-[2.5rem] border-2 border-red-100 p-8 text-center max-w-sm mx-auto">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mb-4 text-red-600">
                  <Zap className="w-6 h-6" />
                </div>
                <p className="text-red-900 font-black mb-1 text-lg italic">¡Ups!</p>
                <p className="text-red-500 text-sm leading-relaxed">{bhError}</p>
                <Button variant="ghost" className="mt-6 text-red-600 hover:bg-red-100 rounded-xl" onClick={() => window.location.reload()}>
                  Intentar de nuevo
                </Button>
              </div>
            ) : availableSlots.length > 0 ? (
              <div className="grid grid-cols-1 gap-10">
                {morningSlots.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-3">
                       <Clock className="w-4 h-4" /> Franja Mañana
                       <div className="flex-1 h-[1px] bg-indigo-50" />
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {morningSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-4 rounded-3xl text-sm font-black transition-all duration-300 border-2 ${
                            selectedSlot === slot
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-100 scale-105"
                              : "bg-white text-slate-700 border-slate-50 hover:border-indigo-100 hover:bg-indigo-50/30"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {afternoonSlots.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-3">
                       <Clock className="w-4 h-4" /> Franja Tarde
                       <div className="flex-1 h-[1px] bg-indigo-50" />
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {afternoonSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-4 rounded-3xl text-sm font-black transition-all duration-300 border-2 ${
                            selectedSlot === slot
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-100 scale-105"
                              : "bg-white text-slate-700 border-slate-50 hover:border-indigo-100 hover:bg-indigo-50/30"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-24 flex flex-col items-center justify-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 p-10 text-center max-w-sm mx-auto">
                <CalendarIcon className="w-16 h-16 text-slate-200 mb-6" />
                <h4 className="text-slate-800 font-black text-xl mb-2 italic">Sin disponibilidad</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Parece que no hay espacios libres para este día. Prueba seleccionando otra fecha.
                </p>
              </div>
            )}
          </div>
        </div>

        {selectedSlot && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-8"
          >
            <Button 
              className="w-full h-20 bg-slate-900 border-none hover:bg-indigo-600 text-white text-xl font-black rounded-[2rem] transition-all duration-500 shadow-2xl hover:shadow-indigo-200 flex items-center justify-center gap-3 group"
              disabled={loading}
              onClick={() => setShowConfirmDialog(true)}
            >
              RESERVAR A LAS {selectedSlot}
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}

        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none rounded-[3rem] shadow-3xl">
            <div className="bg-indigo-600 p-10 text-white">
              <DialogTitle className="text-3xl font-black italic tracking-tighter mb-2">Resumen Final</DialogTitle>
              <DialogDescription className="text-indigo-100 font-medium">
                Confirma los detalles de tu cita para finalizar.
              </DialogDescription>
            </div>
            
            <div className="p-10 space-y-8 bg-white">
              <div className="space-y-4">
                <div className="flex items-center gap-5 p-4 rounded-3xl bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Scissors className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Servicio</p>
                    <p className="text-lg font-black text-slate-800">{selectedService?.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-5 p-4 rounded-3xl bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Profesional</p>
                    <p className="text-lg font-black text-slate-800">{selectedEmployee?.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-5 p-4 rounded-3xl bg-indigo-50/30 border border-indigo-100">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Cita</p>
                    <p className="text-lg font-black text-indigo-900 leading-tight">
                      {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })} a las <span className="text-indigo-600 underline">{selectedSlot} hs</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button 
                  className="w-full h-20 bg-indigo-600 hover:bg-slate-900 py-6 text-xl font-black rounded-[2rem] transition-all duration-500 shadow-xl hover:shadow-indigo-100"
                  onClick={handleConfirmBooking}
                  disabled={loading}
                >
                  {loading ? "Confirmando..." : "¡Confirmar ahora!"}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full h-12 text-slate-400 font-bold rounded-2xl" 
                  onClick={() => setShowConfirmDialog(false)}
                >
                  Regresar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    );
  };

  const renderStep4 = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-16 text-center space-y-8 bg-gradient-to-br from-indigo-50 to-white rounded-[4rem] p-10 border-2 border-indigo-100 shadow-2xl shadow-indigo-50"
    >
      <div className="relative inline-block">
        <div className="w-32 h-32 bg-white rounded-[3rem] shadow-xl flex items-center justify-center mx-auto mb-2 rotate-3">
          <CheckCircle2 className="w-16 h-16 text-emerald-500" />
        </div>
        <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-3xl flex items-center justify-center shadow-lg -rotate-12">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-4xl font-black text-slate-800 tracking-tighter italic">¡Solicitud Enviada!</h3>
        <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
          Tu reserva para <span className="text-indigo-600 font-bold">{selectedService?.name}</span> ya está camino al profesional. Te notificaremos pronto su confirmación.
        </p>
      </div>

      <div className="pt-8">
        <Button 
          variant="outline" 
          className="h-16 rounded-[2rem] px-12 border-2 border-indigo-600 text-indigo-600 font-black hover:bg-indigo-600 hover:text-white transition-all duration-500"
          onClick={() => {
            setStep(1);
            setSelectedService(null);
            setSelectedEmployee(null);
            setSelectedSlot(null);
          }}
        >
          Agendar otro turno
          <Star className="w-5 h-5 ml-2 fill-current" />
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto px-1">
      <AnimatePresence mode="wait">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </AnimatePresence>
    </div>
  );
};

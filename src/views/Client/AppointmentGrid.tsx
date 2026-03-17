import React, { useEffect, useState } from "react";
import AppSidebar from "@components/Sidebar/AppSidebar";
import { Button } from "@ui/button";
import { useAppointmentGrid } from "@hooks/useAppointmentGrid";
import { useBusinessHours } from "@hooks/useBusinessHours";
import { useAuth } from "@context/AuthContext";
import { IService } from "@interfaces/IService";
import { getServiceByBusinessId } from "@api/getServices";
import { createAppointment } from "@api/getAppointments";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@lib/utils";
import { MOCK_SERVICES, MOCK_GRID_DATA } from "../../mocks/mockData";
import {
  TimeColumn,
  ResourceHeader,
  AppointmentBlock,
  GridCell,
  CurrentTimeIndicator,
} from "./components/GridComponents";
import { ServiceSelector, EmployeeSelector } from "./components/WizardComponents";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Card, CardContent, CardHeader } from "@ui/card";
import { BusinessHoursForm } from "@components/Forms/BusinessHoursForm";
import { IWorkSchedule } from "@interfaces/IWorkSchedule";
import { AppHeader } from "@components/Header/AppHeader";
import { FooterSimple } from "@components/Footer/FooterSimple";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@ui/dialog";

export const AppointmentGrid = () => {
  const { businessId, isAuthenticated, userId: authUserId } = useAuth();
  const [services, setServices] = useState<IService[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [setupHours, setSetupHours] = useState<IWorkSchedule[]>([]);

  const {
    gridData: hookGridData,
    loading,
    error,
    currentStep,
    setCurrentStep,
    selectedDate,
    setSelectedDate,
    selectedServiceId,
    setSelectedServiceId,
    selectedEmployeeId,
    setSelectedEmployeeId,
    selectedTimeSlot,
    setSelectedTimeSlot,
    resetWizard,
    refreshGrid,
  } = useAppointmentGrid();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const {
    hasHours,
    loading: hoursLoading,
    fetchBusinessHours,
    saveBusinessHours,
  } = useBusinessHours(businessId);

  // Use hook data or fallback to mock in DEV
  const gridData =
    hookGridData || (import.meta.env.DEV ? MOCK_GRID_DATA : null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Check business hours on mount
  useEffect(() => {
    if (businessId && isAuthenticated) {
      fetchBusinessHours();
    }
  }, [businessId, isAuthenticated]);

  useEffect(() => {
    const fetchServices = async () => {
      const bId = businessId || (import.meta.env.DEV ? "1" : null);
      if (bId && isAuthenticated && (hasHours || import.meta.env.DEV)) {
        try {
          const data = await getServiceByBusinessId(String(bId));
          const safeData = Array.isArray(data) ? data : [];

          let servicesToUse = safeData;
          if (safeData.length === 0 && import.meta.env.DEV) {
            servicesToUse = MOCK_SERVICES;
          }

          setServices(servicesToUse);

          if (servicesToUse.length > 0 && !selectedServiceId) {
            setSelectedServiceId(Number(servicesToUse[0].id));
          }
        } catch (err) {
          console.error("Error fetching services:", err);
          if (import.meta.env.DEV) {
            setServices(MOCK_SERVICES);
            if (!selectedServiceId)
              setSelectedServiceId(Number(MOCK_SERVICES[0].id));
          }
        }
      }
    };
    fetchServices();
  }, [
    businessId,
    isAuthenticated,
    hasHours,
    setSelectedServiceId,
    selectedServiceId,
  ]);

  const handleDateChange = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const handleGoToToday = () => setSelectedDate(new Date());

  const handleCellClick = (employeeId: number, startTime: string) => {
    setSelectedEmployeeId(employeeId);
    setSelectedTimeSlot(startTime);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmAppointment = async () => {
    const bId = businessId || (import.meta.env.DEV ? "1" : null);
    if (!bId || !isAuthenticated || !selectedServiceId || !selectedTimeSlot) {
      if (import.meta.env.DEV)
        toast.info("Modo desarrollo: Intentando guardar turno " + selectedTimeSlot);
      return;
    }

    const [year, month, day] = format(selectedDate, "yyyy-MM-dd").split("-");
    const appointmentDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    try {
      const userId = authUserId || (import.meta.env.DEV ? "1" : "");
      await createAppointment({
        appointmentDate: format(appointmentDate, "yyyy-MM-dd"),
        startTime: selectedTimeSlot,
        businessId: Number(bId),
        employeeId: selectedEmployeeId || 0, // 0 For First Available (Need backend support or explicit employee)
        serviceId: selectedServiceId,
        userId: Number(userId),
      });
      toast.success("Turno solicitado exitosamente. Esperando confirmación.");
      setIsConfirmModalOpen(false);
      resetWizard();
      refreshGrid();
    } catch (err) {
      toast.error("Error al crear el turno");
    }
  };

  const handleSaveHours = async () => {
    const activeHours = setupHours.filter((h) => h.isWorkingDay);
    if (activeHours.length === 0) {
      toast.error("Debes configurar al menos un día de atención.");
      return;
    }
    try {
      await saveBusinessHours(setupHours);
      toast.success("¡Horarios configurados exitosamente!", {
        description: "Tu grilla de turnos está lista para usar.",
      });
    } catch {
      toast.error("Error al guardar los horarios.");
    }
  };

  const groupAppointments = (slots: any[]) => {
    const appointments: any[] = [];
    let currentAppt: any = null;

    slots.forEach((slot) => {
      if (slot.appointmentId) {
        if (currentAppt && currentAppt.appointmentId === slot.appointmentId) {
          currentAppt.endTime = slot.endTime;
          currentAppt.duration += 30;
        } else {
          currentAppt = {
            appointmentId: slot.appointmentId,
            startTime: slot.startTime.substring(0, 5),
            endTime: slot.endTime.substring(0, 5),
            duration: 30,
            customerName: "Cliente " + slot.appointmentId,
            serviceName: "Servicio " + slot.appointmentId,
          };
          appointments.push(currentAppt);
        }
      } else {
        currentAppt = null;
      }
    });
    return appointments;
  };

  const slots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ];

  // First-time setup: show hours configuration wizard
  if (hasHours === false && !import.meta.env.DEV) {
    return (
      <div className="flex h-screen w-full bg-[#FFFFFF] overflow-hidden">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 p-6 md:p-10 space-y-6 max-w-4xl mx-auto w-full overflow-y-auto">
            <AppHeader title="Grilla de Turnos" />
            <Card className="border-0 shadow-lg overflow-hidden relative">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl"></div>
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-10 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <CalendarDays className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
                    ¡Bienvenido al Gestor de Turnos!
                  </h2>
                </div>
                <p className="text-orange-50 text-lg max-w-2xl leading-relaxed">
                  Para empezar a gestionar turnos, necesitamos saber los
                  horarios de atención de tu negocio. Configura los días y
                  horarios en los que tu negocio está abierto.
                </p>
              </CardHeader>
            </Card>
            <BusinessHoursForm
              businessHours={setupHours}
              setBusinessHours={setSetupHours}
              handleFinalSubmit={handleSaveHours}
              title="Configura tus Horarios de Atención"
              showSubmitButton={true}
            />
          </div>
          <FooterSimple />
        </div>
      </div>
    );
  }

  // Loading state while checking hours
  if ((hasHours === null || hoursLoading) && !import.meta.env.DEV) {
    return (
      <div className="flex h-screen w-full bg-[#FFFFFF] overflow-hidden items-center justify-center">
        <RefreshCw className="w-8 h-8 text-orange-500 animate-spin mb-3" />
        <p className="text-gray-600 font-medium ml-3">
          Cargando configuración...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#FFFFFF] overflow-hidden">
      <AppSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 p-8 flex flex-col max-w-[1600px] mx-auto w-full overflow-hidden">
          {/* Header Section */}
          <div className="flex flex-col mb-8 mt-2 space-y-2">
            <h1 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">Nueva Reserva</h1>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className={cn("px-3 py-1 rounded-full", currentStep >= 1 ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-500")}>1. Servicio</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className={cn("px-3 py-1 rounded-full", currentStep >= 2 ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-500")}>2. Profesional</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className={cn("px-3 py-1 rounded-full", currentStep >= 3 ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-500")}>3. Fecha y Hora</span>
            </div>
          </div>

          {currentStep === 1 && (
            <div className="flex-1 overflow-y-auto pr-4 pb-20">
              <h2 className="text-xl font-bold text-[#334155] mb-6">¿Qué servicio deseas agendar?</h2>
              <ServiceSelector
                services={services}
                selectedId={selectedServiceId}
                onSelect={(val) => {
                  setSelectedServiceId(val);
                }}
              />
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedServiceId}
                  className="bg-[#059669] hover:bg-[#047857] text-white px-8 py-6 rounded-xl text-lg font-bold shadow-md w-full md:w-auto"
                >
                  Continuar al Paso 2
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex-1 overflow-y-auto pr-4 pb-20">
              <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" onClick={() => setCurrentStep(1)} className="rounded-full bg-gray-100 hover:bg-gray-200"><ChevronLeft className="w-5 h-5" /></Button>
                <h2 className="text-xl font-bold text-[#334155]">¿Con quién deseas atenderte?</h2>
              </div>

              {/* Extract unique employees from GridData or Mock if available. In a real scenario we might need a specific endpoint for service-employees */}
              <EmployeeSelector
                employees={gridData?.employeeAvailabilities?.map(e => ({ id: e.employeeId, name: e.employeeName })) || []}
                selectedId={selectedEmployeeId}
                onSelect={(val) => {
                  setSelectedEmployeeId(val);
                }}
              />
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => setCurrentStep(3)}
                  className="bg-[#059669] hover:bg-[#047857] text-white px-8 py-6 rounded-xl text-lg font-bold shadow-md w-full md:w-auto"
                >
                  Continuar al Paso 3
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="flex items-center gap-4 mb-6 shrink-0">
                <Button variant="ghost" size="icon" onClick={() => setCurrentStep(2)} className="rounded-full bg-gray-100 hover:bg-gray-200"><ChevronLeft className="w-5 h-5" /></Button>
                <h2 className="text-xl font-bold text-[#334155]">Selecciona Fecha y Hora</h2>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 shrink-0 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-[#F1F5F9] rounded-2xl p-1 shadow-sm border border-[#E2E8F0]">
                    <Button
                      variant="ghost"
                      className="h-9 px-4 rounded-xl font-bold text-[#374151] hover:bg-white"
                      onClick={handleGoToToday}
                    >
                      Hoy
                    </Button>
                    <div className="flex border-l border-[#E2E8F0] ml-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl text-[#64748B]"
                        onClick={() => handleDateChange(-1)}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl text-[#64748B]"
                        onClick={() => handleDateChange(1)}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <h1 className="text-xl font-bold text-[#374151] ml-2 capitalize">
                    {format(selectedDate || new Date(), "EEEE d 'de' MMMM", {
                      locale: es,
                    })}
                  </h1>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Button
                    onClick={refreshGrid}
                    disabled={loading || !selectedServiceId}
                    variant="outline"
                    className="rounded-xl border-[#E2E8F0]"
                  >
                    <RefreshCw
                      className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
                    /> Refrescar
                  </Button>
                </div>
              </div>

              {/* Grid Area */}
              <div className="flex-1 bg-white rounded-3xl border border-[#E2E8F0] shadow-sm relative overflow-hidden flex flex-col">
                {loading && !gridData && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <RefreshCw className="w-8 h-8 text-[#059669] animate-spin" />
                  </div>
                )}

                {error && !gridData && (
                  <div className="absolute inset-0 bg-white z-40 flex items-center justify-center p-8 text-center text-sm">
                    <div className="max-w-md">
                      <p className="text-red-500 font-medium mb-4">{error}</p>
                      <Button onClick={refreshGrid} variant="outline" size="sm">
                        Reintentar
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex-1 overflow-x-auto overflow-y-auto scrollbar-hide relative bg-[#F8FAFC]/30">
                  <div className="flex flex-col min-w-max h-full">
                    {/* Resource Headers Sticky Top */}
                    <div className="flex border-b border-[#E2E8F0] sticky top-0 z-30 bg-white shrink-0">
                      <div className="w-[100px] flex-shrink-0 bg-[#F8FAFC]" />
                      {gridData?.employeeAvailabilities?.map((emp: any) => (
                        <ResourceHeader
                          key={emp.employeeId}
                          name={emp.employeeName}
                        />
                      ))}
                      {/* Fill empty space if no data */}
                      {!gridData?.employeeAvailabilities && (
                        <div className="flex-1 p-4 text-center text-sm text-[#94A3B8]">
                          Cargando profesionales...
                        </div>
                      )}
                    </div>

                    {/* Main Grid Floor */}
                    <div className="flex flex-1 relative min-h-[1600px]">
                      <TimeColumn slots={slots} />

                      <CurrentTimeIndicator
                        slots={slots}
                        currentLocalTime={currentTime}
                        totalGridWidth={
                          gridData?.employeeAvailabilities?.length
                            ? gridData.employeeAvailabilities.length * 300
                            : 300
                        }
                      />

                      <div className="flex min-w-max relative flex-1">
                        {gridData?.employeeAvailabilities?.map((emp: any) => {
                          const appointments = groupAppointments(
                            emp.timeSlots || [],
                          );
                          return (
                            <div
                              key={emp.employeeId}
                              className="w-[300px] relative border-r border-[#E2E8F0] bg-white last:border-r-0"
                            >
                              {slots.map((time) => {
                                const slotData = emp.timeSlots.find((s: any) =>
                                  s.startTime.startsWith(time),
                                );
                                const isAvailable = slotData?.available;
                                const isBooked = slotData?.appointmentId != null;

                                return (
                                  <GridCell
                                    key={time}
                                    time={time}
                                    onAdd={() =>
                                      isAvailable && !isBooked
                                        ? handleCellClick(emp.employeeId, time)
                                        : null
                                    }
                                    isAvailable={isAvailable}
                                    isBooked={isBooked}
                                  />
                                );
                              })}

                              {appointments.map((appt, idx) => (
                                <AppointmentBlock
                                  key={`${appt.appointmentId}-${idx}`}
                                  appointment={appt}
                                  slots={slots}
                                />
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl p-6">
          <DialogHeader className="mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 text-orange-600">
              <CalendarDays className="w-6 h-6" />
            </div>
            <DialogTitle className="text-2xl font-bold text-[#1E293B]">Confirmar Reserva</DialogTitle>
            <DialogDescription className="text-gray-500 text-base">
              Por favor revisa los detalles de tu turno antes de solicitarlo.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-[#F8FAFC] rounded-2xl p-5 space-y-4 border border-[#E2E8F0]">
            <div className="flex justify-between items-center pb-4 border-b border-[#E2E8F0] last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white border shadow-sm flex items-center justify-center"><Clock className="w-4 h-4 text-gray-400" /></div>
                <div>
                  <p className="text-sm font-bold text-[#1E293B] capitalize">{format(selectedDate || new Date(), "EEEE d 'de' MMMM", { locale: es })}</p>
                  <p className="text-xs text-[#64748B]">a las {selectedTimeSlot} hs</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-[#E2E8F0] last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white border shadow-sm flex items-center justify-center"><User className="w-4 h-4 text-gray-400" /></div>
                <div>
                  <p className="text-sm font-bold text-[#1E293B]">{
                    selectedEmployeeId
                      ? gridData?.employeeAvailabilities?.find(e => e.employeeId === selectedEmployeeId)?.employeeName
                      : "Cualquier Profesional"
                  }</p>
                  <p className="text-xs text-[#64748B]">Profesional</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pb-0 border-b border-[#E2E8F0] last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 border-emerald-200 shadow-sm flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-emerald-600" /></div>
                <div>
                  <p className="text-sm font-bold text-[#1E293B]">{services.find(s => Number(s.id) === selectedServiceId)?.name}</p>
                  <p className="text-xs text-[#64748B]">Servicio</p>
                </div>
              </div>
              <p className="font-extrabold text-[#059669]">${services.find(s => Number(s.id) === selectedServiceId)?.price}</p>
            </div>
          </div>
          <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)} className="rounded-xl w-full sm:w-auto font-bold h-12">Cancelar</Button>
            <Button onClick={handleConfirmAppointment} className="bg-[#059669] hover:bg-[#047857] text-white rounded-xl w-full sm:flex-1 font-bold h-12 shadow-md">
              Solicitar Turno
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

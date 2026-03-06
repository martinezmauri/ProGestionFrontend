import React, { useEffect, useState } from "react";
import AppSidebar from "@components/Sidebar/AppSidebar";
import { Button } from "@ui/button";
import { useAppointmentGrid } from "@hooks/useAppointmentGrid";
import { useAuth } from "@context/AuthContext";
import { IService } from "@interfaces/IService";
import { getServiceByBusinessId } from "@api/getServices";
import { createAppointment } from "@api/getAppointments";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { MOCK_SERVICES, MOCK_GRID_DATA } from "../../mocks/mockData";
import {
  TimeColumn,
  ResourceHeader,
  AppointmentBlock,
  GridCell,
  CurrentTimeIndicator,
} from "./components/GridComponents";

export const AppointmentGrid = () => {
  const { businessId, isAuthenticated, userId: authUserId } = useAuth();
  const [services, setServices] = useState<IService[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const {
    gridData: hookGridData,
    loading,
    error,
    selectedDate,
    setSelectedDate,
    selectedServiceId,
    setSelectedServiceId,
    refreshGrid,
  } = useAppointmentGrid();

  // Use hook data or fallback to mock in DEV
  const gridData =
    hookGridData || (import.meta.env.DEV ? MOCK_GRID_DATA : null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      // Use numeric ID for mock to avoid NaN
      const bId = businessId || (import.meta.env.DEV ? "1" : null);

      if (bId) {
        try {
          const data = await getServiceByBusinessId(Number(bId));
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
  }, [businessId, isAuthenticated, setSelectedServiceId, selectedServiceId]);

  const handleDateChange = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const handleGoToToday = () => setSelectedDate(new Date());

  const handleCellClick = async (employeeId: number, startTime: string) => {
    const bId = businessId || (import.meta.env.DEV ? "1" : null);
    if (!bId || !isAuthenticated || !selectedServiceId) {
      if (import.meta.env.DEV)
        toast.info("Modo desarrollo: Clic en celda " + startTime);
      return;
    }

    const [year, month, day] = format(selectedDate, "yyyy-MM-dd").split("-");
    const [hours, minutes] = startTime.split(":");
    const appointmentDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hours),
      Number(minutes),
    );

    try {
      const userId = authUserId || (import.meta.env.DEV ? "1" : "");
      await createAppointment({
        date: appointmentDate.toISOString(),
        status: "PENDING",
        businessId: Number(bId),
        employeeId,
        serviceId: selectedServiceId,
        userId: Number(userId),
      });
      toast.success("Turno creado exitosamente");
      refreshGrid();
    } catch (err) {
      toast.error("Error al crear el turno");
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

  return (
    <div className="flex h-screen w-full bg-[#FFFFFF] overflow-hidden">
      <AppSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 p-8 flex flex-col max-w-[1600px] mx-auto w-full overflow-hidden">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6 shrink-0">
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

            <div className="flex items-center gap-8 text-[#64748B] font-medium">
              <button className="flex items-center gap-2 text-[#059669]">
                <span className="text-sm font-bold border-b-2 border-[#059669] pb-1">
                  Agenda
                </span>
              </button>
              <button className="flex items-center gap-2 hover:text-[#374151] transition-colors">
                <span className="text-sm">Servicios</span>
              </button>
              <button className="flex items-center gap-2 hover:text-[#374151] transition-colors">
                <span className="text-sm">Personal</span>
              </button>
              <button className="flex items-center gap-2 hover:text-[#374151] transition-colors">
                <span className="text-sm">Configuración</span>
              </button>
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
                          {slots.map((time) => (
                            <GridCell
                              key={time}
                              time={time}
                              onAdd={() =>
                                handleCellClick(emp.employeeId, time)
                              }
                            />
                          ))}

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
      </div>
    </div>
  );
};

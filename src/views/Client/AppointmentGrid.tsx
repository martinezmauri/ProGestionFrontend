import React, { useEffect, useState } from "react";
import AppSidebar from "@components/Sidebar/AppSidebar";
import { AppHeader } from "@components/Header/AppHeader";
import { FooterSimple } from "@components/Footer/FooterSimple";
import { Card, CardContent, CardHeader } from "@ui/card";
import { useAppointmentGrid } from "@hooks/useAppointmentGrid";
import { useAuth } from "@context/AuthContext";
import { IService } from "@interfaces/IService";
import { getServiceByBusinessId } from "@api/getServices";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ui/select";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Button } from "@ui/button";
import { Calendar, RefreshCw, User, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { createAppointment } from "@api/getAppointments";
import { toast } from "sonner";

export const AppointmentGrid = () => {
    const { businessId, isAuthenticated } = useAuth();
    const [services, setServices] = useState<IService[]>([]);

    const {
        gridData,
        loading,
        error,
        selectedDate,
        setSelectedDate,
        selectedServiceId,
        setSelectedServiceId,
        refreshGrid
    } = useAppointmentGrid();

    useEffect(() => {
        const fetchServices = async () => {
            if (businessId && isAuthenticated) {
                const data = await getServiceByBusinessId(Number(businessId));
                setServices(data || []);
                if (data && data.length > 0 && !selectedServiceId) {
                    setSelectedServiceId(Number(data[0].id));
                }
            }
        };
        fetchServices();
    }, [businessId, isAuthenticated]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateStr = e.target.value;
        if (dateStr) {
            // Parse local date strictly
            const [year, month, day] = dateStr.split('-');
            const newDate = new Date(Number(year), Number(month) - 1, Number(day));
            setSelectedDate(newDate);
        }
    };

    const handleCellClick = async (employeeId: number, startTime: string) => {
        if (!businessId || !isAuthenticated || !selectedServiceId) return;

        // Construct full ISO datetime for the appointment
        const [year, month, day] = format(selectedDate, "yyyy-MM-dd").split('-');
        const [hours, minutes] = startTime.split(':');
        const appointmentDate = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));

        try {
            const userId = JSON.parse(localStorage.getItem("auth_data")!).usuario.id;

            await createAppointment({
                date: appointmentDate.toISOString(),
                status: "PENDING",
                businessId: Number(businessId),
                employeeId,
                serviceId: selectedServiceId,
                userId: Number(userId)
            });

            toast.success("Turno creado exitosamente");
            refreshGrid();
        } catch (err) {
            toast.error("Error al crear el turno");
            console.error(err);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-[#F4FBFF]">
            <AppSidebar />
            <div className="flex flex-col flex-1">
                <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
                    <AppHeader title="Grilla de Turnos" />
                    <p className="text-muted-foreground">
                        Gestiona las citas y turnos de tus empleados.
                    </p>

                    {/* Filtros */}
                    <Card className="w-full border-0 shadow-sm">
                        <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-end">
                            <div className="w-full sm:w-1/3 space-y-2">
                                <Label>Servicio</Label>
                                <Select
                                    value={selectedServiceId ? String(selectedServiceId) : ""}
                                    onValueChange={(val) => setSelectedServiceId(Number(val))}
                                >
                                    <SelectTrigger className="w-full bg-white">
                                        <SelectValue placeholder="Selecciona un servicio" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {services.map(s => (
                                            <SelectItem key={s.id} value={String(s.id)}>
                                                {s.name} ({s.duration} min)
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-full sm:w-1/3 space-y-2">
                                <Label>Fecha</Label>
                                <div className="relative">
                                    <Input
                                        type="date"
                                        className="w-full bg-white pr-10"
                                        value={format(selectedDate, "yyyy-MM-dd")}
                                        onChange={handleDateChange}
                                    />
                                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="w-full sm:w-auto mt-4 sm:mt-0">
                                <Button
                                    onClick={refreshGrid}
                                    disabled={loading || !selectedServiceId}
                                    className="bg-orange-500 hover:bg-orange-600 text-white w-full"
                                >
                                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                                    Actualizar
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Grilla principal */}
                    <Card className="w-full border-0 shadow-sm overflow-hidden flex-1 flex flex-col">
                        <CardHeader className="bg-white border-b py-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-800">
                                    {gridData ? `Turnos para ${gridData.serviceName}` : 'Calendario de Turnos'}
                                </span>
                                <span className="text-sm text-gray-500 capitalize">
                                    {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                                </span>
                            </div>
                        </CardHeader>

                        <CardContent className="p-0 flex-1 relative bg-gray-50/50">
                            {loading && !gridData && (
                                <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                                    <div className="flex flex-col items-center">
                                        <RefreshCw className="w-8 h-8 text-orange-500 animate-spin mb-2" />
                                        <p className="text-gray-600 font-medium">Cargando grilla...</p>
                                    </div>
                                </div>
                            )}

                            {error ? (
                                <div className="flex items-center justify-center p-12 text-red-500 border-2 border-dashed border-red-200 m-6 rounded-lg bg-red-50">
                                    <p>{error}</p>
                                </div>
                            ) : !gridData ? (
                                <div className="flex items-center justify-center p-12 text-gray-500 border-2 border-dashed border-gray-200 m-6 rounded-lg bg-white">
                                    <p>Selecciona un servicio y fecha para cargar la grilla.</p>
                                </div>
                            ) : gridData.employeeAvailabilities.length === 0 ? (
                                <div className="flex items-center justify-center p-12 text-gray-500 border-2 border-dashed border-gray-200 m-6 rounded-lg bg-white">
                                    <p>No hay empleados disponibles para este servicio en esta fecha.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto h-[600px] overflow-y-auto relative border-b pl-20 2xl:pl-24">
                                    {/* Sidebar de Horarios V2 */}
                                    <div className="absolute left-0 top-0 bottom-0 w-20 2xl:w-24 bg-white border-r z-20 flex flex-col sticky-col">
                                        <div className="h-14 border-b flex items-center justify-center bg-gray-50 text-xs font-medium text-gray-500 sticky top-0 z-30">
                                            <Clock className="w-4 h-4 mr-1" /> Hora
                                        </div>
                                        {gridData.timeSlots.map((slot, idx) => (
                                            <div
                                                key={`header-time-${idx}`}
                                                className="h-16 flex items-center justify-center border-b text-sm font-medium text-gray-600"
                                            >
                                                {slot.startTime.substring(0, 5)}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Contenedor Flex para las columnas de empleados */}
                                    <div className="flex min-w-max">
                                        {gridData.employeeAvailabilities.map((emp) => (
                                            <div key={`emp-${emp.employeeId}`} className="w-48 sm:w-64 flex flex-col border-r">
                                                {/* Cabecera del Empleado (Sticky Top) */}
                                                <div className="h-14 border-b bg-gray-50 flex flex-col items-center justify-center sticky top-0 z-10 font-medium text-gray-700 shadow-sm">
                                                    <div className="flex items-center truncate px-2 w-full justify-center">
                                                        <User className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" />
                                                        <span className="truncate">{emp.employeeName}</span>
                                                    </div>
                                                </div>

                                                {/* Celdas de tiempo del Empleado */}
                                                {emp.timeSlots.map((slot, idx) => {
                                                    const isAvailable = slot.available;
                                                    const isBooked = slot.appointmentId != null;

                                                    return (
                                                        <div
                                                            key={`slot-${emp.employeeId}-${idx}`}
                                                            className={`h-16 border-b p-1 transition-colors group relative ${!isAvailable ? 'bg-gray-100/50 cursor-not-allowed' :
                                                                isBooked ? 'bg-orange-50 cursor-not-allowed' :
                                                                    'bg-white hover:bg-green-50 cursor-pointer'
                                                                }`}
                                                            onClick={() => isAvailable && !isBooked ? handleCellClick(emp.employeeId, slot.startTime) : null}
                                                        >
                                                            <div className={`w-full h-full rounded flex flex-col justify-center items-center text-xs border border-transparent ${!isAvailable ? 'text-gray-400' :
                                                                isBooked ? 'bg-orange-100/80 border-orange-200 text-orange-700 font-medium shadow-sm' :
                                                                    'text-transparent group-hover:text-green-600 group-hover:bg-green-100/50 group-hover:border-green-200 transition-all'
                                                                }`}>
                                                                {isBooked ? 'Ocupado' : isAvailable ? '✓ Disponible' : 'No disp.'}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <FooterSimple />
            </div>
        </div>
    );
};

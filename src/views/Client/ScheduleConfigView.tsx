import React, { useEffect, useState } from "react";
import { useAuth } from "@context/AuthContext";
import { AppHeader } from "@components/Header/AppHeader";
import { FooterSimple } from "@components/Footer/FooterSimple";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Badge } from "@ui/badge";
import { BusinessHoursForm } from "@components/Forms/BusinessHoursForm";
import { IWorkSchedule } from "@interfaces/IWorkSchedule";
import { getBusinessById } from "@api/getBusiness";
import { updateBusiness } from "@api/updateBusiness";
import { updateBusinessHours } from "@api/updateBusinessHours";
import { EmployeeWorkScheduleForm } from "@components/Forms/EmployeeWorkScheduleForm";
import { updateEmployeeHours } from "@api/updateEmployeeHours";
import { mapBackendSchedule } from "@utils/scheduleMapper";
import { getBusinessHours } from "@api/getBusinessHours";
import { 
    getHolidays, 
    addHoliday, 
    deleteHoliday, 
    updateSlotDuration, 
    BusinessHoliday 
} from "@api/businessConfig";
import { toast } from "sonner";
import { 
    Calendar, 
    Clock, 
    Plus, 
    Trash2, 
    Save, 
    Info, 
    AlertTriangle,
    RefreshCw,
    Users,
    Settings
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export const ScheduleConfigView = () => {
    const { userProfile } = useAuth();
    const businessId = userProfile?.businessId ?? null;
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    // Business Hours
    const [businessHours, setBusinessHours] = useState<IWorkSchedule[]>([]);
    const [slotDuration, setSlotDuration] = useState<number>(30);
    
    // Holidays
    const [holidays, setHolidays] = useState<BusinessHoliday[]>([]);
    const [newHoliday, setNewHoliday] = useState<Omit<BusinessHoliday, 'id'>>({
        holidayDate: "",
        description: "",
        isFullDay: true
    });

    // Professionals
    const [employees, setEmployees] = useState<any[]>([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
    const [employeeHours, setEmployeeHours] = useState<IWorkSchedule[]>([]);

    const loadData = async () => {
        if (!businessId) return;
        setLoading(true);
        try {
            const [business, hoursData] = await Promise.all([
                getBusinessById(String(businessId)),
                getBusinessHours(String(businessId))
            ]);

            if (business) {
                setSlotDuration(business.slotDuration || 30);
                if (business.employees && business.employees.length > 0) {
                    setEmployees(business.employees);
                }
            }

            if (hoursData && hoursData.length > 0) {
                setBusinessHours(mapBackendSchedule(hoursData));
            } else if (business && business.businessHours && business.businessHours.length > 0) {
                setBusinessHours(mapBackendSchedule(business.businessHours));
            } else {
                setBusinessHours([]);
            }
            
            const holidayData = await getHolidays(Number(businessId));
            setHolidays(holidayData);
        } catch (error) {
            console.error("Error loading schedule data:", error);
            toast.error("Error al cargar la configuración de horarios");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [businessId]);

    useEffect(() => {
        if (!selectedEmployeeId) {
           setEmployeeHours([]);
           return;
        }
        const emp = employees.find(e => e.id.toString() === selectedEmployeeId);
        if (emp && emp.workSchedules) {
            setEmployeeHours(emp.workSchedules);
        } else {
            setEmployeeHours([]);
        }
    }, [selectedEmployeeId, employees]);

    const handleSaveHours = async () => {
        if (!businessId) return;
        setSaving(true);
        try {
            await updateBusinessHours(Number(businessId), businessHours);
            toast.success("Horarios de apertura actualizados correctamente");
        } catch (error) {
            console.error("Error saving hours:", error);
            toast.error("No se pudieron guardar los horarios");
        } finally {
            setSaving(false);
        }
    };

    const handleSaveEmployeeHours = async () => {
        if (!selectedEmployeeId) return;
        setSaving(true);
        try {
            await updateEmployeeHours(Number(selectedEmployeeId), employeeHours);
            toast.success("Horarios del profesional actualizados correctamente");
            loadData(); // reload
        } catch (error) {
            console.error("Error saving employee hours:", error);
            toast.error("No se pudieron guardar los horarios del profesional");
        } finally {
            setSaving(false);
        }
    };

    const handleSaveSlotDuration = async () => {
        if (!businessId) return;
        setSaving(true);
        try {
            await updateSlotDuration(Number(businessId), slotDuration);
            toast.success("Duración de slot actualizada");
        } catch (error) {
            toast.error("Error al actualizar duración de slot");
        } finally {
            setSaving(false);
        }
    };

    const handleAddHoliday = async () => {
        if (!businessId || !newHoliday.holidayDate || !newHoliday.description) {
            toast.warning("Completa la fecha y descripción del feriado");
            return;
        }
        try {
            await addHoliday(Number(businessId), newHoliday as BusinessHoliday);
            toast.success("Feriado agregado con éxito");
            setNewHoliday({ holidayDate: "", description: "", isFullDay: true });
            loadData(); // Reload list
        } catch (error) {
            toast.error("Error al agregar feriado");
        }
    };

    const handleDeleteHoliday = async (id: number) => {
        if (!businessId) return;
        try {
            await deleteHoliday(Number(businessId), id);
            toast.success("Feriado eliminado");
            setHolidays(holidays.filter(h => h.id !== id));
        } catch (error) {
            toast.error("Error al eliminar feriado");
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <RefreshCw className="w-10 h-10 text-orange-500 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Cargando centro de horarios...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 w-full animate-in fade-in duration-500 bg-slate-50/50 min-h-screen">
            <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <AppHeader title="Gestión de Horarios y Disponibilidad" />
                        <p className="text-slate-500 mt-1">
                            Centraliza las reglas de tu negocio: horarios, feriados y duración de turnos.
                        </p>
                    </div>
                </div>

                <Tabs defaultValue="hours" className="w-full">
                    <TabsList className="bg-white p-1 border shadow-sm mb-6 inline-flex w-full md:w-auto h-auto">
                        <TabsTrigger value="hours" className="px-6 py-2.5 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600">
                            <Clock className="w-4 h-4 mr-2" />
                            Horarios de Apertura
                        </TabsTrigger>
                        <TabsTrigger value="holidays" className="px-6 py-2.5 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            Feriados y Cierres
                        </TabsTrigger>
                        <TabsTrigger value="professionals" className="px-6 py-2.5 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600">
                            <Users className="w-4 h-4 mr-2" />
                            Profesionales
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="px-6 py-2.5 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600">
                            <Settings className="w-4 h-4 mr-2" />
                            Preferencias
                        </TabsTrigger>
                    </TabsList>

                    {/* TAP 1: BUSINESS HOURS */}
                    <TabsContent value="hours" className="animate-in slide-in-from-top-2 duration-300">
                        <BusinessHoursForm 
                            businessHours={businessHours}
                            setBusinessHours={setBusinessHours}
                            showSubmitButton={false}
                        />
                        <div className="flex justify-end mt-6">
                            <Button 
                                onClick={handleSaveHours} 
                                disabled={saving}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-8 shadow-lg shadow-orange-500/20"
                            >
                                {saving ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                Guardar Horarios del Negocio
                            </Button>
                        </div>
                    </TabsContent>

                    {/* TAB 2: HOLIDAYS */}
                    <TabsContent value="holidays" className="animate-in slide-in-from-top-2 duration-300 space-y-6">
                        <Card className="border-0 shadow-sm overflow-hidden">
                            <CardHeader className="bg-white border-b px-6 py-5">
                                <CardTitle className="text-lg font-bold text-slate-800">Agregar Feriado o Cierre Excepcional</CardTitle>
                                <p className="text-sm text-slate-500">
                                    Los feriados marcados como "Día Completo" cerrarán la agenda para todos los profesionales.
                                </p>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                    <div className="space-y-2">
                                        <Label htmlFor="holidayDate">Fecha</Label>
                                        <Input 
                                            id="holidayDate"
                                            type="date" 
                                            value={newHoliday.holidayDate}
                                            onChange={(e) => setNewHoliday({...newHoliday, holidayDate: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="desc">Descripción (Ej: Navidad)</Label>
                                        <Input 
                                            id="desc"
                                            placeholder="Motivo del cierre..."
                                            value={newHoliday.description}
                                            onChange={(e) => setNewHoliday({...newHoliday, description: e.target.value})}
                                        />
                                    </div>
                                    <Button 
                                        onClick={handleAddHoliday}
                                        className="bg-sky-600 hover:bg-sky-700 text-white"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Agregar al Calendario
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm overflow-hidden">
                            <CardHeader className="border-b px-6 py-5">
                                <CardTitle className="text-lg font-bold text-slate-800">Calendario de Cierres</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                {holidays.length === 0 ? (
                                    <div className="p-10 text-center">
                                        <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                                        <p className="text-slate-400 font-medium">No hay cierres programados.</p>
                                    </div>
                                ) : (
                                    <div className="divide-y">
                                        {holidays.map((holiday) => (
                                            <div key={holiday.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex flex-col items-center justify-center text-orange-600">
                                                        <span className="text-[10px] font-bold uppercase">{format(parseISO(holiday.holidayDate), 'MMM', {locale: es})}</span>
                                                        <span className="text-lg font-black leading-none">{format(parseISO(holiday.holidayDate), 'dd')}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-800">{holiday.description}</p>
                                                        <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-100 font-medium">
                                                            Cierre Total
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => holiday.id && handleDeleteHoliday(holiday.id)}
                                                    className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* TAB: PROFESSIONALS */}
                    <TabsContent value="professionals" className="animate-in slide-in-from-top-2 duration-300 space-y-6">
                        <Card className="border-0 shadow-sm overflow-hidden mb-6">
                            <CardHeader className="bg-white border-b px-6 py-5">
                                <CardTitle className="text-lg font-bold text-slate-800">Seleccionar Profesional</CardTitle>
                                <p className="text-sm text-slate-500">
                                    Ajusta el horario laboral de cada empleado. Sus turnos no pueden exceder los horarios de apertura del negocio.
                                </p>
                            </CardHeader>
                            <CardContent className="p-6">
                                {employees.length === 0 ? (
                                    <p className="text-slate-500 italic">No tienes profesionales registrados o no se pudieron cargar.</p>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <Label>Profesional</Label>
                                        <select 
                                            className="flex h-10 w-full md:w-1/2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                                            value={selectedEmployeeId}
                                            onChange={(e) => setSelectedEmployeeId(e.target.value)}
                                        >
                                            <option value="">-- Seleccionar Profesional --</option>
                                            {employees.map(emp => (
                                                <option key={emp.id} value={emp.id}>{emp.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        
                        {selectedEmployeeId && (
                            <>
                                <EmployeeWorkScheduleForm 
                                    businessHours={employeeHours}
                                    businessLimits={businessHours}
                                    setBusinessHours={setEmployeeHours}
                                    showSubmitButton={false}
                                />
                                <div className="flex justify-end mt-6">
                                    <Button 
                                        onClick={handleSaveEmployeeHours} 
                                        disabled={saving}
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 shadow-lg shadow-orange-500/20"
                                    >
                                        {saving ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                        Guardar Horarios del Profesional
                                    </Button>
                                </div>
                            </>
                        )}
                    </TabsContent>

                    {/* TAB 3: SETTINGS */}
                    <TabsContent value="settings" className="animate-in slide-in-from-top-2 duration-300">
                        <Card className="border-0 shadow-sm overflow-hidden max-w-2xl">
                            <CardHeader className="bg-white border-b px-6 py-5">
                                <CardTitle className="text-lg font-bold text-slate-800">Configuración de Agenda</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 p-4 bg-sky-50 rounded-xl text-sky-700 border border-sky-100">
                                        <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm font-medium leading-relaxed">
                                            La <strong>Duración del Slot</strong> determina cada cuántos minutos se muestra un horario disponible en tu grilla pública. 
                                            Recomendamos 30 o 60 minutos para una agenda más limpia.
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label className="text-slate-700 font-bold">Duración de cada Intervalo (minutos)</Label>
                                        <div className="flex items-center gap-4">
                                            <select 
                                                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                                                value={slotDuration}
                                                onChange={(e) => setSlotDuration(Number(e.target.value))}
                                            >
                                                <option value={15}>15 minutos</option>
                                                <option value={20}>20 minutos</option>
                                                <option value={30}>30 minutos</option>
                                                <option value={45}>45 minutos</option>
                                                <option value={60}>60 minutos</option>
                                            </select>
                                            <Button 
                                                onClick={handleSaveSlotDuration}
                                                disabled={saving}
                                                className="bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20"
                                            >
                                                Actualizar
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t mt-6">
                                    <div className="flex items-start gap-4 p-4 border border-amber-200 bg-amber-50 rounded-xl text-amber-800">
                                        <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold mb-1">Nota sobre Excedentes</h4>
                                            <p className="text-sm opacity-90 leading-relaxed">
                                                Si un servicio dura más que el slot (ej: servicio 45m en slots de 30m), el sistema bloqueará automáticamente 
                                                los slots necesarios para cubrir la duración total. El cliente verá el próximo horario disponible recién 
                                                cuando finalice el bloque completo.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <FooterSimple />
        </div>
    );
};

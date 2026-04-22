import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BusinessHoursForm } from "@components/Forms/BusinessHoursForm";
import { IWorkSchedule } from "@interfaces/IWorkSchedule";
import { useBusinessHours } from "@hooks/useBusinessHours";
import { Clock } from "lucide-react";
import { generateInitialWeeklySchedule } from "../../utils/scheduleDefaults";

export const BusinessHoursSetup = () => {
    const navigate = useNavigate();
    const { saveBusinessHours, loading } = useBusinessHours();
    const [businessHours, setBusinessHours] = useState<IWorkSchedule[]>(
        generateInitialWeeklySchedule()
    );

    const handleCompleteSetup = async () => {
        try {
            // Validate that at least one working day exists
            const hasWorkingDays = businessHours.some((bh) => bh.isWorkingDay);
            if (!hasWorkingDays) {
                toast.warning("Debes seleccionar al menos un día laboral.");
                return;
            }

            await saveBusinessHours(businessHours);

            toast.success("¡Horarios configurados con éxito!", {
                description: "Bienvenido a tu Panel de Control.",
            });

            // Redirect to dashboard upon completion
            navigate("/dashboard");
        } catch (error) {
            console.error("Error al guardar los horarios", error);
            toast.error("Ocurrió un error al intentar guardar los horarios.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto w-full pt-4 animate-in fade-in duration-500">
            {/* Fake Wizard Progress Indicator to show progression from creation */}
            <div className="mb-10 relative">
                <div className="flex justify-between items-center relative z-10 w-full px-4 md:px-12">
                    {[{ title: "Empresa", done: true }, { title: "Ubicación", done: true }, { title: "Horarios", current: true }].map((step, index) => {
                        const isActive = !!step.current;
                        const isCompleted = !!step.done;

                        return (
                            <div key={index} className="flex flex-col items-center gap-2">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
                    ${isActive ? 'bg-orange-500 text-white shadow-orange-500/30 ring-4 ring-orange-50' :
                                            isCompleted ? 'bg-orange-100 text-orange-600' :
                                                'bg-slate-100 text-slate-400'}`}
                                >
                                    {isActive ? <Clock className="w-5 h-5" /> : <span className="font-bold text-lg">✓</span>}
                                </div>
                                <span className={`text-sm font-medium transition-colors ${isActive ? 'text-slate-800' : isCompleted ? 'text-slate-600' : 'text-slate-400'}`}>
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Progress Line */}
                <div className="absolute top-6 left-0 right-0 h-[2px] bg-slate-100 -z-0 px-16">
                    <div
                        className="h-full bg-orange-500 transition-all duration-500 ease-in-out"
                        style={{ width: `100%` }}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-1 md:p-6 transition-all duration-300">
                <div className="mb-6 px-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Configura tus Horarios de Atención</h2>
                    <p className="text-gray-500">Define en qué días y horas tu negocio estará abierto para recibir turnos. Podrás modificar esto en cualquier momento desde tu panel.</p>
                </div>

                <BusinessHoursForm
                    businessHours={businessHours}
                    setBusinessHours={setBusinessHours}
                    handleFinalSubmit={handleCompleteSetup}
                    title="Horario predeterminado"
                    showSubmitButton={false}
                />

                <div className="mt-8 flex justify-end px-4">
                    <button
                        onClick={handleCompleteSetup}
                        disabled={loading}
                        className={`px-6 py-2 rounded-lg font-medium text-white transition-colors flex items-center gap-2
              ${loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}
            `}
                    >
                        {loading ? "Guardando..." : "Finalizar y entrar al Panel"}
                    </button>
                </div>
            </div>
        </div>
    );
};

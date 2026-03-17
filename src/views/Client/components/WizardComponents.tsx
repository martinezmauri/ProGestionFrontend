import React from "react";
import { User, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@lib/utils";
import { IService } from "@interfaces/IService";

// Service Selector Component
export const ServiceSelector = ({
    services,
    selectedId,
    onSelect,
}: {
    services: IService[];
    selectedId?: number;
    onSelect: (id: number) => void;
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
                <div
                    key={service.id}
                    onClick={() => onSelect(Number(service.id))}
                    className={cn(
                        "p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 relative",
                        selectedId === Number(service.id)
                            ? "border-[#059669] bg-[#ECFDF5] shadow-md transform scale-[1.02]"
                            : "border-[#E2E8F0] bg-white hover:border-[#94A3B8] hover:shadow-sm"
                    )}
                >
                    {selectedId === Number(service.id) && (
                        <div className="absolute top-3 right-3 text-[#059669]">
                            <CheckCircle2 className="w-5 h-5 fill-current text-white" />
                        </div>
                    )}
                    <h3 className="font-bold text-[#1E293B] text-lg mb-1">{service.name}</h3>
                    <p className="text-[#64748B] text-sm mb-4 line-clamp-2 min-h-[40px]">
                        {service.description || "Sin descripción"}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-[#475569] bg-[#F1F5F9] px-2.5 py-1 rounded-lg">
                            <Clock className="w-4 h-4 mr-1.5" />
                            <span className="font-medium">{service.duration} min</span>
                        </div>
                        <span className="font-extrabold text-[#059669] text-base">
                            ${service.price}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Employee Selector Component
export const EmployeeSelector = ({
    employees,
    selectedId,
    onSelect,
}: {
    employees: { id: number; name: string }[];
    selectedId?: number | null;
    onSelect: (id: number | null) => void;
}) => {
    return (
        <div className="flex flex-wrap gap-3">
            <div
                onClick={() => onSelect(null)}
                className={cn(
                    "flex items-center gap-3 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200",
                    selectedId === null
                        ? "border-[#059669] bg-[#ECFDF5] shadow-sm"
                        : "border-[#E2E8F0] bg-white hover:border-[#94A3B8]"
                )}
            >
                <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    selectedId === null ? "bg-[#059669] text-white" : "bg-[#F1F5F9] text-[#64748B]"
                )}>
                    <User className="w-5 h-5" />
                </div>
                <div>
                    <p className="font-bold text-[#1E293B]">Cualquier Profesional</p>
                    <p className="text-xs text-[#64748B]">El primero disponible</p>
                </div>
            </div>

            {employees.map((emp) => (
                <div
                    key={emp.id}
                    onClick={() => onSelect(emp.id)}
                    className={cn(
                        "flex items-center gap-3 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200",
                        selectedId === emp.id
                            ? "border-[#059669] bg-[#ECFDF5] shadow-sm"
                            : "border-[#E2E8F0] bg-white hover:border-[#94A3B8]"
                    )}
                >
                    <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg",
                        selectedId === emp.id ? "bg-[#059669] text-white" : "bg-[#F8FAFC] text-[#334155] border border-[#E2E8F0]"
                    )}>
                        {emp.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-bold text-[#1E293B]">{emp.name}</p>
                        <p className="text-xs text-[#64748B]">Profesional</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

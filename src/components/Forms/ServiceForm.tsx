import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { IService, IServiceCreate } from "../../interfaces/IService";
import { Dashboard } from "../Sidebar/Dashboard";
import { useAuth } from "@context/AuthContext";
import { toast } from "sonner";
import { Ban } from "lucide-react";
import FechaHoraHeader from "@components/Header/FechaHoraHeader";
import { Button } from "@ui/button";
import { Textarea } from "@ui/textarea";
import { createService, updateService } from "@api/getServices";
import { getEmployeesByBusinessId } from "@api/getEmployees";
import { IEmployeeResponse } from "@interfaces/IEmployee";
import { EmployeeRol } from "@enum/EmployeeRol";

interface Props {
  onServiceCreated: () => void;
  onClose: () => void;
  service?: IService | null;
}

function safeString(val: string | number | null | undefined): string {
  return val == null ? "" : String(val);
}

function cleanUpdatePayload(form: IService): Partial<IService> {
  const cleaned: Partial<IService> = {};

  if (form.name.trim() !== "") cleaned.name = form.name;
  if (form.description.trim() !== "") cleaned.description = form.description;

  const parsedDuration = Number(form.duration);
  if (!isNaN(parsedDuration) && parsedDuration > 0) {
    cleaned.duration = parsedDuration;
  }

  const parsedPrice = Number(form.price);
  if (!isNaN(parsedPrice) && parsedPrice > 0) {
    cleaned.price = parsedPrice;
  }

  if (form.category !== undefined && form.category.trim() !== "") {
    cleaned.category = form.category;
  }

  if (form.isActive !== undefined) {
    cleaned.isActive = form.isActive;
  }

  return cleaned;
}

export const ServiceForm = ({ onServiceCreated, onClose, service }: Props) => {
  const empty: IService = {
    name: "",
    duration: 0,
    description: "",
    price: 0,
    category: "",
    isActive: true,
  };

  const [form, setForm] = useState<IService>(empty);
  const [employees, setEmployees] = useState<IEmployeeResponse[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const { userProfile } = useAuth();
  const businessId: string | null = userProfile?.businessId != null ? String(userProfile.businessId) : null;
  const userId = userProfile?.id ?? null;

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!businessId) return;
      try {
        const data = await getEmployeesByBusinessId(businessId);
        setEmployees(Array.isArray(data) ? data : []);
      } catch (error) {
        setEmployees([]);
      }
    };
    fetchEmployees();
  }, [businessId]);

  useEffect(() => {
    if (service) {
      setForm(service);
      if (service.employeeIds) {
        setSelectedEmployees(service.employeeIds.map(String));
      }
    }
  }, [service]);

  const validateForm = () => {
    return safeString(form.name).trim() && form.duration > 0 && form.price > 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      return toast.warning("Por favor, completa todos los campos.", {
        icon: <Ban />,
      });
    }

    if (!businessId) {
      toast.error("No se pudo identificar el negocio del usuario.");
      return;
    }

    try {
      if (service && service.id) {
        const cleanedData = cleanUpdatePayload(form);
        await updateService(Number(service.id), {
          ...cleanedData,
          employeeIds: selectedEmployees.map(Number),
        });
        toast.success("Servicio actualizado correctamente");
        onServiceCreated();
        onClose();
      } else {
        const payload: IServiceCreate = {
          ...form,
          businessId,
          employeeIds: selectedEmployees.map(Number),
        };
        await createService(payload);
        toast.success("Servicio creado correctamente");
        onServiceCreated();
        onClose();
      }
    } catch (error) {
      toast.error("Error al procesar el servicio");
      console.error(error);
    }
  };

  const safeEmployees = Array.isArray(employees) ? employees : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-4 rounded-t-lg">
            <h3 className="text-lg font-semibold">Información básica</h3>
          </div>
          <div className="border border-gray-200 rounded-b-lg p-6 space-y-4">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Ej: Limpieza"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Duración (minutos)
                </label>
                <input
                  name="duration"
                  type="number"
                  value={form.duration}
                  onChange={(e) =>
                    setForm({ ...form, duration: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Ej: 60"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Precio
                </label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Ej: 100"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Categoría
                </label>
                <input
                  name="category"
                  type="text"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Ej: Cortes"
                />
              </div>

              <div className="md:col-span-3">
                <label className="flex items-center space-x-3 cursor-pointer py-2">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="w-5 h-5 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Servicio Activo (Disponible para reservar)</span>
                </label>
              </div>

              <div className="md:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Descripción
                </label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Ej: Descripción del servicio"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Empleados que realizan este servicio
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 bg-gray-50 p-4 rounded-md border border-gray-200 max-h-48 overflow-y-auto">
                {safeEmployees.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No hay empleados disponibles.
                  </p>
                ) : (
                  safeEmployees.map((emp) => (
                    <div key={emp.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`emp-${emp.id}`}
                        checked={selectedEmployees.includes(String(emp.id))}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEmployees((prev) => [
                              ...prev,
                              String(emp.id),
                            ]);
                          } else {
                            setSelectedEmployees((prev) =>
                              prev.filter((id) => id !== String(emp.id)),
                            );
                          }
                        }}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`emp-${emp.id}`}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {emp.name}
                      </label>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t mt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            Cancelar
          </button>
          <Button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Guardar Servicio
          </Button>
        </div>
      </div>
    </form>
  );
};

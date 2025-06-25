import FechaHoraHeader from "@components/Header/FechaHoraHeader";
import { EmployeeRol } from "@enum/EmployeeRol";
import { IEmployee } from "@interfaces/IEmployee";
import { IService } from "@interfaces/IService";
import { Button } from "@ui/button";
import { Ban, Briefcase } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { BusinessHoursForm } from "./BusinessHoursForm";
import { createEmployee, updateEmployee } from "@api/getEmployees";
import { useAuth } from "@context/AuthContext";

interface Props {
  onPersonalCreated: () => void;
  onClose: () => void;
  employee?: IEmployee | null;
  services: IService[];
}

// Ayuda para convertir null/undefined a ""
function safeString(val: any): string {
  return val == null ? "" : String(val);
}

//Ayuda a enviar solo los campos que se modificaron
function cleanUpdatePayloadEmployee(
  form: IEmployee,
  original: IEmployee
): Partial<IEmployee> {
  const cleaned: Partial<IEmployee> = {};

  if (form.name.trim() !== original.name.trim()) cleaned.name = form.name;
  if (form.email.trim() !== original.email.trim()) cleaned.email = form.email;
  if (form.role !== original.role) cleaned.role = form.role;

  if (
    JSON.stringify(form.servicesIds.sort()) !==
    JSON.stringify(original.servicesIds.sort())
  ) {
    cleaned.servicesIds = form.servicesIds;
  }

  if (
    JSON.stringify(form.employeeHours) !==
    JSON.stringify(original.employeeHours)
  ) {
    cleaned.employeeHours = form.employeeHours;
  }

  return cleaned;
}

//REGEX para validar email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PersonalForm = ({
  onPersonalCreated,
  onClose,
  employee,
  services,
}: Props) => {
  const empty: IEmployee = {
    name: "",
    email: "",
    role: EmployeeRol.MANAGER,
    servicesIds: [],
    employeeHours: [],
  };

  const [form, setForm] = useState<IEmployee>(empty);
  const roles = Object.values(EmployeeRol);
  const { businessId } = useAuth();

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name,
        email: employee.email,
        role: employee.role,
        servicesIds: employee.servicesIds,
        employeeHours: employee.employeeHours,
      });
    }
  }, [employee]);

  const validateForm = () => {
    return (
      safeString(form.name).trim() &&
      safeString(form.email).trim() &&
      form.role &&
      form.employeeHours.length > 0
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return toast.warning("Por favor, completa todos los campos.", {
        icon: <Ban />,
      });
    }
    if (form.email && !EMAIL_REGEX.test(form.email)) {
      toast.warning("El correo no tiene un formato válido.");
      return;
    }

    if (!businessId) {
      toast.error("No se pudo identificar el negocio del usuario.");
      return;
    }

    try {
      if (employee && employee.id) {
        const cleanedData = cleanUpdatePayloadEmployee(form, employee);
        if (Object.keys(cleanedData).length === 0) {
          toast.warning("No hay cambios para actualizar.");
          return;
        }

        await updateEmployee(employee.id, cleanedData);
        toast.success("Empleado actualizado correctamente");
        onPersonalCreated();
        onClose();
      } else {
        await createEmployee({
          ...form,
          businessId: String(businessId),
          employeeHours: form.employeeHours.filter((d) => d.active),
        });
        toast.success("Empleado creado correctamente");
        onPersonalCreated();
        onClose();
      }
    } catch (error) {
      toast.error("Error al crear el empleado");
      console.error(error);
    }
  };
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FechaHoraHeader />
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="p-6">
            <form className="space-y-6">
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
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Ej: María López"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="rol"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Rol
                      </label>
                      <select
                        id="rol"
                        value={form.role}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            role: e.target.value as EmployeeRol,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        {roles.map((rol) => (
                          <option key={rol} value={rol}>
                            {rol}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Correo electrónico
                      </label>
                      <input
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="empleado@email.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-400 text-white p-4 rounded-t-lg">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Servicios que ofrece
                  </h3>
                </div>
                <div className="border border-gray-200 rounded-b-lg p-6 space-y-4">
                  <p className="text-gray-600 text-sm">
                    Selecciona todos los servicios que este empleado puede
                    realizar
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((servicio) =>
                      servicio.id !== undefined ? (
                        <div
                          key={servicio.id}
                          className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <input
                            type="checkbox"
                            id={`servicio-${servicio.id}`}
                            checked={form.servicesIds.includes(servicio.id)}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                servicesIds: e.target.checked
                                  ? [...form.servicesIds, servicio.id!]
                                  : form.servicesIds.filter(
                                      (id) => id !== servicio.id
                                    ),
                              })
                            }
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                          />
                          <div className="flex-1">
                            <label
                              htmlFor={`servicio-${servicio.id}`}
                              className="text-sm font-medium text-gray-700 cursor-pointer block"
                            >
                              {servicio.name}
                            </label>
                            <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                              <span>{servicio.price}</span>
                              <span>•</span>
                              <span>{servicio.duration}</span>
                            </div>
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Briefcase className="h-5 w-5 text-purple-600 mt-0.5" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-purple-800">
                          Especialización
                        </h4>
                        <p className="text-sm text-purple-700 mt-1">
                          Los servicios seleccionados aparecerán disponibles
                          cuando los clientes reserven turnos con este empleado.
                          Puedes modificar esta selección en cualquier momento.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <BusinessHoursForm
                  title="Horario del empleado"
                  businessHours={form.employeeHours}
                  setBusinessHours={(hours) =>
                    setForm((prev) => ({
                      ...prev,
                      employeeHours:
                        typeof hours === "function"
                          ? hours(prev.employeeHours)
                          : hours,
                    }))
                  }
                  showSubmitButton={false}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  Guardar Empleado
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </form>
  );
};

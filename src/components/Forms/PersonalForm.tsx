import FechaHoraHeader from "@components/Header/FechaHoraHeader";
import { EmployeeRol } from "@enum/EmployeeRol";
import { IEmployee, IEmployeeEditResponse } from "@interfaces/IEmployee";
import { IService } from "@interfaces/IService";
import { Button } from "@ui/button";
import { Ban, Briefcase } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
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

//REGEX para validar email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PersonalForm = ({
  onPersonalCreated,
  onClose,
  employee,
  services,
}: Props) => {
  const empty: IEmployeeEditResponse = {
    name: "",
    email: "",
    rol: EmployeeRol.MANAGER,
    services: [],
    employeeHours: [],
  };

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name,
        email: employee.email,
        rol: employee.rol,
        services: employee.serviceIds,
        employeeHours: employee.employeeHours,
      });
    }
  }, [employee]);

  const [form, setForm] = useState<IEmployeeEditResponse>(empty);
  const roles = Object.values(EmployeeRol);

  const validateForm = () => {
    return (
      safeString(form.name).trim() &&
      safeString(form.email).trim() &&
      form.rol &&
      form.services.length > 0 &&
      form.employeeHours.length > 0
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return toast.warning("Por favor, completa todos los campos.", {
        icon: <Ban />,
      });
    }
    if (form.email && !EMAIL_REGEX.test(form.email)) {
      toast.warning("El correo no tiene un formato válido.");
      return;
    }

    try {
      if (employee && employee.id) {
        /* await updateEmployee(employee.id, form); */
        toast.success("Empleado actualizado correctamente");
      } else {
        /*  await createEmployee(form); */
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
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                      value={form.rol}
                      onChange={(e) =>
                        setForm({ ...form, rol: e.target.value as EmployeeRol })
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
                  {services.map((servicio) => (
                    <div
                      key={servicio.id}
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        id={`servicio-${servicio.id}`}
                        checked={form.services.includes(servicio.id)}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            services: e.target.checked
                              ? [...form.services, servicio.id]
                              : form.services.filter(
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
                  ))}
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

              <div className="bg-gradient-to-r from-sky-500 to-sky-400 text-white p-4 rounded-t-lg">
                <h3 className="text-lg font-semibold">Horarios de atención</h3>
              </div>
              <div className="border border-gray-200 rounded-b-lg p-6 space-y-4">
                {[
                  { day: "Lunes", key: "lunes" },
                  { day: "Martes", key: "martes" },
                  { day: "Miércoles", key: "miercoles" },
                  { day: "Jueves", key: "jueves" },
                  { day: "Viernes", key: "viernes" },
                  { day: "Sábado", key: "sabado" },
                  { day: "Domingo", key: "domingo" },
                ].map((dayInfo, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`${dayInfo.key}-active`}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`${dayInfo.key}-active`}
                          className="ml-2 font-medium text-gray-700"
                        >
                          {dayInfo.day}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`${dayInfo.key}-split`}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`${dayInfo.key}-split`}
                          className="ml-2 text-sm text-gray-600"
                        >
                          Horario partido
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label
                          htmlFor={`${dayInfo.key}-open1`}
                          className="block text-sm text-gray-600 mb-1"
                        >
                          Entrada
                        </label>
                        <input
                          type="time"
                          id={`${dayInfo.key}-open1`}
                          defaultValue="09:00"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`${dayInfo.key}-close1`}
                          className="block text-sm text-gray-600 mb-1"
                        >
                          Salida
                        </label>
                        <input
                          type="time"
                          id={`${dayInfo.key}-close1`}
                          defaultValue="17:00"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 opacity-50">
                      <div>
                        <label
                          htmlFor={`${dayInfo.key}-open2`}
                          className="block text-sm text-gray-600 mb-1"
                        >
                          Reingreso
                        </label>
                        <input
                          type="time"
                          id={`${dayInfo.key}-open2`}
                          defaultValue="15:00"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          disabled
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`${dayInfo.key}-close2`}
                          className="block text-sm text-gray-600 mb-1"
                        >
                          Salida final
                        </label>
                        <input
                          type="time"
                          id={`${dayInfo.key}-close2`}
                          defaultValue="19:00"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-sky-600 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-sky-800">
                        Configuración de horarios
                      </h4>
                      <p className="text-sm text-sky-700 mt-1">
                        Los horarios configurados aquí determinarán la
                        disponibilidad del empleado para recibir turnos. El
                        horario partido permite manejar negocios que cierran al
                        mediodía.
                      </p>
                    </div>
                  </div>
                </div>
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

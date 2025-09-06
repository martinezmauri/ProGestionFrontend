import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IService } from "../../interfaces/IService";
import { Dashboard } from "../Sidebar/Dashboard";
import { useAuth } from "@context/AuthContext";
import { toast } from "sonner";
import { Ban } from "lucide-react";
import FechaHoraHeader from "@components/Header/FechaHoraHeader";
import { Button } from "@ui/button";
import { Textarea } from "@ui/textarea";
import { createService, updateService } from "@api/getServices";

interface Props {
  onServiceCreated: () => void;
  onClose: () => void;
  service?: IService | null;
}

function safeString(val: any): string {
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

  return cleaned;
}

export const ServiceForm = ({ onServiceCreated, onClose, service }: Props) => {
  const empty: IService = {
    name: "",
    duration: 0,
    description: "",
    price: 0,
  };

  const [form, setForm] = useState<IService>(empty);
  const { businessId, userInfo } = useAuth();

  useEffect(() => {
    if (service) {
      setForm(service);
    }
  }, [service]);

  const validateForm = () => {
    return safeString(form.name).trim() && form.duration > 0 && form.price > 0;
  };

  const handleSubmit = async () => {
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
        if (Object.keys(cleanedData).length === 0) {
          toast.warning("No hay cambios para actualizar.");
          return;
        }
        await updateService(Number(service.id), cleanedData);
        toast.success("Servicio actualizado correctamente");
        onServiceCreated();
        onClose();
      } else {
        console.log(form);

        await createService({
          ...form,
          businessId: String(businessId),
        });
        toast.success("Servicio creado correctamente");
        onServiceCreated();
        onClose();
      }
    } catch (error) {
      toast.error("Error al crear el servicio");
      console.error(error);
    }
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Ej: Limpieza"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="duration"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Duración
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
                      <label htmlFor="duration">Minutos</label>
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
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Descripcion
                      </label>
                      <Textarea
                        name="description"
                        value={form.description}
                        onChange={(e) =>
                          setForm({ ...form, description: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Ej: Descripcion del servicio"
                      />
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
                  Guardar Servicio
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </form>
  );
};

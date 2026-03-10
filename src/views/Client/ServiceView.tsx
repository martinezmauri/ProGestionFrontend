import React, { useEffect, useState } from "react";
import { IService } from "@interfaces/IService";
import { useAuth } from "@context/AuthContext";
import { getServiceByBusinessId, deleteService } from "@api/getServices";
import { toast } from "sonner";
import AppSidebar from "@components/Sidebar/AppSidebar";
import { AppHeader } from "@components/Header/AppHeader";
import { Card, CardContent, CardHeader } from "@ui/card";
import { Button } from "@ui/button";
import { Plus } from "lucide-react";
import { FooterSimple } from "@components/Footer/FooterSimple";
import { ServicesTable } from "@components/Tables/ServicesTable";
import { ServiceModal } from "@components/Modals/ServiceModal";

export const ServiceView = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { businessId, isAuthenticated } = useAuth();

  const loadServices = async () => {
    if (!businessId) return;
    setLoading(true);
    const data = await getServiceByBusinessId(businessId);
    setServices(data ?? []);
    setLoading(false);
  };

  const handleDelete = async (service: IService) => {
    if (!service.id) return;
    const confirm = window.confirm(
      `¿Estás seguro de que deseas eliminar el servicio "${service.name}"? Esta acción no se puede deshacer.`
    );
    if (!confirm) return;

    try {
      const success = await deleteService(Number(service.id));
      if (success) {
        toast.success("Servicio eliminado correctamente");
        loadServices();
      } else {
        toast.error("Error al eliminar el servicio");
      }
    } catch (error) {
      toast.error("Error al eliminar el servicio");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadServices();
    }
  }, [isAuthenticated]);

  const filteredServices = services.filter((s) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(term) ||
      (s.category && s.category.toLowerCase().includes(term))
    );
  });

  return (
    <div className="flex flex-col flex-1 w-full animate-in fade-in duration-500">
      <div className="flex-1 p-6 md:p-10 space-y-4 max-w-7xl mx-auto w-full">
        <AppHeader title="Servicios" />
        <p className="text-slate-500 text-base">
          Gestiona los servicios de tu negocio.
        </p>
        <Card className="w-full border-0 shadow-sm mt-6">
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-100">
            <span className="text-xl font-bold text-slate-800">
              Listado de Servicios
            </span>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Buscar servicio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
              />
              <Button
                className="bg-orange-500 hover:bg-orange-600 shadow-md text-white cursor-pointer px-6 w-full sm:w-auto shrink-0"
                onClick={() => {
                  setSelectedService(null);
                  setOpenModal(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Servicio
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <ServicesTable
                services={filteredServices}
                loading={loading}
                onEdit={(service) => {
                  setSelectedService(service);
                  setOpenModal(true);
                }}
                onDelete={handleDelete}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <FooterSimple />

      <ServiceModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onServiceCreated={loadServices}
        service={selectedService}
      />
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { IService } from "@interfaces/IService";
import { useAuth } from "@context/AuthContext";
import { getServiceByBusinessId } from "@api/getServices";
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
  const { session, userProfile } = useAuth();
  const isAuthenticated = !!session;
  const businessId: string | null = userProfile?.businessId != null ? String(userProfile.businessId) : null;

  const loadServices = async () => {
    if (!businessId) return;
    setLoading(true);
    const data = await getServiceByBusinessId(Number(businessId));
    setServices(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadServices();
    }
  }, [isAuthenticated]);

  if (!businessId) {
    return <div>Cargando datos del negocio...</div>;
  }

  return (
    <div className="flex flex-col flex-1 w-full animate-in fade-in duration-500">
      <div className="flex-1 p-6 md:p-10 space-y-4 max-w-7xl mx-auto w-full">
        <AppHeader title="Servicios" />
        <p className="text-slate-500 text-base">
          Gestiona los servicios de tu negocio.
        </p>
        <Card className="w-full border-0 shadow-sm mt-6">
          <CardHeader className="flex justify-between items-center pb-6 border-b border-gray-100">
            <span className="text-xl font-bold text-slate-800">
              Listado de Servicios
            </span>
            <div className="flex items-center gap-2">
              <Button
                className="bg-orange-500 hover:bg-orange-600 shadow-md text-white cursor-pointer px-6"
                onClick={() => setOpenModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Servicio
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <ServicesTable
                services={services}
                loading={loading}
                onEdit={(service) => {
                  setSelectedService(service);
                  setOpenModal(true);
                }}
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

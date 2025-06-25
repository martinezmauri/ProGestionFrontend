import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IService } from "@interfaces/IService";
import { Dashboard } from "@components/Sidebar/Dashboard";
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
  const { businessId, isAuthenticated } = useAuth();

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

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      {/* Contenedor principal del contenido (vertical) */}
      <div className="flex flex-col flex-1">
        <div className="flex-1 p-6 space-y-3">
          <AppHeader title="Servicios" />
          <p className="text-muted-foreground">
            Gestiona los servicios de tu negocio.
          </p>
          <Card className="w-full">
            <CardHeader className="flex justify-between items-center">
              <span className="text-lg font-semibold">
                Listado de Servicios
              </span>
              <div className="flex items-center gap-2">
                <Button
                  className="bg-gradient-to-r from-orange-500 to-orange-400 text-white cursor-pointer"
                  variant="outline"
                  onClick={() => setOpenModal(true)}
                >
                  <Plus className="h-4 w-4" />
                  Agregar Servicio
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
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

        {/* Footer al final del contenido, centrado */}
        <FooterSimple />
      </div>
      {/* Modal afuera del layout visual principal */}
      <ServiceModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onServiceCreated={loadServices}
        service={selectedService}
      />
    </div>
  );
};

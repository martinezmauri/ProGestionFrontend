import { getEmployeesByUserId } from "@api/getEmployees";
import { AppHeader } from "@components/Header/AppHeader";
import { PersonalModal } from "@components/Modals/PersonalModal";
import { PersonalTable } from "@components/Tables/PersonalTable";
import { IEmployee, IEmployeeResponse } from "@interfaces/IEmployee";
import { Card, CardContent, CardHeader } from "@ui/card";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@context/AuthContext";
import { IService } from "@interfaces/IService";
import { getServiceByUserId } from "@api/getServices";
import { Button } from "@ui/button";
import { FooterSimple } from "@components/Footer/FooterSimple";

export const Personal = () => {
  const [empleados, setEmpleados] = useState<IEmployeeResponse[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPersonal, setSelectedPersonal] = useState<IEmployee | null>(
    null
  );
  const { userId, isAuthenticated } = useAuth();

  const loadEmployees = async () => {
    if (!userId) return;
    setLoading(true);
    const data = await getEmployeesByUserId(Number(userId));
    setEmpleados(data ?? []);
    setLoading(false);
  };

  const loadServices = async () => {
    if (!userId) return;
    setLoading(true);
    const data = await getServiceByUserId(Number(userId));
    setServices(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadEmployees();
      loadServices();
    }
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* <Dashboard /> */}
      <div className="flex-1 p-6 space-y-3">
        <AppHeader title="Personal" />
        <p className="text-muted-foreground">Gestiona tu equipo de trabajo.</p>
        <Card className="w-full">
          <CardHeader className="flex justify-between items-center">
            <span className="text-lg font-semibold">Listado de Empleados</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setOpenModal(true)}>
                <Plus className="h-4 w-4" />
                Agregar Empleado
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-x-auto">
              <PersonalTable
                employees={empleados}
                loading={loading}
                onEdit={(employee) => {
                  const mapped: IEmployee = {
                    id: employee.id,
                    name: employee.name,
                    email: employee.email,
                    profile_picture: employee.profile_picture,
                    serviceIds: employee.services.map((s) => s.id),
                    businessId: employee.businessId,
                    rol: employee.rol,
                    employeeHours: employee.employeeHours,
                  };

                  setSelectedPersonal(mapped);
                  setOpenModal(true);
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <FooterSimple />

      <PersonalModal
        services={services}
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedPersonal(null);
        }}
        onPersonalCreated={loadEmployees}
        employee={selectedPersonal}
      />
    </div>
  );
};

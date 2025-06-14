import { getEmployeesByUserId } from "@api/getEmployees";
import { AppHeader } from "@components/Header/AppHeader";
import { PersonalModal } from "@components/Modals/PersonalModal";
import { Dashboard } from "@components/Sidebar/Dashboard";
import { PersonalTable } from "@components/Tables/PersonalTable";
import { IEmployeeTableResponse } from "@interfaces/IEmployee";
import { Card, CardContent, CardHeader } from "@ui/card";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@context/AuthContext";
import { IService } from "@interfaces/IService";
import { getServiceByUserId } from "@api/getServices";

export const Personal = () => {
  const [empleados, setEmpleados] = useState<IEmployeeTableResponse[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
      <div className="flex flex-1">
        <Dashboard />
        <div className="flex-1 p-6 space-y-3 overflow-x-auto max-w-full">
          <AppHeader title="Personal" />
          <p className="text-muted-foreground">
            Gestiona tu equipo de trabajo.
          </p>
          <Card className="w-full">
            <CardHeader>
              <PersonalModal
                services={services}
                onPersonalCreated={async () => {
                  await loadEmployees();
                  toast.success("Empleado creado", {
                    description: "Se añadió correctamente.",
                    icon: <CheckCircle2 className="h-4 w-4" />,
                  });
                }}
              />
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <PersonalTable employees={empleados} loading={loading} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

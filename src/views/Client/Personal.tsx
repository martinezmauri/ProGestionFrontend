import getEmployeesByBusinessId from "@api/getEmployees";
import { AppHeader } from "@components/Header/AppHeader";
import { PersonalModal } from "@components/Modals/PersonalModal";
import { Dashboard } from "@components/Sidebar/Dashboard";
import { PersonalTable } from "@components/Tables/PersonalTable";
import { Rol } from "@enum/UserRol";
import { IEmployeeTableResponse } from "@interfaces/IEmployee";
import { Card, CardContent, CardHeader } from "@ui/card";
import { CheckCircle2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export const Personal = () => {
  const [empleados, setEmpleados] = useState<IEmployeeTableResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadEmployees = async () => {
    setLoading(true);
    const data = await getEmployeesByBusinessId(1);
    setEmpleados(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

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

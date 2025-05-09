import { Dashboard } from "@components/Sidebar/Dashboard";
import { PersonalTable } from "@components/Tables/PersonalTable";
import { Rol } from "@enum/UserRol";
import { IEmployeeTableResponse } from "@interfaces/IEmployee";
import { Card, CardContent, CardHeader } from "@ui/card";
import React from "react";

export const Personal = () => {
  const empleados: IEmployeeTableResponse[] = [
    {
      id: "1",
      name: "Juan Pérez",
      profilePicture: "https://ui-avatars.com/api/?name=John+Doe",
      rol: Rol.Admin,
      service: {
        id: "srv1",
        name: "Corte de cabello",
      },
    },
    {
      id: "2",
      name: "María Gómez",
      profilePicture: "https://ui-avatars.com/api/?name=John+Doe",
      rol: Rol.Client,
      service: {
        id: "srv2",
        name: "Peinado",
      },
    },
    {
      id: "3",
      name: "Carlos Ramírez",
      profilePicture: "https://ui-avatars.com/api/?name=John+Doe",
      rol: Rol.Employee,
      service: {
        id: "srv3",
        name: "Coloración",
      },
    },
  ];
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex flex-1">
        <Dashboard />
        <div className="flex-1 p-6 space-y-6 mt-40">
          <Card className="w-full">
            <CardContent className="overflow-x-auto">
              <PersonalTable employees={empleados} loading={false} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

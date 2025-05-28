import { Rol } from "@enum/UserRol";
import { IService } from "@interfaces/IService";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Input } from "@ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const exampleService: IService[] = [
  {
    id: "1",
    name: "Corte de cabello",
    duration: 30,
    description: "Corte de cabello tradicional para hombre o mujer",
    price: 1500,
  },
  {
    id: "2",
    name: "Manicura",
    duration: 45,
    description: "Servicio completo de manicura con esmalte",
    price: 2000,
  },
  {
    id: "3",
    name: "Masaje relajante",
    duration: 60,
    description: "Masaje corporal completo para aliviar tensiones",
    price: 3500,
  },
];

interface Props {
  onPersonalCreated: () => void;
}

export const PersonalModal = ({ onPersonalCreated }: Props) => {
  const roles = Object.values(Rol);
  const [employee, setEmployee] = useState({
    name: "",
    profilePicture: "",
    serviceIds: [],
    businessId: "",
    rol: "",
    email: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    /* comprobar campos vacios */
    try {
      /* await createEmployee(employee) */
      console.log("Empleado creado:", employee);
      onPersonalCreated();
      setEmployee({
        name: "",
        profilePicture: "",
        serviceIds: [],
        businessId: "",
        rol: "",
        email: "",
      });
    } catch (error) {
      toast.error("Error al crear el empleado.", {
        description: "Por favor, inténtalo de nuevo.",
      });
    }
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-semibold">Lista de Empleados</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#F97316] hover:bg-orange-600">
            <Plus className="w-4 h-4 mr-2" />
            Añadir Personal
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo Empleado</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="nombre"
                placeholder="Nombre"
                value={employee.name}
                onChange={(e) =>
                  setEmployee({ ...employee, name: e.target.value })
                }
              />
              {/* Input para seleccionar imagen */}
              <Select
                value={employee.rol}
                onValueChange={(value: Rol) =>
                  setEmployee((prev) => ({ ...prev, rol: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione el rol" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((rol) => (
                    <SelectItem key={rol} value={rol}>
                      {rol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                id="email"
                placeholder="Correo electrónico"
                value={employee.email}
                onChange={(e) =>
                  setEmployee({ ...employee, email: e.target.value })
                }
              />

              {/* Select con los servicios del negocio */}
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-[#F97316]">
                Crear Empleado
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

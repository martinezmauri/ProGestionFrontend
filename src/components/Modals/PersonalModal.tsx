import { EmployeeRol } from "@enum/EmployeeRol";
import { IEmployee } from "@interfaces/IEmployee";
import { IService } from "@interfaces/IService";
import { Button } from "@ui/button";
import { Checkbox } from "@ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Input } from "@ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
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

interface Props {
  services: IService[];
  onPersonalCreated: () => void;
}

export const PersonalModal = ({ services, onPersonalCreated }: Props) => {
  console.log(services);

  const roles = Object.values(EmployeeRol);
  const [employee, setEmployee] = useState<IEmployee>({
    name: "",
    profile_picture: "",
    serviceIds: [],
    businessId: "",
    rol: EmployeeRol.MANAGER,
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
        profile_picture: "",
        serviceIds: [],
        businessId: "",
        rol: EmployeeRol.MANAGER,
        email: "",
      });
    } catch (error) {
      toast.error("Error al crear el empleado.", {
        description: "Por favor, inténtalo de nuevo.",
      });
    }
  };

  return (
    <div className="flex justify-end items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#F97316] hover:bg-orange-600 rounded-sm">
            <Plus className="w-4 h-4 mr-2" />
            Añadir Personal
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo Empleado</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Input
                id="nombre"
                placeholder="Nombre"
                value={employee.name}
                onChange={(e) =>
                  setEmployee({ ...employee, name: e.target.value })
                }
              />
              <Select
                value={employee.rol}
                onValueChange={(value: EmployeeRol) =>
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

              <Popover>
                <PopoverTrigger className="w-full">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between"
                  >
                    {employee.serviceIds.length > 0
                      ? services
                          .filter((s) => employee.serviceIds.includes(s.id))
                          .map((s) => s.name)
                          .join(", ")
                      : "Selecciona servicios"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col gap-2">
                    {services.map((service) => (
                      <label
                        key={service.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={employee.serviceIds.includes(service.id)}
                          onCheckedChange={(checked) => {
                            setEmployee((prev) => ({
                              ...prev,
                              serviceIds: checked
                                ? [...prev.serviceIds, service.id]
                                : prev.serviceIds.filter(
                                    (id) => id !== service.id
                                  ),
                            }));
                          }}
                        />
                        {service.name}
                      </label>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

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
              <Button onClick={handleSubmit} className="bg-[#F97316]">
                Crear Empleado
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

import { DaysWithCheckbox } from "@components/Dropdowns/DaysWithCheckbox";
import { Rol } from "@enum/UserRol";
import { WeekDays } from "@enum/WeekDays";
import useHandlePersonalView from "@hooks/useHandlePersonalView";
import { useRegistrationPersonal } from "@hooks/useRegistrationPersonal";
import { IEmployee } from "@interfaces/IEmployee";
import { IService } from "@interfaces/IService";
import { IWorkSchedule } from "@interfaces/IWorkSchedule";
import { Button } from "@ui/button";
import { Card } from "@ui/card";
import { Input } from "@ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import React, { useEffect, useRef, useState } from "react";
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

export const PersonalEditForm = () => {
  const { services } = useHandlePersonalView();
  const roles = Object.values(Rol);
  const [isOpen, setIsOpen] = useState(false);
  const [workDays, setWorkDays] = useState<WeekDays[]>([]);
  const [personalSchedule, setPersonalSchedule] = useState<IWorkSchedule[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [employee, setEmployee] = useState<IEmployee>({
    id: null,
    name: "",
    profilePicture: "",
    serviceIds: [],
    businessId: null,
    rol: Rol.Employee,
  });
  const [imageUrl, setImageUrl] = useState<string>("");

  const { error, loading, success, registerHoursPersonal, registerPersonal } =
    useRegistrationPersonal();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const { id, ...employeeWithoutId } = employee;
      registerPersonal(employee);
      registerHoursPersonal(personalSchedule);
      if (success) {
        toast.success("Operacion Existosa", {
          description: "Empleado creado y/o actualizado.",
        });
      }
    } catch (error) {
      toast.error("Hemos tenido un error al crear el empleado");
      console.error("Error al guardar horarios del empleado", error);
    }
  };

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (employee.profilePicture) {
      setImageUrl(employee.profilePicture);
    } else {
      setImageUrl("/assets/user-logo.png");
    }
  }, [employee.profilePicture]);

  const handleCheckboxChange = (id: string) => {
    setEmployee((prevEmployee) => {
      const isSelected = prevEmployee.serviceIds.includes(id);

      const updatedServiceIds = isSelected
        ? prevEmployee.serviceIds.filter((serviceId) => serviceId !== id)
        : [...prevEmployee.serviceIds, id];

      return {
        ...prevEmployee,
        serviceIds: updatedServiceIds,
      };
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
      setEmployee({
        ...employee,
        profilePicture: URL.createObjectURL(selectedFile),
      });
    }
  };

  const handleScheduleChange = (newSchedule: IWorkSchedule[]) => {
    setPersonalSchedule(newSchedule);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Card className="rounded-xl p-[2vh] w-[40vw] ">
        <div className="bg-[#78b3ce] rounded-xl p-10 flex flex-col gap-5">
          <h1 className="text-center text-[1.5em] font-medium border-b">
            Personal Edit
          </h1>
          <section className="flex flex-row items-center justify-center gap-20 pt-[20px]">
            <div>
              <div
                className="relative w-15 h-15 rounded-md overflow-hidden cursor-pointer border border-black"
                onClick={() => fileInputRef.current?.click()}
              >
                <img
                  src={imageUrl}
                  alt="Foto de Perfil"
                  className="object-cover w-full h-full"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Nombre"
                className="border rounded-md  border-black"
                value={employee.name}
                onChange={(e) =>
                  setEmployee({ ...employee, name: e.target.value })
                }
              />
            </div>
          </section>

          <section className="flex flex-row items-center justify-center gap-10 pt-[20px]">
            <div className="relative inline-block">
              <button
                type="button"
                onClick={(e) => toggleDropdown(e)}
                className="rounded-md px-[15px] py-[6px] text-black border  border-black cursor-pointer text-[0.9em]"
              >
                Seleccionar servicios
              </button>
              {isOpen && (
                <div className="absolute left-0 z-10 bg-white rounded-xl p-[8px] max-h-[200px] w-full">
                  {exampleService.map((service) => (
                    <label
                      key={service.id}
                      className="flex items-center gap-[8px] p-[6px] rounded-lg cursor-pointer text-black"
                    >
                      <input
                        type="checkbox"
                        value={service.id}
                        onChange={() => handleCheckboxChange(service.id)}
                        checked={employee.serviceIds.includes(service.id)}
                      />
                      {service.name}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div>
              <Select
                value={employee.rol}
                onValueChange={(value: Rol) =>
                  setEmployee((prev) => ({ ...prev, rol: value }))
                }
              >
                <SelectTrigger className=" rounded-md  border-black text-black">
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
            </div>
          </section>
        </div>
      </Card>
      {/* HorariosForm */}

      <article className="flex gap-[20px] p-[20px]">
        <Button className="bg-[#295366] p-[15px] rounded-3xl text-white text-[1em] ">
          Volver
        </Button>
        <Button
          className="bg-[#F96E2A] p-[15px] rounded-3xl text-white text-[1em]"
          onClick={handleSubmit}
        >
          Aceptar
        </Button>
      </article>
    </div>
  );
};

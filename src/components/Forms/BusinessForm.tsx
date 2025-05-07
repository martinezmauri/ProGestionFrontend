import React from "react";
import { Input } from "@ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { IRegisterBusiness } from "@interfaces/IRegisterBusiness";
import useHandleBusinessForm from "@hooks/useHandleBusinessForm";

interface Props {
  registerData: IRegisterBusiness;
  setRegisterData: React.Dispatch<React.SetStateAction<IRegisterBusiness>>;
}

export const BusinessForm = ({ registerData, setRegisterData }: Props) => {
  const { categories } = useHandleBusinessForm();

  return (
    <div>
      <h1 className="w-[60vh] text-center bg-[#ff8245] p-2 text-[1em] text-medium">
        Datos principales
      </h1>
      <div className="flex gap-[20px] flex-col mt-5">
        <Input
          className="w-full p-[1vh] border-black border rounded-lg text-black focus:text-black"
          placeholder="Nombre del negocio"
          type="text"
          id="name"
          value={registerData.business.name}
          onChange={(e) =>
            setRegisterData((prev) => ({
              ...prev,
              business: { ...prev.business, name: e.target.value },
            }))
          }
        />
        <div className="flex gap-4">
          <Input
            className="w-full p-[1vh] border-black border rounded-lg [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Numero telefonico de la empresa"
            type="number"
            id="phone"
            value={registerData.business.phone_number}
            onChange={(e) =>
              setRegisterData((prev) => ({
                ...prev,
                business: { ...prev.business, phone_number: e.target.value },
              }))
            }
          />
          <Select
            onValueChange={(value) =>
              setRegisterData((prev) => ({
                ...prev,
                id_category: Number(value),
              }))
            }
          >
            <SelectTrigger className=" rounded-lg bg-[#d9d9d9] text-[#474950] border-black bg-transparent">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Input
          className="w-full p-[1vh] border-black border rounded-lg"
          placeholder="Descripcion"
          type="text"
          id="description"
          value={registerData.business.description}
          onChange={(e) =>
            setRegisterData((prev) => ({
              ...prev,
              business: { ...prev.business, description: e.target.value },
            }))
          }
        />
      </div>
    </div>
  );
};

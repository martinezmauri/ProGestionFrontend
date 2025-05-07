import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@ui/select";
import React from "react";
interface Props {
  services: { id: number; name: string }[];
}

const ServicesGrid = ({ services }: Props) => {
  return (
    <div className="bg-[#C9E6F0] m-10 rounded-xl flex  items-center">
      <h1 className="p-10 pl-30">Servicios:</h1>
      <Select>
        <SelectTrigger className=" rounded-lg bg-[#d9d9d9] text-[#474950] border-black bg-transparent">
          <SelectValue placeholder="Seleccione un servicio" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {services.map((s) => (
            <SelectItem key={s.id} value={String(s.id)}>
              {s.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ServicesGrid;

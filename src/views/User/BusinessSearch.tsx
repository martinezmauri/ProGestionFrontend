import React, { useEffect, useState } from "react";
import { NavbarUser } from "@components/Navbars/NavbarUser";
import categories from "@helpers/category.json";
import { useLocation } from "react-router-dom";
import { SearchDetail } from "@components/Details/SearchDetail";
import axios from "axios";
import { Input } from "@ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { MapPin, Search } from "lucide-react";

export const BusinessSearch = () => {
  const location = useLocation();
  const stateSearchBusiness = location.state?.searchBusiness || {
    nameEstablishment: "",
    location: "",
    category: "",
  };

  const [searchBusiness, setSearchBusiness] = useState(stateSearchBusiness);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    setSearchBusiness((prevState: any) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const handleOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        /* Que llegue el negocio con la address */
        "http://localhost:8080/api/v0/business/search",
        {
          params: {
            name: searchBusiness.nameEstablishment,
            category: searchBusiness.category,
            city: searchBusiness.location,
          },
        }
      );
      console.log(response.data);

      setSearchBusiness(response.data);
    } catch (error) {
      console.error("Error al realizar la busqueda.", error);
    }
  };

  return (
    <div>
      <NavbarUser />
      <form className="flex justify-center p-[20px]">
        <div className="flex flex-row bg-[#295366] rounded-4xl p-[10px] gap-[20px]">
          <section className="relative">
            <div className="relative flex items-center bg-[#d9d9d9] rounded-4xl">
              <MapPin color="#ffffff" className="w-[20px] h-[20px] ml-[8px]" />

              <Input
                type="text"
                id="location"
                value={searchBusiness.location}
                onChange={(event) => handleChange(event, "location")}
                className="bg-[#d9d9d9] rounded-4xl p-[6px] border-none shadow-none focus:ring-0 focus:outline-none"
                placeholder="Ubicación"
              />
            </div>
          </section>
          <section className="relative">
            <div className="relative flex items-center bg-[#d9d9d9] rounded-4xl">
              <Search color="#ffffff" className="w-[20px] h-[20px] ml-[8px]" />
              <Input
                type="text"
                id="establishment"
                value={searchBusiness.nameEstablishment}
                onChange={(event) => handleChange(event, "nameEstablishment")}
                className="bg-[#d9d9d9] rounded-4xl p-[6px] w-[250px]"
                placeholder="Nombre del establecimiento"
              />
            </div>
          </section>
          <section className="relative">
            <div className="relative flex items-center bg-[#d9d9d9] rounded-4xl">
              <Select
                onValueChange={(value) =>
                  handleChange(
                    {
                      target: { value },
                    } as React.ChangeEvent<HTMLInputElement>,
                    "category"
                  )
                }
              >
                <SelectTrigger className="w-[260px] rounded-3xl bg-[#d9d9d9] text-[#474950]">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </section>
          <button
            className="flex items-center gap-[8px] py-[8px] px-[16px] rounded-4xl bg-[#f96e2a] text-white cursor-pointer"
            onClick={handleOnClick}
          >
            <Search color="#ffffff" className="w-[20px] h-[20px]" />
            Buscar
          </button>
        </div>
      </form>
      <SearchDetail business={searchBusiness} />
    </div>
  );
};

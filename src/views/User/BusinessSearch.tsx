import React, { useState } from "react";
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
import { ArrowLeft, Building, Calendar, MapPin, Search } from "lucide-react";
import { Button } from "@ui/button";
import { FooterUser } from "@components/Footer/FooterUser";

export const BusinessSearch = () => {
  const location = useLocation();
  const stateSearchBusiness = location.state?.searchBusiness || {
    nameEstablishment: "",
    location: "",
    category: "",
  };
  const resultSearch = location.state?.resultSearch || [];
  const [result, setResult] = useState(resultSearch);
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
        "http://localhost:8080/api/v0/business/search",
        {
          params: {
            name: searchBusiness.nameEstablishment,
            category: searchBusiness.category,
            city: searchBusiness.location,
          },
        }
      );

      setSearchBusiness(response.data);
    } catch (error) {
      console.error("Error al realizar la busqueda.", error);
    }
  };

  return (
    <div className="bg-[#F2FAFF] h-full w-full">
      {/* <ArrowLeft className="w-4 h-4 mr-1" />  agregar para volver al landing*/}
      <NavbarUser />
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-y-5 gap-x-3">
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <Input
                  type="text"
                  id="location"
                  value={searchBusiness.location}
                  onChange={(event) => handleChange(event, "location")}
                  className="pl-10 bg-white border-gray-200 focus:border-sky-500 "
                  placeholder="Ubicación"
                />
              </div>
              <div className="relative">
                <Building
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  type="text"
                  id="establishment"
                  value={searchBusiness.nameEstablishment}
                  onChange={(event) => handleChange(event, "nameEstablishment")}
                  className="pl-10 bg-white border-gray-200 focus:border-sky-500"
                  placeholder="Nombre del establecimiento"
                />
              </div>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
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
                  <SelectTrigger className=" w-full pl-10 bg-white border-0 border-b border-gray-200 focus:border-sky-500 focus:ring-0 rounded-none h-10">
                    <SelectValue placeholder="Categoría" />
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
              <Button className="bg-sky-600 hover:bg-sky-700 ml-10">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>
      <SearchDetail business={result} />
      <FooterUser />
    </div>
  );
};

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import category from "../../helpers/category.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { ICategory } from "../../interfaces/ICategory";
import { Card, CardContent } from "@ui/card";

export const HeroUser = () => {
  const { isAuthenticated } = useAuth0();
  const [searchBusiness, setSearchBusiness] = useState({
    nameEstablishment: "",
    location: "",
    category: "",
  });
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [resultSearch, setResultSearch] = useState();
  const showWelcome = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    setCategories(category);
  }, []);

  useEffect(() => {
    if (isAuthenticated && !showWelcome.current) {
      toast("Bienvenido!", { position: "bottom-right", duration: 1000 });
      showWelcome.current = true;
    }
  }, [isAuthenticated]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    setSearchBusiness((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const handleOnSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
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
      const result = response.data;
      setResultSearch(result);

      navigate("/search", { state: { searchBusiness, resultSearch: result } });
    } catch (error) {
      console.error("Error al realizar la busqueda.", error);
    }
  };

  return (
    <motion.main
      className="grid  md:grid-cols-2 gap-y-10 md:gap-x-30 px-6 md:px-10 py-16 md:py-20 bg-[#F2FAFF]"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Izquierda */}
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500 mb-6 leading-tight">
          Sacá tu turno de manera fácil y rápida
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Seleccioná tu ubicación y elegí el establecimiento que más te
          convenga!
        </p>
        <div className="space-y-4 md:pr-12">
          {[
            "Busca el establecimiento por ubicación o nombre",
            "Selecciona el servicio que necesitas",
            "Elige la fecha y hora que prefieras",
            "¡Listo! Recibirás una confirmación de tu turno",
          ].map((text, i) => (
            <div key={i} className="flex items-center space-x-2 text-gray-700">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="font-bold text-orange-500">{i + 1}</span>
              </div>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Derecha */}
      <form className="max-w-xl">
        <Card className="border-0 shadow-lg overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardContent className="px-6">
            <h1 className="text-xl font-semibold text-gray-800 mb-6">
              Encuentra tu próximo turno
            </h1>
            <div className="space-y-4">
              <Input
                className="bg-white border-gray-200 focus:border-sky-500 border rounded-md"
                type="text"
                id="establishment"
                value={searchBusiness.nameEstablishment}
                onChange={(event) => handleChange(event, "nameEstablishment")}
                placeholder="Nombre del establecimiento"
              />
              <Input
                className="bg-white border-gray-200 focus:border-sky-500 border rounded-md"
                type="text"
                id="location"
                value={searchBusiness.location}
                onChange={(event) => handleChange(event, "location")}
                placeholder="Selecciona tu localidad"
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
                <SelectTrigger className="bg-white border-gray-200 focus:border-sky-500 w-full">
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
            <Button
              className="rounded-md text-lg w-full p-4 font-bold bg-[#0284C7] cursor-pointer hover:bg-sky-700"
              onClick={handleOnSubmit}
            >
              Buscar
            </Button>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Categorías populares
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Peluquerías", "Spa", "Dentistas", "Médicos", "Estética"].map(
                  (category, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="rounded-full border-gray-200 text-gray-700 hover:border-sky-500 hover:text-sky-700 cursor-pointer"
                    >
                      {category}
                    </Button>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </motion.main>
  );
};

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
import useLoadCategories from "@hooks/useLoadCategories";

interface ISearch {
  id: number;
  name: string;
  description: string;
  phone_number: string;
  logo: string;
  address: {
    id: number;
    street_number: number;
    province: string;
    country: string;
    street: string;
    city: string;
  };
  category: {
    id: number;
    name: string;
  };
}

interface Props {
  formRef: React.RefObject<HTMLFormElement>;
}

export const HeroUser = ({ formRef }: Props) => {
  const { isAuthenticated } = useAuth0();
  const [searchBusiness, setSearchBusiness] = useState({
    nameEstablishment: "",
    location: "",
    category: "",
  });
  const [resultSearch, setResultSearch] = useState<ISearch[]>();
  const [errors, setErrors] = useState({
    location: false,
    category: false,
  });
  const showWelcome = useRef(false);
  const navigate = useNavigate();
  const { categories, loading } = useLoadCategories();

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

    const newErrors = {
      location: searchBusiness.location.trim() === "",
      category: searchBusiness.category.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.location || newErrors.category) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/business/search`,
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
      <form className="max-w-xl" ref={formRef}>
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
              <div className="space-y-1">
                <Input
                  className={`bg-white border rounded-md ${
                    errors.location ? "border-red-500" : "border-gray-200"
                  } focus:border-sky-500`}
                  type="text"
                  id="location"
                  value={searchBusiness.location}
                  onChange={(event) => handleChange(event, "location")}
                  placeholder="Selecciona tu localidad"
                />
                {errors.location && (
                  <p className="text-sm text-red-500">
                    La localidad es obligatoria.
                  </p>
                )}
              </div>
              <div className="space-y-1">
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
                  <SelectTrigger
                    className={`bg-white w-full rounded-md ${
                      errors.category ? "border-red-500" : "border-gray-200"
                    } focus:border-sky-500`}
                  >
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
                {errors.category && (
                  <p className="text-sm text-red-500">
                    La categoría es obligatoria.
                  </p>
                )}
              </div>
            </div>
            <Button
              className="rounded-md text-lg w-full p-4 font-bold bg-[#0284C7] mt-4 cursor-pointer hover:bg-sky-700"
              onClick={handleOnSubmit}
            >
              Buscar
            </Button>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Categorías populares
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 5).map((category, index) => (
                  <Button
                    key={category.id ?? index}
                    variant="outline"
                    size="sm"
                    className="rounded-full border-gray-200 text-gray-700 hover:border-sky-500 hover:text-sky-700 cursor-pointer"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </motion.main>
  );
};

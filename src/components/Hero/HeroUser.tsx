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

      setResultSearch(response.data);
    } catch (error) {
      console.error("Error al realizar la busqueda.", error);
    } finally {
      navigate("/search", {
        state: { searchBusiness, resultSearch },
      });
    }
  };

  return (
    <motion.main
      className="grid grid-cols-2 px-20 py-40 "
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <section className="w-130 flex flex-col gap-4">
        <h1 className="text-[#f96e2a] text-5xl font-bold">
          Sacá tu turno de manera facil y rapida
        </h1>
        <p className="text-[#295366] w-100 font-normal text-xl ">
          Seleccioná tu ubicación y elige el establecimiento que mas te
          convenga!
        </p>
      </section>

      <form className="bg-[#29536675] rounded-lg p-[2rem] flex flex-col gap-[30px]">
        <div className="flex justify-center items-center gap-4">
          <section>
            <Input
              className="w-[260px] rounded-3xl bg-[#d9d9d9] text-[#474950]"
              type="text"
              id="establishment"
              value={searchBusiness.nameEstablishment}
              onChange={(event) => handleChange(event, "nameEstablishment")}
              placeholder="Nombre del establecimiento"
            />
          </section>
          <section>
            <Input
              className="w-[260px] rounded-3xl bg-[#d9d9d9] text-[#474950 "
              type="text"
              id="location"
              value={searchBusiness.location}
              onChange={(event) => handleChange(event, "location")}
              placeholder="Selecciona tu localidad"
            />
          </section>
        </div>
        <section>
          <div className="flex justify-center items-center">
            <Select
              onValueChange={(value) =>
                handleChange(
                  { target: { value } } as React.ChangeEvent<HTMLInputElement>,
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
        <div className="flex justify-center items-center">
          <Button
            className="rounded-3xl text-lg w-[30%] font-bold bg-[#295366] cursor-pointer"
            onClick={handleOnSubmit}
          >
            Buscar
          </Button>
        </div>
      </form>
    </motion.main>
  );
};

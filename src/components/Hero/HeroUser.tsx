import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { toast } from "sonner";
import { Card, CardContent } from "@ui/card";
import useLoadCategories from "@hooks/useLoadCategories";
import { useAuth } from "@context/AuthContext";
import { Search, Scissors, Calendar, CheckCircle, ArrowRight, MapPin } from "lucide-react";

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

const steps = [
  { icon: Search, text: "Busca el establecimiento por ubicación o nombre" },
  { icon: Scissors, text: "Selecciona el servicio que necesitas" },
  { icon: Calendar, text: "Elige la fecha y hora que prefieras" },
  { icon: CheckCircle, text: "¡Listo! Recibirás una confirmación de tu turno" },
];

export const HeroUser = ({ formRef }: Props) => {
  const { session } = useAuth();
  const isAuthenticated = !!session;
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
        `${import.meta.env.VITE_API_URL}/api/v1/business/search`,
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
      className="relative overflow-hidden bg-gradient-to-b from-sky-50/80 to-white/90 px-5 py-10 md:px-8 md:py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Blurred background image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/hero-calendar.png"
          alt="Fondo de calendario"
          className="w-full h-full object-cover opacity-15 blur-[8px]"
        />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* Left - Hero Content */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight">
              Sacá tu turno de
              <br />
              manera
              <br />
              <span className="text-orange-500 italic">fácil y rápida</span>
            </h1>
          </div>

          <p className="text-slate-500 text-[17px] leading-relaxed max-w-lg">
            Seleccioná tu ubicación y elegí el establecimiento que más te
            convenga. Optimiza tu tiempo con nuestra plataforma.
          </p>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-4 h-4 text-orange-500" />
                </div>
                <p className="text-slate-600 text-[15px]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Search Card */}
        <form className="w-full max-w-[440px] md:w-[440px] flex-shrink-0 mx-auto" ref={formRef}>
          <Card className="border-0 shadow-[0_8px_40px_rgba(15,23,42,0.08)] overflow-hidden bg-white rounded-2xl">
            <CardContent className="p-8 space-y-5">
              <div>
                <h2 className="text-[22px] font-bold text-slate-800">
                  Encuentra tu próximo turno
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Busca, reserva y gestiona en segundos.
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  className="bg-slate-50 border-slate-200 focus:border-sky-500 rounded-xl h-12 px-4"
                  type="text"
                  id="establishment"
                  value={searchBusiness.nameEstablishment}
                  onChange={(event) => handleChange(event, "nameEstablishment")}
                  placeholder="Nombre del establecimiento"
                />

                <div className="space-y-1">
                  <Input
                    className={`bg-slate-50 rounded-xl h-12 px-4 ${errors.location ? "border-red-500" : "border-slate-200"
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
                      setSearchBusiness((prev) => ({
                        ...prev,
                        category: value,
                      }))
                    }
                  >
                    <SelectTrigger
                      className={`bg-slate-50 w-full rounded-xl h-12 ${errors.category ? "border-red-500" : "border-slate-200"
                        } focus:border-sky-500`}
                    >
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>

                    <SelectContent>
                      {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.name}>
                            {cat.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-sm text-gray-500">
                          No hay categorías disponibles
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500">
                      La categoría es obligatoria.
                    </p>
                  )}
                </div>
              </div>

              <button
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-4 rounded-xl text-base flex items-center justify-center gap-2 transition-colors cursor-pointer"
                onClick={handleOnSubmit}
              >
                Buscar turnos
                <ArrowRight className="w-[18px] h-[18px]" />
              </button>
            </CardContent>
          </Card>
        </form>
      </div>
    </motion.main>
  );
};

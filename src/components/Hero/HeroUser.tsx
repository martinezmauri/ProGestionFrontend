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
    streetNumber: string;
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
  formRef: React.Ref<HTMLFormElement>;
}

const steps = [
  { icon: Search, text: "Busca el establecimiento por ubicación o nombre" },
  { icon: Scissors, text: "Selecciona el servicio que necesitas" },
  { icon: Calendar, text: "Elige la fecha y hora que prefieras" },
  { icon: CheckCircle, text: "¡Listo! Recibirás una confirmación de tu turno" },
];

export const HeroUser = ({ formRef }: Props) => {
  const { isAuthenticated } = useAuth();
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

    const hasName = searchBusiness.nameEstablishment.trim() !== "";
    const hasLocation = searchBusiness.location.trim() !== "";
    const hasCategory = searchBusiness.category.trim() !== "";

    const newErrors = {
      location: !hasName && !hasLocation,
      category: !hasName && !hasCategory,
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
        <form className="w-full max-w-[480px] md:w-[480px] flex-shrink-0 mx-auto" ref={formRef}>
          <Card className="border border-white/40 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.1)] overflow-hidden bg-white/95 backdrop-blur-md rounded-3xl">
            <CardContent className="p-8 space-y-6">
              <div className="text-left">
                <h2 className="text-[24px] font-extrabold text-slate-900 tracking-tight">
                  Encuentra tu próximo turno
                </h2>
                <p className="text-slate-500 text-sm mt-1.5 font-medium">
                  Busca, reserva y gestiona en segundos.
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                  </div>
                  <Input
                    className="bg-slate-50/50 border-slate-200 focus:bg-white focus:border-sky-500 rounded-2xl h-14 pl-11 pr-4 text-[15px] shadow-sm transition-all placeholder:text-slate-400"
                    type="text"
                    id="establishment"
                    value={searchBusiness.nameEstablishment}
                    onChange={(event) => handleChange(event, "nameEstablishment")}
                    placeholder="Nombre del establecimiento (ej. Spa Zen)"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                    </div>
                    <Input
                      className={`bg-slate-50/50 rounded-2xl h-14 pl-11 pr-4 text-[15px] shadow-sm transition-all placeholder:text-slate-400 ${errors.location ? "border-red-500 focus:border-red-500 bg-red-50/50" : "border-slate-200 focus:border-sky-500 focus:bg-white"
                        }`}
                      type="text"
                      id="location"
                      value={searchBusiness.location}
                      onChange={(event) => handleChange(event, "location")}
                      placeholder="Selecciona tu localidad"
                    />
                  </div>
                  {errors.location && (
                    <p className="text-[13px] text-red-500 font-medium px-1">
                      La localidad es obligatoria para buscar cercanos.
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <Scissors className="h-5 w-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                    </div>
                    <Select
                      onValueChange={(value) =>
                        setSearchBusiness((prev) => ({
                          ...prev,
                          category: value,
                        }))
                      }
                    >
                      <SelectTrigger
                        className={`bg-slate-50/50 w-full rounded-2xl h-14 pl-11 pr-4 text-[15px] shadow-sm transition-all focus:bg-white ${errors.category ? "border-red-500 focus:border-red-500 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
                          }`}
                      >
                        <SelectValue placeholder="Categoría de servicio" />
                      </SelectTrigger>

                      <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                        {Array.isArray(categories) && categories.length > 0 ? (
                          categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.name} className="py-3 cursor-pointer">
                              {cat.name}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="px-3 py-4 text-sm text-slate-500 text-center">
                            No hay categorías disponibles
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.category && (
                    <p className="text-[13px] text-red-500 font-medium px-1">
                      Elige una categoría de servicio para empezar.
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold h-14 rounded-2xl text-[15px] flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer group"
                  onClick={handleOnSubmit}
                >
                  Confirmar y Buscar
                  <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </motion.main>
  );
};

import React from "react";
import { MapPin, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@ui/card";
import { Button } from "@ui/button";
import { Badge } from "@ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";

export interface IBusinessShort {
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
  business: IBusinessShort[];
  searchInputs: {
    nameEstablishment: string;
    location: string;
    category: string;
  };
}

export const SearchDetail = ({ business, searchInputs }: Props) => {
  const navigate = useNavigate();

  const handleOnClick = (id: string) => {
    navigate(`/b/${id}`);
  };
  return (
    <div className="px-6 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Resultados de búsqueda
          </h2>
          {business.length > 0 ? (
            <p className="text-gray-500">
              Encontramos {business.length} establecimiento
              {business.length > 1 && "s"} en {searchInputs.location}
            </p>
          ) : (
            <p className="text-gray-500">
              No pudimos encontrar el negocio. Probá con otros datos.
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto ">
          <Select defaultValue="relevancia">
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevancia">Relevancia</SelectItem>
              <SelectItem value="calificacion">Mejor calificados</SelectItem>
              <SelectItem value="distancia">Más cercanos</SelectItem>
              <SelectItem value="precio">Menor precio</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-gray-300">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {searchInputs.location && (
          <Badge
            variant="secondary"
            className="bg-sky-100 text-sky-700 border-sky-200"
          >
            {searchInputs.location}
            <button className="ml-1 hover:text-sky-900">×</button>
          </Badge>
        )}

        {searchInputs.category && (
          <Badge
            variant="secondary"
            className="bg-orange-100 text-orange-700 border-orange-200"
          >
            {searchInputs.category}
            <button className="ml-1 hover:text-sky-900">×</button>
          </Badge>
        )}

        {searchInputs.nameEstablishment && (
          <Badge
            variant="secondary"
            className="bg-sky-100 text-sky-700 border-sky-200"
          >
            {searchInputs.nameEstablishment}
            <button className="ml-1 hover:text-sky-900">×</button>
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 ">
        {business.length > 0 ? (
          business.map((place) => (
            <Card
              onClick={() => handleOnClick(place.id.toString())}
              key={place.id}
              className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer rounded-2xl bg-white flex flex-col h-full"
            >
              <div className="relative h-48 bg-gray-50 overflow-hidden">
                {place.logo ? (
                  <img
                    src={place.logo}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 group-hover:scale-105 transition-transform duration-500">
                    <span className="text-sm font-medium">Sin imagen</span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    className="bg-white/95 text-gray-700 shadow-sm font-medium px-3 py-1"
                  >
                    {place.category?.name || "Negocio"}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-5 flex flex-col flex-grow">
                <div className="space-y-3 flex-grow">
                  <div>
                    <h3 className="font-bold text-xl text-slate-800 group-hover:text-sky-600 transition-colors line-clamp-1">
                      {place.name}
                    </h3>
                    <div className="flex items-start text-slate-500 text-sm mt-2">
                      <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0 mt-0.5 text-slate-400" />
                      <span className="flex-1 line-clamp-2 leading-relaxed">
                        {place.address?.street} {place.address?.street_number}, {place.address?.city}
                      </span>
                    </div>
                  </div>

                  {place.description && (
                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {place.description}
                    </p>
                  )}
                </div>

                <div className="pt-5 mt-auto">
                  <Button className="w-full bg-slate-900 hover:bg-sky-600 text-white font-medium shadow-sm transition-all rounded-xl h-11">
                    Ver Perfil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
      <div className="flex justify-center mt-12">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-sky-600 text-white border-sky-600"
          >
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};

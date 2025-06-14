import React from "react";
import { MapPin, SlidersHorizontal, Star } from "lucide-react";
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
import { PropsBusiness } from "@api/getBusiness";

interface Props {
  business: PropsBusiness[];
  searchInputs: {
    nameEstablishment: string;
    location: string;
    category: string;
  };
}

export const SearchDetail = ({ business, searchInputs }: Props) => {
  const navigate = useNavigate();

  const handleOnClick = (id: string) => {
    navigate(`/business/${id}`);
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
              className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-48 bg-gray-200">
                <img
                  src={place.logo || "/placeholder.svg"}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge
                    variant="secondary"
                    className="bg-white/90 text-gray-700"
                  >
                    {place.category.name}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 group-hover:text-sky-600 transition-colors">
                      {place.name}
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="flex-1">{place.address.street}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4"
                            fill={
                              i < Math.floor(4.8) /* logica para esto */
                                ? "currentColor"
                                : "none"
                            }
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-600">4.8</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {place.services.slice(0, 3).map((service, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs bg-sky-50 text-sky-700 border-sky-200"
                      >
                        {service.name}
                      </Badge>
                    ))}
                    {place.services.length > 3 && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-gray-50 text-gray-600"
                      >
                        +{place.services.length - 3} más
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-sm cursor-pointer">
                      Reservar Turno
                    </Button>
                  </div>
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

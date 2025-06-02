import React from "react";
import { IAddress } from "../../interfaces/IAddress";
import { Clock, MapPin, Phone, SlidersHorizontal, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@ui/card";
import { Button } from "@ui/button";
import { Badge } from "@ui/badge";
import { FooterUser } from "@components/Footer/FooterUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";

interface PropsBusiness {
  id: string;
  logo: string;
  name: string;
  address: IAddress;
  open: boolean;
}

const negocios = [
  {
    id: 1,
    name: "Peluquería Style",
    category: "Peluquería",
    address: "Av. Santa Fe 1234, Palermo",
    distance: "0.5 km",
    rating: 4.8,
    reviews: 124,
    price: "$$",
    image: "/placeholder.svg?height=200&width=300",
    services: ["Corte", "Teñido", "Peinado"],
    nextAvailable: "Hoy 15:30",
    phone: "+54 11 1234-5678",
    isOpen: true,
  },
  {
    id: 2,
    name: "Centro de Belleza Luna",
    category: "Spa & Belleza",
    address: "Gurruchaga 567, Palermo",
    distance: "0.8 km",
    rating: 4.9,
    reviews: 89,
    price: "$$$",
    image: "/placeholder.svg?height=200&width=300",
    services: ["Facial", "Manicura", "Masajes"],
    nextAvailable: "Mañana 10:00",
    phone: "+54 11 2345-6789",
    isOpen: true,
  },
  {
    id: 3,
    name: "Barbería Clásica",
    category: "Barbería",
    address: "Thames 890, Palermo",
    distance: "1.2 km",
    rating: 4.7,
    reviews: 156,
    price: "$",
    image: "/placeholder.svg?height=200&width=300",
    services: ["Corte masculino", "Barba", "Afeitado"],
    nextAvailable: "Hoy 16:45",
    phone: "+54 11 3456-7890",
    isOpen: false,
  },
  {
    id: 4,
    name: "Estética Integral",
    category: "Centro de Estética",
    address: "Borges 345, Palermo",
    distance: "0.9 km",
    rating: 4.6,
    reviews: 78,
    price: "$$",
    image: "/placeholder.svg?height=200&width=300",
    services: ["Depilación", "Tratamientos", "Limpieza facial"],
    nextAvailable: "Hoy 17:15",
    phone: "+54 11 4567-8901",
    isOpen: true,
  },
  {
    id: 5,
    name: "Salón Premium",
    category: "Peluquería",
    address: "Serrano 678, Palermo",
    distance: "1.5 km",
    rating: 4.9,
    reviews: 203,
    price: "$$$",
    image: "/placeholder.svg?height=200&width=300",
    services: ["Corte", "Color", "Tratamientos", "Peinado"],
    nextAvailable: "Mañana 09:30",
    phone: "+54 11 5678-9012",
    isOpen: true,
  },
  {
    id: 6,
    name: "Nails & Beauty",
    category: "Manicura",
    address: "Humboldt 123, Palermo",
    distance: "0.7 km",
    rating: 4.5,
    reviews: 92,
    price: "$$",
    image: "/placeholder.svg?height=200&width=300",
    services: ["Manicura", "Pedicura", "Uñas esculpidas"],
    nextAvailable: "Hoy 14:00",
    phone: "+54 11 6789-0123",
    isOpen: true,
  },
];

export const SearchDetail = ({ business }: { business: PropsBusiness[] }) => {
  const navigate = useNavigate();

  const handleOnClick = (id: string) => {
    navigate(`/appointment/${id}`);
  };
  return (
    <div className="px-6 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Resultados de búsqueda
          </h2>
          <p className="text-gray-500">
            Encontramos 12 establecimientos en Palermo, Buenos Aires
          </p>
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
        <Badge
          variant="secondary"
          className="bg-sky-100 text-sky-700 border-sky-200"
        >
          Palermo, Buenos Aires
          <button className="ml-1 hover:text-sky-900">×</button>
        </Badge>
        <Badge
          variant="secondary"
          className="bg-orange-100 text-orange-700 border-orange-200"
        >
          Peluquería
          <button className="ml-1 hover:text-orange-900">×</button>
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 ">
        {negocios.map((place) => (
          <Card
            key={place.id}
            className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <div className="relative h-48 bg-gray-200">
              <img
                src={place.image || "/placeholder.svg"}
                alt={place.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge
                  variant="secondary"
                  className="bg-white/90 text-gray-700"
                >
                  {place.category}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge
                  variant="secondary"
                  className={`${
                    place.isOpen
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {place.isOpen ? "Abierto" : "Cerrado"}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3">
                <Badge variant="secondary" className="bg-black/70 text-white">
                  {place.price}
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
                    <span className="flex-1">{place.address}</span>
                    <span className="ml-2 text-sky-600 font-medium">
                      {place.distance}
                    </span>
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
                            i < Math.floor(place.rating)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-600">
                      {place.rating} ({place.reviews})
                    </span>
                  </div>
                  <div className="flex items-center text-green-600 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {place.nextAvailable}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {place.services.slice(0, 3).map((service, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-sky-50 text-sky-700 border-sky-200"
                    >
                      {service}
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
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-sm">
                    Reservar Turno
                  </Button>
                  <Button variant="outline" size="sm" className="px-3">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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

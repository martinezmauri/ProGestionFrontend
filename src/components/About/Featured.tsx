import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import { ArrowRight, MapPin } from "lucide-react";
import React from "react";

const establishment = [
  {
    name: "Peluquería Style",
    category: "Peluquería",
    location: "Palermo, Buenos Aires",
    rating: 4.8,
    reviews: 124,
  },
  {
    name: "Centro Dental Sonrisa",
    category: "Odontología",
    location: "Recoleta, Buenos Aires",
    rating: 4.7,
    reviews: 98,
  },
  {
    name: "Spa Relax",
    category: "Spa & Bienestar",
    location: "Belgrano, Buenos Aires",
    rating: 4.9,
    reviews: 156,
  },
];

interface FeaturedProps {
  scrollToForm: () => void;
}

export const Featured = ({ scrollToForm }: FeaturedProps) => {
  return (
    <div>
      <section className="bg-gradient-to-br from-sky-100 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Establecimientos destacados
            </h2>
            <Button variant="link" className="text-sky-600 flex items-center">
              Ver todos <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {establishment.map((place, index) => (
              <Card
                key={index}
                className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-gray-200 relative">
                  <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded text-xs font-medium">
                    {place.category}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{place.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {place.location}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill={
                              i < Math.floor(place.rating)
                                ? "currentColor"
                                : "none"
                            }
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-600">
                        {place.rating} ({place.reviews})
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      Reservar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Reservar un turno con ProGestion es rápido y sencillo. Sigue estos
              pasos para conseguir tu próxima cita.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Busca y selecciona",
                description:
                  "Encuentra el establecimiento que necesitas por ubicación, categoría o nombre.",
                step: 1,
              },
              {
                title: "Elige fecha y hora",
                description:
                  "Selecciona el día y horario que mejor se adapte a tu agenda.",
                step: 2,
              },
              {
                title: "Confirma tu reserva",
                description:
                  "Recibe la confirmación de tu turno por email o WhatsApp.",
                step: 3,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mb-4">
                  <span className="text-sky-600 text-xl font-bold">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-orange-500 to-orange-400 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Listo para reservar tu turno?
          </h2>
          <p className="text-orange-50 max-w-2xl mx-auto mb-8">
            Miles de personas ya están usando ProGestion para reservar sus
            turnos de manera rápida y sencilla.
          </p>
          <Button
            className="bg-white text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-md cursor-pointer"
            onClick={scrollToForm}
          >
            Buscar establecimientos
          </Button>
        </div>
      </section>
    </div>
  );
};

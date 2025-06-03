import { getBusinessById, PropsBusiness } from "@api/getBusiness";
import ServicesGrid from "@components/Dropdowns/ServicesGrid";
import { GridFooter } from "@components/Footer/GridFooter";
import Grid from "@components/Grid/Grid";
import HorariosCard from "@components/Horarios/HorariosCard";
import HorarioCierreHoy from "@components/Horarios/HorariosCierreHoy";
import { NavbarUser } from "@components/Navbars/NavbarUser";
import availableSchedule from "@helpers/availableSchedule";
import useLoadDataGrid from "@hooks/useLoadDataGrid";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Navigation,
  Phone,
  Star,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BusinessDetail = () => {
  const { id } = useParams();
  const { dataGrid } = useLoadDataGrid();
  const [selectedService, setSelectedService] = useState<string>();
  const [business, setBusiness] = useState<PropsBusiness>();

  useEffect(() => {
    if (!id) return;
    try {
      const data = getBusinessById(id);
      setBusiness(data ?? undefined);

      if (data && data.service.length > 0) {
        setSelectedService(data.service[0].name);
      }
    } catch (error) {
      console.error("Error fetching business data:", error);
    }
  }, [id]);

  if (!business) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white w-full">
      <header className="w-full px-4 py-4 flex justify-between items-center border-b bg-white/80 backdrop-blur-sm">
        <Link
          to="/search"
          className="flex items-center text-sky-600 hover:text-sky-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span className="text-sm">Volver a resultados</span>
        </Link>
        <h1 className="text-orange-500 font-bold text-xl">ProGestion</h1>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="border-sky-600 text-sky-600 hover:bg-sky-50"
          >
            Contactar Soporte
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Business Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
                <img
                  src="/placeholder.svg?height=400&width=800"
                  alt="Peluquería Style"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h1 className="text-3xl font-bold mb-2">{business.name}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">4.8</span>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600">
                      {business.open ? "Abierto" : "Cerrado"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">
                    Información rápida
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">
                        {business.address.street}, {business.address.city}
                      </span>
                    </div>
                    <HorarioCierreHoy business={business} />

                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">
                        {business.employees.length} profesionales
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Services and Booking */}
          <div className="space-y-8">
            {/* Service Selection */}
            <Card className="border-0 overflow-hidden shadow-md p-0 ">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-4 py-4">
                <CardTitle className="flex items-center ">
                  <Calendar className="w-5 h-5 mr-2" />
                  Selecciona un servicio
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {business.service.map((servicio) => (
                    <Button
                      key={servicio.id}
                      variant={
                        servicio.name === selectedService
                          ? "default"
                          : "outline"
                      }
                      onClick={() => setSelectedService(servicio.name)}
                      className={`h-auto p-4 flex flex-col items-start ${
                        servicio.name === selectedService
                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <span className="font-medium">{servicio.name}</span>
                      {servicio.price && (
                        <div className="text-sm opacity-80 mt-1">
                          <span>${servicio.price}</span>
                          <span className="mx-1">•</span>
                          <span>{servicio.duration} minutos</span>
                        </div>
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability Grid */}
            <Card className="border-0 shadow-md p-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-sky-500 to-sky-400 text-white px-4 py-4">
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Profesionales disponibles para {selectedService}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {business.employees
                    .filter((empleado) =>
                      empleado.services.some((s) => s.name === selectedService)
                    )
                    .map((empleado) => (
                      <div
                        key={empleado.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <Avatar className="h-12 w-12 mr-3">
                              <AvatarFallback className="bg-sky-100 text-sky-700">
                                {empleado.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <h1>{empleado.name}</h1>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Disponible
                          </Badge>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">
                            Horarios disponibles hoy:
                          </h5>

                          {(() => {
                            const diaActual = new Date()
                              .toLocaleDateString("es-AR", { weekday: "long" })
                              .toLowerCase();

                            const capitalizado =
                              diaActual.charAt(0).toUpperCase() +
                              diaActual.slice(1);

                            const horarioDeHoy = business.business_hours.find(
                              (h) => h.day_of_week === capitalizado
                            );

                            const servicioSeleccionado = business.service.find(
                              (s) => s.id === selectedService
                            );

                            const duracion =
                              servicioSeleccionado?.duration ?? 30;

                            const horarios: string[] = [];

                            if (horarioDeHoy) {
                              if (
                                horarioDeHoy.opening_morning_time &&
                                horarioDeHoy.closing_morning_time
                              ) {
                                horarios.push(
                                  ...availableSchedule(
                                    horarioDeHoy.opening_morning_time,
                                    horarioDeHoy.closing_morning_time,
                                    duracion
                                  )
                                );
                              }

                              if (
                                horarioDeHoy.opening_evening_time &&
                                horarioDeHoy.closing_evening_time
                              ) {
                                horarios.push(
                                  ...availableSchedule(
                                    horarioDeHoy.opening_evening_time,
                                    horarioDeHoy.closing_evening_time,
                                    duracion
                                  )
                                );
                              }
                            }

                            return (
                              <div>
                                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                                  {horarios.slice(0, 12).map((hora, index) => {
                                    const isAvailable = Math.random() > 0.3; // Simular disponibilidad
                                    return (
                                      <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        disabled={!isAvailable}
                                        className={`text-xs ${
                                          isAvailable
                                            ? "border-sky-200 hover:bg-sky-50 hover:border-sky-300"
                                            : "opacity-50 cursor-not-allowed"
                                        }`}
                                      >
                                        {hora}
                                      </Button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Business Information */}
          <div className="mt-12">
            <Tabs defaultValue="ubicacion" className="space-y-6">
              <TabsList className="bg-white border  w-full grid grid-cols-3 md:w-auto md:inline-flex">
                <TabsTrigger
                  value="ubicacion"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:font-semibold transition-colors"
                >
                  Ubicación
                </TabsTrigger>
                <TabsTrigger
                  value="horarios"
                  className="data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=active]:font-semibold transition-colors"
                >
                  Horarios
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ubicacion" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-md p-0 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-green-400 text-white px-4 py-4">
                      <CardTitle className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Ubicación
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">
                            Dirección
                          </h4>
                          <p className="text-gray-600">
                            {business.address.street}, {business.address.city}
                          </p>
                        </div>
                        <Button className="w-full bg-green-500 hover:bg-green-600">
                          <Navigation className="h-4 w-4 mr-2" />
                          Cómo llegar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md p-0 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">Mapa interactivo</p>
                          <p className="text-sm text-gray-400">
                            {business.address.street}, {business.address.city}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="horarios" className="space-y-6">
                <Card className="border-0 shadow-md p-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-400 text-white px-4 py-4">
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Horarios de atención
                    </CardTitle>
                  </CardHeader>
                  <HorariosCard business={business} />
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessDetail;

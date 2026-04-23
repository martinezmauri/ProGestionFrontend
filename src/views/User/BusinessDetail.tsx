import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBusinessById, PropsBusiness } from "@api/getBusiness";
import HorariosCard from "@components/Horarios/HorariosCard";
import HorarioCierreHoy from "@components/Horarios/HorariosCierreHoy";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Users,
  Info,
  Phone,
  LayoutGrid,
  CalendarCheck2,
  Lock
} from "lucide-react";
import { useAuth } from "@context/AuthContext";
import { FormLogin } from "@components/Modals/FormLogin";
import { FormRegister } from "@components/Modals/FormRegister";
import { BookingFlow } from "@components/Booking/BookingFlow";
import { FooterSimple } from "@components/Footer/FooterSimple";

const BusinessDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { session } = useAuth();
  const isAuthenticated = !!session;

  const [business, setBusiness] = useState<PropsBusiness>();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState("servicios");

  useEffect(() => {
    if (!id) return;
    const fetchBusiness = async () => {
      const data = await getBusinessById(id);
      setBusiness(data);
    };
    fetchBusiness();
  }, [id]);

  if (!business) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-sky-200 rounded-full"></div>
        <p className="text-slate-400 font-medium">Cargando establecimiento...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] w-full flex flex-col">
      {/* Sticky Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <Link
          to="/search"
          className="flex items-center text-slate-500 hover:text-sky-600 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-sky-50 transition-all mr-2">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold">Regresar</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <CalendarCheck2 className="w-6 h-6 text-sky-600" />
          <span className="text-xl font-black tracking-tighter text-slate-800">OM<span className="text-sky-600">TIME</span></span>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" className="text-slate-600 font-semibold" onClick={() => navigate("/")}>Inicio</Button>
          {!isAuthenticated ? (
            <Button className="bg-sky-600 hover:bg-sky-700 rounded-full px-6" onClick={() => setShowLogin(true)}>Ingresar</Button>
          ) : (
            <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center border-2 border-white shadow-sm">
              <span className="text-sky-700 font-bold text-sm">U</span>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Business Info */}
          <div className="lg:col-span-12 xl:col-span-8 space-y-8">
            {/* Hero Card */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-sky-900/10 group">
              <div className="absolute inset-0 z-0">
                <img
                  src={business.logo || "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=1200"}
                  alt={business.name}
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              </div>

              <div className="relative z-10 pt-48 pb-10 px-8 text-white">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20 px-4 py-1.5 rounded-full font-bold">
                    {business.category?.name || "Bienestar"}
                  </Badge>
                  <div className="flex items-center gap-1.5 bg-yellow-400/20 backdrop-blur-md text-yellow-400 px-4 py-1.5 rounded-full border border-yellow-400/20">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">4.9 (120 reseñas)</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 drop-shadow-sm">{business.name}</h1>
                
                <div className="flex flex-wrap items-center gap-6 text-slate-100/90 font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-sky-400" />
                    <span>{business.address.street} {business.address.streetNumber}, {business.address.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-sky-400" />
                    <HorarioCierreHoy business={business} />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Tabs / Content Navigation */}
            <div className="bg-white p-2 rounded-[2rem] shadow-sm border border-slate-100 flex gap-2">
                <button 
                  onClick={() => setActiveTab("servicios")}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all ${activeTab === 'servicios' ? 'bg-sky-600 text-white shadow-lg shadow-sky-200' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                  Reservar Turno
                </button>
                <button 
                  onClick={() => setActiveTab("info")}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all ${activeTab === 'info' ? 'bg-sky-600 text-white shadow-lg shadow-sky-200' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <Info className="w-5 h-5" />
                  Información local
                </button>
            </div>

            {/* Main Content Area */}
            <div className="min-h-[400px]">
              {activeTab === "servicios" ? (
                <Card className="rounded-[2rem] border-0 shadow-xl shadow-slate-200/50 overflow-hidden">
                  <CardContent className="p-8">
                    {!isAuthenticated ? (
                      <div className="py-16 text-center space-y-6">
                        <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto text-sky-600">
                          <Lock className="w-8 h-8" />
                        </div>
                        <div className="space-y-2 max-w-sm mx-auto">
                          <h3 className="text-2xl font-black text-slate-800">Inicia sesión para reservar</h3>
                          <p className="text-slate-500 font-medium leading-relaxed">
                            Para elegir tu servicio y profesional necesitas estar identificado en nuestra plataforma.
                          </p>
                        </div>
                        <Button 
                          onClick={() => setShowLogin(true)}
                          className="bg-sky-600 hover:bg-sky-700 rounded-2xl py-7 px-10 text-lg font-black shadow-lg shadow-sky-100 active:scale-95 transition-all"
                        >
                          Iniciar Sesión Ahora
                        </Button>
                      </div>
                    ) : (
                      <BookingFlow businessId={id!} />
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <Card className="rounded-3xl border-0 shadow-sm p-6 space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                       <Clock className="w-5 h-5 text-sky-500" />
                       Horarios de atención
                    </h3>
                    <HorariosCard business={business} />
                  </Card>
                  
                  <Card className="rounded-3xl border-0 shadow-sm p-6 space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                       <MapPin className="w-5 h-5 text-sky-500" />
                       ¿Cómo llegar?
                    </h3>
                    <div className="aspect-video bg-slate-100 rounded-2xl flex flex-col items-center justify-center gap-3 border border-slate-200 border-dashed">
                       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <MapPin className="w-6 h-6 text-sky-500" />
                       </div>
                       <p className="text-sm font-bold text-slate-500">Google Maps se cargará pronto</p>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-2xl">
                        <p className="text-sm font-bold text-slate-800 mb-1">Dirección exacta</p>
                        <p className="text-slate-600 text-sm">{business.address.street} {business.address.streetNumber}, {business.address.city}</p>
                      </div>
                      <Button variant="outline" className="w-full rounded-xl py-6 border-slate-200 font-bold hover:bg-sky-50 hover:text-sky-600 transition-all">
                        Ver en Google Maps
                      </Button>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sidebar Info (Sticky on Desktop) */}
          <div className="lg:col-span-12 xl:col-span-4 space-y-6 sticky top-28">
            <Card className="rounded-[2rem] border-0 shadow-sm bg-sky-600 text-white overflow-hidden p-8">
               <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-sky-200 font-bold text-sm uppercase tracking-wider">Acerca de nosotros</span>
                    <h3 className="text-2xl font-black leading-tight">Tu bienestar es nuestra prioridad.</h3>
                  </div>
                  <p className="text-sky-100 font-medium leading-relaxed opacity-90">
                    Ofrecemos los mejores servicios de {business.category?.name.toLowerCase() || 'calidad'} en la zona. 
                    Contamos con un equipo altamente capacitado para brindarte la mejor atención.
                  </p>
                  <div className="pt-4 flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-sky-600 bg-sky-200 flex items-center justify-center text-sky-800 font-bold text-xs ring-4 ring-sky-600/20">
                          {i}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-bold text-sky-50">+50 clientes felices hoy</span>
                  </div>
               </div>
            </Card>

            <Card className="rounded-[2rem] border-0 shadow-sm p-8 space-y-6">
               <h4 className="font-black text-slate-800 text-lg uppercase tracking-tight">Contacto Directo</h4>
               <div className="space-y-4">
                  <a href={`tel:${business.phoneNumber}`} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                     <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                        <Phone className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-bold text-slate-400 uppercase">Llamanos</p>
                       <p className="text-slate-800 font-black">{business.phoneNumber || '4444-5555'}</p>
                     </div>
                  </a>
                  <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                     <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform">
                        <Users className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-bold text-slate-400 uppercase">Nuestro Staff</p>
                       <p className="text-slate-800 font-black">{business.employees.length} Profesionales</p>
                     </div>
                  </div>
               </div>
            </Card>
          </div>
        </div>
      </main>

      <FooterSimple />

      {/* Modals */}
      {showLogin && (
        <FormLogin
          onClose={() => setShowLogin(false)}
          onOpenRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          redirectOnSuccess={false}
        />
      )}

      {showRegister && (
        <FormRegister
          onClose={() => setShowRegister(false)}
          onOpenLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
          redirectOnSuccess={false}
        />
      )}
    </div>
  );
};

export default BusinessDetail;


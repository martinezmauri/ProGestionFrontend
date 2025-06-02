import { Button } from "@ui/button";
import { Link } from "react-router-dom";

export const HeroClient = () => {
  return (
    <main>
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-medium mb-6">
              GESTIÓN DE TURNOS PARA NEGOCIOS
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Optimiza de la mejor manera los turnos de tu negocio
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Facilita a tus clientes reservar turnos de manera rápida y
              sencilla. Ahorra tiempo, mejora la organización y aumenta la
              productividad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md">
                Ver planes
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 px-6 py-3 rounded-md"
              >
                Solicitar demo
              </Button>
            </div>
          </div>
          <section className="w-[100%] mt-[5vh]">
            <img
              className="w-[100%]"
              src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446087/lnh40csjj725fa1m3aec.png"
              alt="Vista de un iPad y un teléfono mostrando ProGestion"
            />
          </section>
        </div>
      </section>
    </main>
  );
};

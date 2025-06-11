import React from "react";

export const FooterSimple = () => {
  return (
    <footer className="bg-gray-50 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-orange-500 font-bold text-xl">ProGestion</h1>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
              Términos de servicio
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
              Política de privacidad
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
              Ayuda
            </a>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-6 pt-6 text-center md:text-left">
          <p className="text-gray-600 text-sm">
            © 2024 ProGestion. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

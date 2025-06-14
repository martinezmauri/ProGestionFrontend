import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center text-gray-800">
      <h1 className="text-7xl font-bold mb-2">404</h1>
      <h2 className="text-2xl mb-4">Página no encontrada</h2>
      <p className="mb-6">La página que buscas no existe o ha sido movida.</p>
      <Link
        to="/"
        className="text-blue-700 font-bold border border-blue-700 px-6 py-2 rounded transition-colors hover:bg-blue-700 hover:text-white"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;

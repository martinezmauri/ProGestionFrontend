import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

/**
 * Route guard que protege rutas autenticadas.
 * Si el usuario no está autenticado, redirige a la landing page.
 * Muestra nada mientras se verifica el estado de autenticación (evita flash).
 */
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

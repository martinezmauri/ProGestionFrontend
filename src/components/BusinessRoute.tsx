import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

/**
 * Route guard para proteger vistas exclusivas de Negocios.
 * Verifica si el usuario autenticado tiene un `businessId`.
 * Si no lo tiene, lo redirige al onboarding o a la landing.
 */
const BusinessRoute = () => {
    const { businessId, isLoading } = useAuth();

    if (isLoading) return null;

    if (!businessId) {
        // Si no tiene negocio, lo mandamos a la landing page pública
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default BusinessRoute;

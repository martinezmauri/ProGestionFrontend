import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

/**
 * Route guard para proteger vistas exclusivas de Negocios.
 * Verifica si el usuario autenticado tiene un `businessId`.
 * Si no lo tiene, lo redirige al onboarding o a la landing.
 */
const BusinessRoute = () => {
    const { userProfile, loading } = useAuth();

    if (loading) return null;

    if (!userProfile?.businessId) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default BusinessRoute;

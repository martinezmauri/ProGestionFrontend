import axios from "axios";

const LOCAL_STORAGE_KEY = "auth_data";

/**
 * Instancia global de Axios con baseURL y Authorization header automático.
 * Usar esta instancia en lugar de `axios` directo para llamadas a la API.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor: adjunta el JWT en cada request
api.interceptors.request.use((config) => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
        try {
            const { token } = JSON.parse(stored);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch {
            // Si el parse falla, no adjuntar header
        }
    }
    return config;
});

export default api;

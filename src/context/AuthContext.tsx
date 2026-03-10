import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id?: string;
  email?: string;
  rol?: string;
  avatar_url?: string;
  businessId?: string | null;
  exp?: number;
  [key: string]: unknown;
}

interface UserInfo {
  id: string;
  email: string;
  rol: string;
  avatar_url: string;
  businessId?: string | null;
}

interface AuthContextProps {
  userId: string | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (id: string, token: string) => void;
  logout: () => void;
  setBusinessId: (id: string | null) => void;
  userInfo: UserInfo | null;
  businessId: string | null;
  hasSubscription: boolean | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const LOCAL_STORAGE_KEY = "auth_data";

/**
 * Verifica si un JWT ha expirado.
 */
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (!decoded.exp) return false;
    // exp está en segundos, Date.now() en milisegundos
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true; // Si no se puede decodificar, considerar expirado
  }
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);

  const checkSubscription = async (currentToken: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/subscriptions/my`,
        {
          headers: { Authorization: `Bearer ${currentToken}` },
        },
      );
      if (response.status === 200) {
        setHasSubscription(true);
      } else {
        setHasSubscription(false);
      }
    } catch {
      setHasSubscription(false);
    }
  };

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserInfo(null);
    setBusinessId(null);
    setHasSubscription(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const { id, token: storedToken } = JSON.parse(stored);

        if (isTokenExpired(storedToken)) {
          // Token expirado → limpiar sesión
          logout();
        } else {
          setToken(storedToken);
          setUserId(id);
          const decoded = jwtDecode<DecodedToken>(storedToken);
          setUserInfo(decoded as UserInfo);
          setBusinessId((decoded.businessId as string) ?? null);
          checkSubscription(storedToken).finally(() => setIsLoading(false));
          return; // Skip setting isLoading below
        }
      } catch (err) {
        console.error("Error al cargar los datos de autenticación:", err);
        logout();
      }
    }
    setIsLoading(false);
  }, [logout]);

  const login = (id: string, newToken: string) => {
    setToken(newToken);
    setUserId(id);
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ id, token: newToken }),
    );
    try {
      const decoded = jwtDecode<DecodedToken>(newToken);
      setUserInfo(decoded as UserInfo);
      setBusinessId((decoded.businessId as string) ?? null);
      checkSubscription(newToken);
    } catch (err) {
      console.error("Error al decodificar el token:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        login,
        logout,
        isAuthenticated: !!token,
        isLoading,
        userInfo,
        setBusinessId,
        businessId,
        hasSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
  userId: string | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (id: string, token: string) => void;
  logout: () => void;
  userInfo: {
    id: string;
    email: string;
    rol: string;
    avatar_url: string;
  } | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const LOCAL_STORAGE_KEY = "auth_data";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{
    id: string;
    email: string;
    rol: string;
    avatar_url: string;
  } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const { id, token } = JSON.parse(stored);
        setToken(token);
        setUserId(id);
        const decoded = jwtDecode<any>(token);
        setUserInfo(decoded);
      } catch (err) {
        console.error("Error al cargar los datos de autenticación:", err);
      }
    }
  }, []);

  const login = (id: string, token: string) => {
    setToken(token);
    setUserId(id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ id, token }));

    try {
      const decoded = jwtDecode<any>(token);
      setUserInfo(decoded);
    } catch (err) {
      console.error("Error al decodificar el token:", err);
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setUserInfo(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        login,
        logout,
        isAuthenticated: !!token,
        userInfo,
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

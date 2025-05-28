import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface User {
  name: string;
  email: string;
  picture: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithRedirect: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    user,
    isAuthenticated: auth0Authenticated,
    isLoading,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const [sessionUser, setSessionUser] = useState<User | null>(null);
  const [localAuthenticated, setLocalAuthenticated] = useState(false);

  // Guardar en localStorage si el usuario está autenticado por Auth0
  useEffect(() => {
    if (user && auth0Authenticated) {
      const userData: User = {
        email: user.email ?? "",
        name: user.name ?? "",
        picture: user.picture ?? "",
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setSessionUser(userData);
      setLocalAuthenticated(true);
    }
  }, [user, auth0Authenticated]);

  // Leer desde localStorage al cargar la app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setSessionUser(parsedUser);
      setLocalAuthenticated(true); // <<-- forzamos isAuthenticated = true si había sesión guardada
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setSessionUser(null);
    setLocalAuthenticated(false);
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const value: AuthContextType = {
    user: sessionUser,
    isAuthenticated: localAuthenticated, // usamos nuestra propia lógica
    isLoading,
    loginWithRedirect,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

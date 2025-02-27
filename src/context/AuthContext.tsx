import { createContext, useState, useEffect, ReactNode } from "react";
import {
  login as authServiceLogin,
  logout as authServiceLogout,
} from "../services/authService";

// Define the shape of the authentication state
interface AuthContextType {
  isAuthenticated: boolean;
  login: (name: string, email: string) => Promise<void>;
  logout: () => void;
}

// Create the context with default values
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const login = async (name: string, email: string) => {
    await authServiceLogin(name, email);
    setIsAuthenticated(true);
  };

  const logout = () => {
    authServiceLogout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

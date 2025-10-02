import { createContext, useEffect, useState } from "react";
import authService from "../services/authService"; // ⚠️ ajoute l'import manquant

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    setLoading(true);
    const response = await authService.getCurrentUser();
    if (response.error) {
      setUser(null);
    } else {
      setUser(response);
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    if (response.error) return response;
    await checkUser();
    return { success: true };
  };

  const register = async (email, password) => {
    const response = await authService.register(email, password);
    if (response.error) return response;
    return login(email, password);
  };

  const logout = async () => {
    const response = await authService.logout();
    if (response.error) return response;
    setUser(null);
    await checkUser();
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useState, useEffect, useCallback } from "react";
import { authService } from "../services/authService";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Restore user on refresh
  const loadUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthLoading(false);
      return;
    }

    try {
      const { data } = await authService.getProfile(token);
      setUser(data);
    } catch {
      localStorage.removeItem("token");
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Login
  const login = async (credentials) => {
    try {
      const { data } = await authService.login(credentials);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      toast.success("Logged in");
      return data.user;
    } catch {
      toast.error("Invalid credentials");
      return null;
    }
  };

  // Register
  const register = async (info) => {
    try {
      const { data } = await authService.register(info);
      toast.success("Account created");
      return data;
    } catch {
      toast.error("Registration failed");
      return null;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

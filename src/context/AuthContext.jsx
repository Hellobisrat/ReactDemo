import  { createContext, useState, useEffect } from 'react';
import { API } from '../api/axios.js';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  try {
    const savedUser = localStorage.getItem("user");
    if (savedUser && savedUser !== "undefined") {
      setUser(JSON.parse(savedUser));
    }
  } catch (err) {
    localStorage.removeItem("user");
  } finally {
    setLoading(false);
  }
}, []);

 const register = async(formData) => {
  const { data } = await API.post("/auth/register", formData);

  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  localStorage.setItem("user", JSON.stringify(data));

  setUser(data);

  return data;
};

const login = async(formData)=>{
  const { data } = await API.post("/auth/login", formData);

  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  localStorage.setItem("user", JSON.stringify(data));

  setUser(data);

  return data;
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/api";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        try {
          const decoded = jwtDecode(localToken);
          const isExpired = decoded.exp * 1000 < Date.now();

          if (isExpired) {
            logout();
          } else {
            setToken(localToken);
            setUser(decoded);
            api.defaults.headers.common.Authorization = `Bearer ${localToken}`;
          }
        } catch (err) {
          logout();
        }
      } else {
        setUser(null);
        delete api.defaults.headers.common["Authorization"];
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  const register = async (email, password, name) => {
    const res = await api.post("/auth/register", { email, password, name });
    return res.data;
  };

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const jwt = res.data.access_token || res.data.token;
    localStorage.setItem("token", jwt);
    setToken(jwt);
    const decoded = jwtDecode(jwt);
    setUser(decoded);
    api.defaults.headers.common.Authorization = `Bearer ${jwt}`;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, register, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

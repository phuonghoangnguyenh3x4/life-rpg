import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const apiURL = process.env.REACT_APP_API_URL;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${apiURL}/check-auth`, { withCredentials: true });
      setIsAuthenticated(response.status === 200);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = () => {
    checkAuthStatus(); // Call checkAuthStatus after login
  };

  const logout = async () => {
    try {
      await axios.post('/logout', {}, { withCredentials: true }); // Optionally, implement a logout endpoint
    } catch (error) {
      console.error('Error logging out:', error);
    }
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

import { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const apiURL = import.meta.env.VITE_APP_API_URL;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${apiURL}/auth/check-auth`, { withCredentials: true });
      console.log(response);
      setIsAuthenticated(response.status === 200);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = () => {
    checkAuthStatus(); // Call checkAuthStatus after login
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { AuthContext };

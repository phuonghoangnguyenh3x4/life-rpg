import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {}, [isAuthenticated]);
  return isAuthenticated ? element : <Navigate to="/" />;
}

export default ProtectedRoute;

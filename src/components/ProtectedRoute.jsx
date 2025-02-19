import { Navigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/" />;
}

export default ProtectedRoute;

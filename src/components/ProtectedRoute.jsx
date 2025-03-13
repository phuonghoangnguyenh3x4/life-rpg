import { Navigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import PropTypes from 'prop-types';
function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/" />;
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired, // Define the 'element' prop
};

export default ProtectedRoute;

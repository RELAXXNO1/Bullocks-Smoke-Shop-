import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ children, requireAdmin = false }) {
  const { currentUser, isAdmin } = useAuth();
  const location = useLocation();
  
  if (!currentUser) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    toast.error('Unauthorized access');
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
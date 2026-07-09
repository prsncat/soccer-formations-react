import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

export default function PrivateRoute({ children }) {
  const { isAuthenticated, checkingAuth } = useAuth();

  if (checkingAuth) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h2>Checking session...</h2>
          <p>Please wait while your session is verified.</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

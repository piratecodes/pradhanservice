import { Navigate, Outlet } from 'react-router-dom';

export default function AuthGuard() {
  // Check sessionStorage instead of localStorage
  const token = sessionStorage.getItem('pradhan_token');
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
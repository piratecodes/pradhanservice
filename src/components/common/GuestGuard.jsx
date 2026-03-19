import { Navigate, Outlet } from 'react-router-dom';

export default function GuestGuard() {
  // Check if token exists in sessionStorage
  const token = sessionStorage.getItem('pradhan_token');
  const isAuthenticated = !!token;

  // If they are already logged in, redirect them to the Dashboard
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If they are NOT logged in, let them see the Login Page
  return <Outlet />;
}
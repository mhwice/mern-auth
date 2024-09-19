import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <p>loading...</p>
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <Outlet />;
};

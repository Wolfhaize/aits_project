import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust path if needed

const ProtectedRoute = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

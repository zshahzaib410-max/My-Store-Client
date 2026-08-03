import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ Component, allowedRoles }) => {
  const { isAuth, user } = useAuth();

  if (!isAuth) return <Navigate to="/auth/login" />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return <Component />;
};

export default ProtectedRoutes;
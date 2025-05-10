import { Navigate, Outlet } from "react-router-dom";
import { useAth } from "../context/Auth/AuthContext";

const ProtedRroute = () => {
  const { isAuthenticated } = useAth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
};

export default ProtedRroute;

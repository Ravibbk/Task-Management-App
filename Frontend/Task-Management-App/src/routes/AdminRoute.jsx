// Role-based route protection

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { token, user } = useSelector((state) => state.auth);
  const storedRole = localStorage.getItem("role");
  const role = user?.role || storedRole;

  if (!token) return <Navigate to="/login" replace />;
  if (role !== "ADMIN") return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};

export default AdminRoute;
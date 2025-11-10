import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ allowedRoles }) {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!userRole) return <Navigate to="/login" replace />; // Not logged in

  if (allowedRoles && !allowedRoles.includes(userRole)) {
  
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  if (userRole === "admin") return <Navigate to="/adminDashboard" replace />;
  if (userRole === "staff") return <Navigate to="/StaffDashboard" replace />;
  if (userRole === "patient") return <Navigate to="/PatientDashboard" replace />;
  if (userRole === "doctor") return <Navigate to="/DoctorDashboard" replace />;


  // ✅ important: if no user is logged in, render the requested public page (like login/signup)
  return <Outlet />;
}

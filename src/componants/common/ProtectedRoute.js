import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const ProtectedRoute = ({ children, adminOnly = false, redirectTo = "/login", unauthorizedRedirect = "/" }) => {
  const { user, loading } = useUser();

  if (loading) return null; // Or a loader

  // 1. Check if user is logged in at all
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // 2. If it's an admin-only route, verify the user has the correct role
  if (adminOnly) {
    const userRoles = user.roles || [];
    const hasAdminPrivileges = userRoles.some(role => 
      role === "Admin" || role === "Super Admin" || role === "Team Leader"
    );

    if (!hasAdminPrivileges) {
      // User is logged in but is NOT an admin/authorized staff
      console.warn("Unauthorized access attempt to dashboard by non-admin user.");
      return <Navigate to={unauthorizedRedirect} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;

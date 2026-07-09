import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ children }) => {
  // Check mock authentication token in localStorage
  const isAuthenticated = localStorage.getItem("pranacore_token") !== null;

  if (isAuthenticated) {
    // Redirect authenticated user away from public login/signup pages to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
};

export default PublicRoute;

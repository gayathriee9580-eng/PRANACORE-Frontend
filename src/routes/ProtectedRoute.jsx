import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check mock authentication token in localStorage
  const isAuthenticated = localStorage.getItem("pranacore_token") !== null;

  if (!isAuthenticated) {
    // Redirect unauthorized user to login
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;

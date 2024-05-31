import React from "react";
import useAuth from "../hook/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authUser = useAuth();
  if (authUser) {
    return children;
  }
  return <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;

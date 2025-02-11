import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element, isAdmin }) {
  // Check if the user is an admin
  if (!isAdmin) {
    return <Navigate to="/" replace />; // Redirect to the login page
  }

  return element; // Render the intended component
}

export default ProtectedRoute;

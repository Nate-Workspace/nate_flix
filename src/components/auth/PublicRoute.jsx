import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";

const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set to true if user exists
    });
    return unsubscribe; // Cleanup listener on unmount
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show a loader while checking auth
  }

  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;

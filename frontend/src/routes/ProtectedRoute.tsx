import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const ProtectedRoute = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/me`, { credentials: "include" })
      .then((response) => setIsAuthenticated(response.ok))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
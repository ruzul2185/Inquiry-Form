import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import type { ReactNode } from "react";

import { getAccessToken } from "../utils/FetchUtils"; // Adjust path if needed

const RouteProtection = ({ children }: { children: ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getAccessToken(); // If it throws, we're not authenticated
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Checking ...</div>;

  return authenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default RouteProtection;

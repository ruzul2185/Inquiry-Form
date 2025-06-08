import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { getAccessToken } from "../utils/FetchUtils"; // Adjust path if needed

const RedirectIfAuthenticated = ({ children }: { children: ReactNode }) => {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await getAccessToken();
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };

    checkSession();
  }, []);

  if (checking) return <div>Checking...</div>;

  if (authenticated) return <Navigate to="/dashboard" />;

  return <>{children}</>;
};

export default RedirectIfAuthenticated;

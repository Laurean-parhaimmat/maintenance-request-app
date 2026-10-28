import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Dev authentication bypass
    if (import.meta.env.DEV && import.meta.env.VITE_BYPASS_AUTH === "true") {
      setAuthenticated(true);
      return;
    }
    // Actual session check
    const checkSession = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/get-session",
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          setAuthenticated(false);
          return;
        }

        const data = await response.json();

        setAuthenticated(Boolean(data?.user));
      } catch {
        setAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  //Wait for the authentication check to complete before rendering the Outlet or Navigate components
  if (authenticated === null) {
    return <p>Ladataan...</p>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;

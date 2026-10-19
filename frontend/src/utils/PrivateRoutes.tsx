import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = { token: true }; // Placeholder logic to allow login
  return auth.token ? <Outlet /> : <Navigate to="/login" />; // Load private routes if login token exists
};

export default PrivateRoutes;

import { Navigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";
import HomeAdmin from "../pages/Home-Admin";
import HomeUser from "../pages/Home-User";

const RoleBasedHome = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    return <Navigate to="/login" replace />;
  }

  if (session.user.role === "admin") {
    return <HomeAdmin />;
  }

  return <HomeUser />;
};

export default RoleBasedHome;

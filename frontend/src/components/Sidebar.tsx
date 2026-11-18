import { Home, PlusCircle, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Uloskirjautuminen epäonnistui");
        return;
      }

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Uloskirjautuminen epäonnistui:", error);
    }
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/">
          <Home size={20} />
          <span className="sidebar-label">Etusivu</span>
        </NavLink>

        <NavLink to="/request/new">
          <PlusCircle size={20} />
          <span className="sidebar-label">Uusi pyyntö</span>
        </NavLink>
      </nav>

      <button type="button" className="sidebar-logout" onClick={handleLogout}>
        <LogOut size={20} />
        <span className="sidebar-label">Kirjaudu ulos</span>
      </button>
    </aside>
  );
}

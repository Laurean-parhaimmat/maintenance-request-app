import { Home, PlusCircle, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/sign-out",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
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
          <span>Etusivu</span>
        </NavLink>

        <NavLink to="/request/new">
          <PlusCircle size={20} />
          <span>Uusi pyyntö</span>
        </NavLink>
      </nav>

      <button
        type="button"
        className="sidebar-logout"
        onClick={handleLogout}
      >
        <LogOut size={20} />
        <span>Kirjaudu ulos</span>
      </button>
    </aside>
  );
}
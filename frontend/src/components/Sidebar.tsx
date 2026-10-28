import { Home, PlusCircle, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";


export default function Sidebar() {
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

      <button className="sidebar-logout">
        <LogOut size={20} />
        <span>Kirjaudu ulos</span>
      </button>
    </aside>
  );
}
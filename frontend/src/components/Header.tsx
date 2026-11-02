import { Bell, Settings, UserCircle } from "lucide-react";


export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header-brand">
        <img
          src="/company-logo.svg"
          alt="Huoltopyyntö"
          className="app-header-logo"
        />
        <span>Huoltopyyntö</span>
      </div>

      <div className="app-header-actions">
        <button type="button" aria-label="Asetukset">
          <Settings size={22} />
        </button>

        <button type="button" aria-label="Ilmoitukset">
          <Bell size={22} />
        </button>

        <button type="button" aria-label="Käyttäjä">
          <UserCircle size={25} />
        </button>
      </div>
    </header>
  );
}
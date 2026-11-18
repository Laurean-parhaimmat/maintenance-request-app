import { useEffect, useRef, useState } from "react";
import { Bell, UserCircle } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

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
        <button type="button" aria-label="Ilmoitukset">
          <Bell size={22} />
        </button>

        <div className="app-header-user-menu" ref={menuRef}>
          <button
            type="button"
            aria-label="Käyttäjävalikko"
            aria-expanded={isMenuOpen}
            aria-controls="user-dropdown"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <UserCircle size={25} />
          </button>

          {isMenuOpen && (
            <div id="user-dropdown" className="app-header-dropdown">
              <div className="app-header-dropdown-title">Asetukset</div>

              <ThemeToggle checked={isDarkMode} onChange={setIsDarkMode} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

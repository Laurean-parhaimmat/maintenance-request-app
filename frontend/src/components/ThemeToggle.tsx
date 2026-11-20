import "../styles/ThemeToggle.css";
import { Moon } from "lucide-react";

type ThemeToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function ThemeToggle({ checked, onChange }: ThemeToggleProps) {
  return (
    <div className="theme-toggle">
      <span className="theme-toggle-label">
        <Moon size={18} aria-hidden="true" />
        Tumma tila
      </span>

      <button
        type="button"
        role="switch"
        aria-label="Tumma tila"
        aria-checked={checked}
        className={`theme-toggle-switch ${checked ? "is-on" : ""}`}
        onClick={() => onChange(!checked)}
      >
        <span className="theme-toggle-thumb" aria-hidden="true" />
      </button>
    </div>
  );
}

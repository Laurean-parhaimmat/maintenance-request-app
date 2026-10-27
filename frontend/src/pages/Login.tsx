import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import "../styles/Login.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    setErrors("");
  };

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors("");

    if (loginData.email.length === 0) {
      setErrors("Sähköposti ei saa olla tyhjä");
      return;
    }

    if (loginData.password.length === 0) {
      setErrors("Salasana vaaditaan");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/sign-in/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
          }),
        },
      );

      if (!response.ok) {
        setErrors("Virheellinen sähköposti tai salasana");
        return;
      }

      navigate("/");
    } catch {
      setErrors("Kirjautuminen epäonnistui");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <div className="login-brand">
          <img
            className="login-brand-logo"
            src="/company-logo.svg"
            alt="Huoltopyyntö"
          />

          <span>Huoltopyyntö</span>
        </div>
      </header>

      <main className="login-main">
        <form className="login-form" onSubmit={handleLogin}>
          <p className="login-welcome">Tervetuloa takaisin</p>
          <h1>Kirjaudu sisään</h1>

          <div className="login-field">
            <label htmlFor="email">Sähköposti</label>

            <div className="login-input">
              <Mail size={17} />

              <input
                id="email"
                type="email"
                name="email"
                value={loginData.email}
                placeholder="nimi@esimerkki.fi"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="login-field">
            <label htmlFor="password">Salasana</label>

            <div className="login-input">
              <Lock size={17} />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
                placeholder="Syötä salasana"
                onChange={handleChange}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={
                  showPassword ? "Piilota salasana" : "Näytä salasana"
                }
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          {errors && <p className="login-error">{errors}</p>}

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Muista minut</span>
            </label>

            <button type="button" className="forgot-password">
              Unohditko salasanasi?
            </button>
          </div>

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Kirjaudutaan..." : "Kirjaudu sisään"}
          </button>
        </form>
      </main>
    </div>
  );
}

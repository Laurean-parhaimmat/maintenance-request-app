import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import "../styles/Login.css";

const authUrl = import.meta.env.VITE_REACT_APP_BETTER_AUTH_URL; // Hide backend connection port using environment variable

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { error: "Sähköposti puuttuu" })
    .email({ error: "Anna sähköposti oikeassa muodossa" }),
  password: z
    .string()
    .min(1, { error: "Salasana puuttuu" })
    .min(8, { error: "Salasanan täytyy olla vähintään 8 merkkiä" })
    .max(30, { error: "Salasana saa olla enintään 30 merkkiä" }),
});

type LoginInput = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register, // Keep track of inputs
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
    criteriaMode: "all",
  });

  const onLogin = async (data: LoginInput) => {
    //setLoading(true);

    try {
      const response = await fetch(`${authUrl}/api/auth/sign-in/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        setError("root.serverError", {
          type: String(response.status),
        });

        return;
      }

      navigate("/");
      console.log(data);
    } catch (err) {
      console.error("Kirjautuminen epäonnistui", err);
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
        <form className="login-form" onSubmit={handleSubmit(onLogin)}>
          <p className="login-welcome">Tervetuloa takaisin</p>
          <h1>Kirjaudu sisään</h1>

          <div className="login-field">
            <label htmlFor="email">Sähköposti</label>

            <div className="login-input">
              <Mail size={17} />

              <input
                {...register("email")}
                id="email"
                type="text"
                name="email"
                placeholder="nimi@esimerkki.fi"
              />
            </div>
            {errors?.email?.message && (
              <p className="login-error">{errors.email.message}</p>
            )}
          </div>
          <div className="login-field">
            <label htmlFor="password">Salasana</label>
            <div className="login-input">
              <Lock size={17} />

              <input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Syötä salasana"
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
            {errors?.password?.message && (
              <p className="login-error">{errors.password.message}</p>
            )}
            {/* Server-side validation for correct credentials */}
            {errors.root?.serverError?.type === "401" && (
              <p className="login-error">Väärä sähköposti tai salasana</p>
            )}
          </div>
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
            onSubmit={handleSubmit(onLogin)}
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Kirjaudutaan..." : "Kirjaudu sisään"}
          </button>
          <div className="register-link">
            <span>Eikö sinulla ole tiliä?</span>

            <button type="button" onClick={() => navigate("/register")}>
              Rekisteröidy
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

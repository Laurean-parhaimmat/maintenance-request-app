import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import "../styles/Login.css";

// Protect backend connection using environment variable
const authUrl = import.meta.env.VITE_REACT_APP_BETTER_AUTH_URL;

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { error: "Sähköposti puuttuu" })
    .email({ error: "Anna sähköposti oikeassa muodossa" }),
  password: z
    .string()
    .min(1, { error: "Salasana puuttuu" })
    .min(8, { error: "Salasanan täytyy olla vähintään 8 merkkiä" })
    .max(25, { error: "Salasana saa olla enintään 25 merkkiä" }),
});

type LoginInput = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = async (data: LoginInput) => {
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
        //setErrors("Virheellinen sähköposti tai salasana");
        return;
      }

      navigate("/");
      console.log(data);
    } catch (err) {
      console.error("Kirjautuminen epäonnistui", err);
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
                type="email"
                name="email"
                placeholder="nimi@esimerkki.fi"
              />
            </div>
            {errors?.email?.message && (
              <p className="text-red-700 mb-4">{errors.email.message}</p>
            )}
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
            </div>
          </div>

          {/*errors && <p className="login-error">{errors}</p>*/}
          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Muista minut</span>
            </label>

            <button type="button" className="forgot-password">
              Unohditko salasanasi?
            </button>
          </div>

          <div></div>

          <div>
            <button onClick={handleSubmit(onLogin)} />
          </div>
        </form>
      </main>
    </div>
  );
}

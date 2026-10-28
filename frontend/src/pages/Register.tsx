import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, UserPen } from "lucide-react";
import "../styles/Login.css";

const authUrl = import.meta.env.VITE_REACT_APP_BETTER_AUTH_URL; // Hide backend connection port using environment variable

const RegistrationSchema = z
  .object({
    name: z
      .string()
      .min(1, { error: "Nimi puuttuu" })
      .min(3, { error: "Nimen täytyy olla vähintään kolme merkkiä" })
      .max(40, { error: "Nimi saa olla enintään 40 merkkiä" }),
    email: z
      .string()
      .min(1, { error: "Sähköposti puuttuu" })
      .email({ error: "Anna sähköposti oikeassa muodossa" }),
    password: z
      .string()
      .min(1, { error: "Salasana puuttuu" })
      .min(8, { error: "Salasanan täytyy olla vähintään 8 merkkiä" })
      .max(30, { error: "Salasana saa olla enintään 30 merkkiä" }),
    confirmPassword: z
      .string()
      .min(1, { error: "Salasana puuttuu" })
      .min(8, { error: "Salasanan täytyy olla vähintään 8 merkkiä" })
      .max(30, { error: "Salasana saa olla enintään 30 merkkiä" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Salasanat eivät täsmää",
    path: ["confirmPassword"],
  });

type RegistrationInput = z.infer<typeof RegistrationSchema>;

export default function RegisterPage() {
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(RegistrationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onRegister = async (data: RegistrationInput) => {
    try {
      const response = await fetch(`${authUrl}/api/auth/sign-up/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "omit", // Just registering new account does not create a login session
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        // An error about email already existing would be useful here
        return;
      }

      navigate("/login");
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
        <form className="login-form" onSubmit={handleSubmit(onRegister)}>
          <p className="login-welcome">Tervetuloa palveluun</p>
          <h1>Luo uusi käyttäjä</h1>

          <div className="login-field">
            <label htmlFor="name">Nimi</label>

            <div className="login-input">
              <UserPen size={17} />

              <input
                {...register("name")}
                id="name"
                type="text"
                name="name"
                placeholder="Syötä nimi"
              />
            </div>
            {errors?.name?.message && (
              <p className="login-error">{errors.name.message}</p>
            )}
          </div>

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
          </div>
          <div className="login-field">
            <label htmlFor="confirmPassword">Vahvista Salasana</label>
            <div className="login-input">
              <Lock size={17} />

              <input
                {...register("confirmPassword")}
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Salasana uudelleen"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword((current) => !current)}
                aria-label={
                  showConfirmPassword ? "Piilota salasana" : "Näytä salasana"
                }
              >
                {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
            {errors?.confirmPassword?.message && (
              <p className="login-error">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            onSubmit={handleSubmit(onRegister)}
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Luodaan Käyttäjää..." : "Luo Käyttäjä"}
          </button>
          <div className="register-link">
            <span>Onko jo tili?</span>

            <button type="button" onClick={() => navigate("/login")}>
              Kirjaudu
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

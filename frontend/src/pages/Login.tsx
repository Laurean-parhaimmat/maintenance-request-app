import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

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

export default function RegisterPage() {
  let navigate = useNavigate();

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
    <div>
      <h2>Kirjaudu sisään</h2>
      <form onSubmit={handleSubmit(onLogin)}>
        <div>
          <label htmlFor="email">Sähköposti</label>
          <input
            {...register("email")}
            id="email"
            type="text"
            placeholder="jotain@esimerkki.fi"
          />
        </div>
        {errors?.email?.message && (
          <p className="text-red-700 mb-4">{errors.email.message}</p>
        )}
        <div>
          <label htmlFor="password">Salasana</label>
          <input
            {...register("password")}
            id="password"
            type="password"
            placeholder="Salasana"
          />
        </div>
        {errors?.password?.message && (
          <p className="text-red-700 mb-4">{errors.password.message}</p>
        )}
        <div>
          <button onClick={handleSubmit(onLogin)} />
        </div>
        <div>
          <input type="checkbox" id="rememberMe"></input>
          <label htmlFor="rememberMe">Muista Kirjautuminen</label>
        </div>
      </form>
    </div>
  );
}

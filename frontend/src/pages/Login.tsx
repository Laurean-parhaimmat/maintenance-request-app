import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

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
  /* Validating password confirmation
  const schema = RegistrationSchema.refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Salasanat eivät täsmää",
      path: ["confirmPassword"],

      // Execute when password and password confirmation match
      when(payload) {
        return RegistrationSchema.pick({
          password: true,
          confirmPassword: true,
        }).safeParse(payload.value).success;
      },
    },
  );*/

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

<<<<<<< HEAD
  // Update the input fields as the user types something
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
    } else if (loginData.password.length === 0) {
      setErrors("Salasana vaaditaan");
      return;
    }

=======
  const onLogin = (data: LoginInput) => {
>>>>>>> d4d3657 (Updated form validation with zod, hookform/resolvers and react-hook-form)
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
      console.log(data);
    } catch (err) {
<<<<<<< HEAD
      setErrors(
        err instanceof Error ? err.message : "Kirjautuminen epäonnistui",
      );
=======
      console.error("Kirjautuminen epäonnistui", err);
>>>>>>> d4d3657 (Updated form validation with zod, hookform/resolvers and react-hook-form)
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
      </form>
    </div>
  );
}

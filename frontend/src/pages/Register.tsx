import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

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
      .max(25, { error: "Salasana saa olla enintään 25 merkkiä" }),
    confirmPassword: z
      .string()
      .min(1, { error: "Salasana puuttuu" })
      .min(8, { error: "Salasanan täytyy olla vähintään 8 merkkiä" })
      .max(25, { error: "Salasana saa olla enintään 25 merkkiä" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Salasanat eivät täsmää",
    path: ["confirmPassword"],
  });

type RegistrationInput = z.infer<typeof RegistrationSchema>;

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
  } = useForm<RegistrationInput>({
    resolver: zodResolver(RegistrationSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onRegister = (data: RegistrationInput) => {
    try {
      navigate("/login");
      console.log(data);
    } catch (err) {
      console.error("Kirjautuminen epäonnistui", err);
    }
  };

  return (
    <div>
      <h2>Luo käyttäjä</h2>
      <form onSubmit={handleSubmit(onRegister)}>
        <div>
          <label htmlFor="name">Nimi</label>
          <input
            {...register("name")}
            id="email"
            type="text"
            placeholder="jotain@esimerkki.fi"
          />
        </div>
        {errors?.name?.message && (
          <p className="text-red-700 mb-4">{errors.name.message}</p>
        )}
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
          <label htmlFor="password">Luo salasana</label>
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
          <label htmlFor="email">Vahvista salasana</label>
          <input
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
            placeholder="Salasana uudelleen"
          />
        </div>
        {errors?.confirmPassword?.message && (
          <p className="text-red-700 mb-4">{errors.confirmPassword.message}</p>
        )}
        <div>
          <button onClick={handleSubmit(onRegister)} />
        </div>
      </form>
    </div>
  );
}

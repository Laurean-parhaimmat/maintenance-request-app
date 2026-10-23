import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "../App.css";

export default function LoginPage() {
  let navigate = useNavigate();
  // Store user input, errors
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  //const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  // Update the input fields as the user types something
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    setErrors("");
  };

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page from reloading after form submission
    setErrors("");

    if (loginData.email.length === 0) {
      setErrors("Sähköposti ei saa olla tyhjä");
      return;
    } else if (loginData.password.length === 0) {
      setErrors("Salasana vaaditaan");
      return;
    }

    //setLoading(true);
    try {
      navigate("/");
    } catch (err) {
      setErrors(
        err instanceof Error ? err.message : "Kirjautuminen epäonnistui",
      );
    } finally {
      //setLoading(false);
    }
  };
  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <h3 className="form-title">Kirjaudu sisään</h3>
        <Input
          type="email"
          name="email"
          label="Sähköpostiosoite"
          value={loginData.email}
          placeholder="nimi@esimerkki.fi"
          onChange={handleChange}
          error={errors}
        />
        <Input
          type="password"
          name="password"
          label="Salasana"
          value={loginData.password}
          placeholder="Salasana"
          onChange={handleChange}
          error={errors}
        />
        <Button type="submit" />
      </form>
    </div>
  );
}

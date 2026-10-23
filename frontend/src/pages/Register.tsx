import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/App.css";

export default function RegisterPage() {
  let navigate = useNavigate();
  // Store user input, errors
  const [registrationData, setRegistrationData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  //const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  // Update the input fields as the user types something
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });

    setErrors(""); // Hide errors
  };

  const handleRegistration = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page from reloading after form submission
    setErrors("");

    // Validation
    if (registrationData.email.length === 0) {
      setErrors("Sähköposti ei saa olla tyhjä");
      return;
    } else if (registrationData.password.length === 0) {
      setErrors("Salasana vaaditaan");
      return;
    } else if (registrationData.confirmPassword != registrationData.password) {
      setErrors("Salasanat eivät täsmää");
      return;
    } else {
      console.log("Rekisteröinti onnistui");
    }
    //setLoading(true);
    try {
      // Add logic to send registration information to the database
      navigate("/login");
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
      <form onSubmit={handleRegistration}>
        <h3 className="form-title">Luo Käyttäjä</h3>
        <Input
          type="email"
          name="email"
          label="Sähköpostiosoite"
          value={registrationData.email}
          placeholder="nimi@esimerkki.fi"
          onChange={handleChange}
          error={errors}
        />
        <Input
          type="password"
          name="password"
          label="Salasana"
          value={registrationData.password}
          placeholder="Salasana"
          onChange={handleChange}
          error={errors}
        />
        <Input
          type="password"
          name="confirmPassword"
          label="Vahvista Salasana"
          value={registrationData.confirmPassword}
          placeholder="Salasana uudelleen"
          onChange={handleChange}
          error={errors}
        />
        <Button type="submit" />
      </form>
    </div>
  );
}

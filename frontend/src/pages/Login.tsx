import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function LoginPage() {
  let navigate = useNavigate();
  // Store user input, errors
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Update the input fields as the user types something
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    // Remove errors and success messages after user starts typing again
    setErrors({
      ...errors,
      [e.target.name]: "",
    });

    setSuccessMessage("");
  };

  const validateLogin = () => {
    let newErrors = {}; // Initialize an empty array for errors

    /*
    if (!loginData.username.trim()) {
      newErrors.username = "Username cannot be empty";
    } else if (!loginData.password.trim()) {
      newErrors.password = "Password required";
    } */

    return newErrors;
  };

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent page from reloading after form submission

    const validationErrors = validateLogin();
    setErrors(validationErrors);

    // Navigate to homepage on successful login
    if (Object.keys(validationErrors).length === 0) {
      setSuccessMessage("Login successful!");
      navigate("/");
    }
  };

  /*
    // Temporary validation logic
    
    if (username === "user" && password === "password") {
      setError(""); // Poista virhe kirjautumisen onnistuessa
      alert("Kirjautuminen onnistui");
    } else {
      setError("Wrong username or password");
    } 
  }; */

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <h2>Login Form</h2>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleChange}
          />
          {/* Display error if needed */}
          {/* errors.username && <p className="error">{errors.username}</p> */}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={loginData.password}
            onChange={handleChange}
          />
          {/* errors.password && <p className="error">{errors.password}</p> */}
        </div>
        <button type="submit">Log In</button>
        {/* Display success message on successful login */}
        {successMessage && <p className="success">{successMessage}</p>}{" "}
      </form>
    </div>
  );
}

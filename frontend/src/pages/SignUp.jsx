import React, { useState } from "react";
import NavBar from '../components/NavBar';
import FormField from "../components/FormField";
import "./css_pages/SignUp.css"
import Footer from "../components/Footer";

export const SignUp = () => {
  const [first_name, setFname] = useState("");
  const [last_name, setLname] = useState('');
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [formErrors, setFormErrors] = useState({
    first_name: false,
    last_name: false,
    username: false,
    email: false,
    password: false,
  });

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setIsError(false);

    // Validate fields
    const errors = {};
    let hasError = false;

    if (!first_name) {
      errors.first_name = true;
      hasError = true;
    }
    if (!last_name) {
      errors.last_name = true;
      hasError = true;
    }
    if (!username) {
      errors.username = true;
      hasError = true;
    }
    if (!email) {
      errors.email = true;
      hasError = true;
    }
    if (!password) {
      errors.password = true;
      hasError = true;
    }

    // If there are errors, update the state and stop submission
    if (hasError) {
      setFormErrors(errors);
      return;
    }

    const userData = {
      first_name,
      last_name,
      username,
      email,
      password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Registration successful! Please check your email to verify your account.");
        setIsError(false);
      } else {
        setMessage(data.detail || "Something went wrong. Please try again.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred. Please try again later.");
      setIsError(true);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="signUp-container">
      {/* <div className="signUpLeft"></div> */}
      <div className="signUpRight">
        <div className="form-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-row">
                <FormField
                    label="Last Name"
                    type="text"
                    value={last_name}
                    onChange={(e) => setLname(e.target.value)}
                    name="last_name"
                    required={true}
                    error={formErrors.last_name}
                />
                <FormField
                    label="First Name"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFname(e.target.value)}
                    name="first_name"
                    required={true}
                    error={formErrors.first_name}
                />
            </div>
            <FormField
                label="Student Number"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                required={true}
                error={formErrors.username}
            />
            <FormField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required={true}
                error={formErrors.email}
            />
            <FormField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                required={true}
                error={formErrors.password}
            />
            <button type="submit">Sign Up</button>
            </form>

            {message && (
            <div className={`message ${isError ? "error" : "success"}`}>
                {message}
            </div>
            )}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

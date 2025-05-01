import React, { useState } from "react";
import NavBar from '../components/NavBar';
import FormField from "../components/FormField";
import "./css_pages/SignUp.css"
import Footer from "../components/Footer";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
    rePassword: false,
  });

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setIsError(false);

    // Validate fields
    const errors = {};
    let hasError = false;

    if (!email) {
      errors.email = true;
      hasError = true;
    }
    if (!password) {
      errors.password = true;
      hasError = true;
    }
    if (!rePassword) {
      errors.rePassword = true;
      hasError = true;
    }

    // If there are errors, update the state and stop submission
    if (hasError) {
      setFormErrors({
        email: !email,
        password: !password,
        rePassword: !(rePassword),
      });
      return;
    }

    if (password !== rePassword) {
      setMessage("Passwords do not match.");
      setIsError(true);
      return;
    }

    const userData = {
      email,
      password,
      re_password: rePassword,
    };

    console.log(userData);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/users/", {
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
        const errorMessages = Object.entries(data)
          .map(([field, messages]) =>
            `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`
          )
          .join(" ");
        setMessage(errorMessages || "Something went wrong. Please try again.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred. Please try again later.");
      setIsError(true);
    }
  }
    
      

  return (
    <div>
      <NavBar />
      <div className="signUp-container">
      {/* <div className="signUpLeft"></div> */}
      <div className="signUpRight">
        <div className="form-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
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
            <FormField
              label="Confirm Password"
              type="password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              name="rePassword"
              required={true}
              error={formErrors.rePassword}
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

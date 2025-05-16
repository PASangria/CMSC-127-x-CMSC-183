import React, { useState } from "react";
import NavBar from "../components/NavBar";
import FormField from "../components/FormField";
import Footer from "../components/Footer";
import "./css_pages/SignUp.css";
import { Link } from 'react-router-dom';

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsError(false);

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
        setMessage("Registration successful! Please check your email.");
        setIsError(false);
      } else {
        const errorMessages = Object.entries(data)
          .map(([field, messages]) =>
            `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`
          )
          .join(" ");
        setMessage(errorMessages || "Something went wrong.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred. Please try again later.");
      setIsError(true);
    }
  };

  return (
    <>
      <NavBar />
      <main className="signup-page-wrapper">
        <div className="signup">
          <div className="signup__overlay" />
          <div className="signup__container">
            <div className="signup__content">
              <section className="signup__left fade-in-up">
                <h1 className="hero-title">
                  Join the<br />
                  <span className="highlighted-text">Student Affairs</span><br />
                  Digital Platform
                </h1>
              </section>

              <section className="signup__right fade-in-up">
                <h2 className="signup__header">Create Account</h2>
                <form className="signup__form" onSubmit={handleSubmit}>
                  <FormField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    required
                    error={formErrors.email}
                  />
                  <FormField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    required
                    error={formErrors.password}
                  />
                  <FormField
                    label="Confirm Password"
                    type="password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    name="rePassword"
                    required
                    error={formErrors.rePassword}
                  />
                  <button type="submit" className="submit-button">Sign Up</button>
                  <div className="signup__links">
                    Already have an account? <Link to="/login">Log in</Link>
                  </div>
                  {message && (
                    <div className={`message ${isError ? "error" : "success"}`}>
                      {message}
                    </div>
                  )}
                </form>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

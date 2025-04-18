import React, { useState } from "react";
import NavBar from '../components/NavBar';

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setIsError(false);

    const userData = {
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
            // Display the success message
            setMessage(data.message || "Registration successful! Please check your email to verify your account.");
            setIsError(false);
            // Optionally, show the verification URL in development mode
            if (data.verification_url) {
                console.log("[DEBUG] Verification URL:", data.verification_url);
            }
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
            <div className="form-container">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                />
                <br />
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                />
                <br />
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                />
                <br />
                <button type="submit">Sign Up</button>
            </form>

            {message && (
                <div className={`message ${isError ? "error" : "success"}`}>
                {message}
                </div>
            )}
        </div>
    </div>
  );
};

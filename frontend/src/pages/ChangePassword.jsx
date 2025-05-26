import React, { useState } from "react";
import { useApiRequest } from "../context/ApiRequestContext";
import { useAuth } from "../context/AuthContext";
import "./css_pages/resetpassword.css";
import FormField from "../components/FormField";

export const ChangePassword = () => {
  const { request } = useApiRequest();
  const { logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== reNewPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await request(
        "http://localhost:8000/auth/users/set_password/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
            re_new_password: reNewPassword,
          }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        const firstError =
          Object.values(errData)[0]?.[0] || "Password change failed.";
        setError(firstError);
        setMessage("");
        return;
      }

      setMessage("Password changed successfully.");
      setError("");
      setCurrentPassword("");
      setNewPassword("");
      setReNewPassword("");

      logout();
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <>
      <h1 className="page-heading">PRIVACY SETTING</h1>
      <div className="reset-password-page-wrapper">
        <div className="reset-password">
          <h2 className="form-title">CHANGE PASSWORD</h2>
          <form onSubmit={handleSubmit} className="reset_form">
            <FormField
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required={true}
              name="currentPassword"
            />

            <FormField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required={true}
              name="newPassword"
            />

            <FormField
              label="Confirm New Password"
              type="password"
              value={reNewPassword}
              onChange={(e) => setReNewPassword(e.target.value)}
              required={true}
              name="reNewPassword"
            />
            <button type="submit" className="submit-button">
              CONFIRM
            </button>
          </form>

          {message && <p className="message success">{message}</p>}
          {error && <p className="message error">{error}</p>}
        </div>
      </div>
    </>
  );
};

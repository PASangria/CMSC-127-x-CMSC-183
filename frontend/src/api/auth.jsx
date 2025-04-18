// frontend/src/api/Auth/csrf.js

export const getCSRFToken = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/users/csrf/", {
        credentials: "include", 
      });
      const csrfToken = res.headers.get("X-CSRFToken");
      return csrfToken;
    } catch (err) {
      console.error("Error fetching CSRF token:", err);
      throw err;
    }
  };
  
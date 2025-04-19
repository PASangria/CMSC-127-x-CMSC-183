// export const getCSRFToken = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/api/users/csrf/", {
//         credentials: "include", 
//       });
//       const csrfToken = res.headers.get("X-CSRFToken");
//       return csrfToken;
//     } catch (err) {
//       console.error("Error fetching CSRF token:", err);
//       throw err;
//     }
//   };
  
export const getCSRFToken = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/users/csrf/", {
      credentials: "include",  // Make sure credentials (cookies) are included
    });
    const data = await res.json();  // Assuming the backend sends the CSRF token in JSON
    const csrfToken = data.csrfToken;  // Adjust the key based on your response structure
    return csrfToken;
  } catch (err) {
    console.error("Error fetching CSRF token:", err);
    throw err;
  }
};
